import { pool } from '../db/pool';
import uuid4 from 'uuid4';
import UTXO from '../models/UTXO.interface';
import UTXOresponse from '../models/UTXOresponse.interface';
import BalanceComparison from '../models/balanceComparison.interface';
import PieChartPoint from '../models/pieChartPoint.interface';
import PieChartResponse from '../models/pieChartResponse.interface';
import { createSpendIdSqlString } from '../helpers/balanceHelpers';
import { create } from 'domain';

/**
 * Checks the spent or unspent balance of a btc address
 *
 * @param btcAddress: string
 * @param spent: boolean
 * @returns UTXOresponse
 */
export async function getBalance(
  btcAddress: string,
  spent: boolean
): Promise<UTXOresponse> {
  const sqlQuery: string =
    'SELECT SUM(amount) as amount FROM public.btc_utxo_copy WHERE address = $1 AND spent = $2';
  const sqlValues: [string, boolean] = [btcAddress, spent];

  const utxoRes = await pool.query(sqlQuery, sqlValues);
  const totalAmount: { amount: number } = utxoRes.rows[0];

  const response: UTXOresponse = {
    btcAddress: btcAddress,
    amount: totalAmount.amount || 0,
  };

  return response;
}

/**
 * Returns a comparison of spent/unspent amounts on a certain btc address in a format
 * that can be read by Nivo pie chart
 *
 * @param btcAddress: string
 * @returns PieChartResponse
 */
export async function getComparison(
  btcAddress: string
): Promise<PieChartResponse> {
  const spentSlQuery: string =
    'SELECT SUM(amount) as amount FROM public.btc_utxo_copy WHERE address = $1 AND spent = $2';
  const unspentSqlQuery: string =
    'SELECT SUM(amount) as amount FROM public.btc_utxo_copy WHERE address = $1 AND spent = $2';

  const spentValues: [string, boolean] = [btcAddress, true];
  const unspentValues: [string, boolean] = [btcAddress, false];

  const spentRes = await pool.query(spentSlQuery, spentValues);
  const unspentRes = await pool.query(unspentSqlQuery, unspentValues);

  const spent: number = parseFloat(spentRes.rows[0].amount) || 0;
  const unspent: number = parseFloat(unspentRes.rows[0].amount) || 0;
  const total: number = spent + unspent;
  const percentAvailable = (unspent / total) * 100 || 0;

  //format data for nivo pie chart
  return {
    btcAddress: btcAddress,
    percentAvailable: percentAvailable,
    data: [
      {
        id: 'spent',
        label: 'spent',
        value: spent,
      },
      {
        id: 'unspent',
        label: 'unspent',
        value: unspent,
      },
    ],
  };
}

/**
 * Spends an amount given a bitcoin address
 * Returns an error if trying to spend more than available
 * Can spend fool amount, or partial amount
 * @param btcAddress: string
 * @param amount: number
 * @param fullAmount: boolean
 * @returns
 */
export async function spendBalance(
  btcAddress: string,
  amount: number,
  fullAmount: boolean
): Promise<
  | { pieChartResponse: PieChartResponse; balance: UTXOresponse }
  | { error: string }
> {
  // If fullAmount = true, set all rows where spent = false, return updated balance, exit before
  // unnecessary code runs
  if (fullAmount) {
    const spendAllSqlQuery: string = `UPDATE public.btc_utxo_copy SET spent = $1 WHERE address = $2;`;
    const spendAllValues: [boolean, string] = [true, btcAddress];

    await pool.query(spendAllSqlQuery, spendAllValues);
  } else {
    // Check to make sure balance is greater than spendAmount and that there is something to spend.
    //If not, alert user what they have
    // available to spend in btc Address. Return error before unnecessary code is run.
    const unspentSqlQuery: string =
      'SELECT SUM(amount) as amount FROM public.btc_utxo_copy WHERE address = $1 AND spent = $2';
    const unspentValues: [string, boolean] = [btcAddress, false];

    const unspentRes = await pool.query(unspentSqlQuery, unspentValues);

    const unspent: number = parseFloat(unspentRes.rows[0].amount) || 0;
    if (amount > unspent) {
      return {
        error: `Not enough available. You only have ${unspent} available to spend`,
      };
    }

    let spentIds: string[] = [];
    let spentAmount: number = 0;
    let splitAmount: number = 0;
    let i: number = 0;

    const getAllSqlQuery: string =
      'SELECT * FROM public.btc_utxo_copy WHERE address = $1 AND spent = $2 ORDER BY amount';
    const getAllValues: [string, boolean] = [btcAddress, false];

    const getAllRes = await pool.query(getAllSqlQuery, getAllValues);
    const unspentEntries: UTXO[] = getAllRes.rows;

    // Push ids to array where spend needs to be set to true. When the spendAmount is reached,
    // spend the entire amount of the last row (set spent = true), calculate the difference,
    // then create a new record under the btc address with the difference.
    while (amount > spentAmount && i < unspentEntries.length) {
      spentAmount += parseFloat(unspentEntries[i].amount);
      splitAmount = spentAmount - amount;
      spentIds.push(unspentEntries[i].id);
      i++;
    }

    const newId: string = uuid4();
    // Dynamically add ids that need to have spent set to true.
    const sqlConcat: { concat: string; values: string[] } =
      createSpendIdSqlString(spentIds);
    const spendSqlQuery: string = `UPDATE public.btc_utxo_copy SET spent = $1 WHERE ${sqlConcat.concat}`;
    const spendSqlValues: (boolean | string)[] = [true, ...sqlConcat.values];
    const insertSqlQuery: string = `INSERT INTO public.btc_utxo_copy (id, txid, address, amount, spent) VALUES($1, $2, $3, $4, $5)`;
    //setting txid to 'unknown'. I'm sure this links to another theoretical table that I'm not aware of and don't have ids for.
    //but it still spends.
    const insertSqlValues: (boolean | string | number)[] = [
      newId,
      'unknown',
      btcAddress,
      splitAmount,
      false,
    ];

    await pool.query(spendSqlQuery, spendSqlValues);
    await pool.query(insertSqlQuery, insertSqlValues);
  }
  const newBalance: UTXOresponse = await getBalance(btcAddress, false);
  const newComparison: PieChartResponse = await getComparison(btcAddress);

  return { balance: newBalance, pieChartResponse: newComparison };
}
