import UTXO from './UTXO.interface';
export default interface BalanceComparison {
  btcAddress: string;
  spent: UTXO;
  unspent: UTXO;
}
