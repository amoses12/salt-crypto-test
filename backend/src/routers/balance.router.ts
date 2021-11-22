/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from 'express';
import * as BalanceService from '../services/balance.service';
import UTXOresponse from '../models/UTXOresponse.interface';
import BalanceComparison from '../models/balanceComparison.interface';
import stringToBool from '../helpers/stringToBool';
import PieChartResponse from '../models/pieChartResponse.interface';
import { createCipheriv } from 'crypto';
/**
 * Router Definition
 */

export const balanceRouter = express.Router();
/**
 * Controller Definitions
 */

balanceRouter.get('/balance/:address', async (req: Request, res: Response) => {
  try {
    const balance: UTXOresponse = await BalanceService.getBalance(
      req.params.address,
      stringToBool(req.query.spent.toString())
    );

    if (balance) {
      return res.status(200).send(balance);
    }
    res.status(404).send('Balance not found');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

balanceRouter.get(
  '/comparison/:address',
  async (req: Request, res: Response) => {
    try {
      const balanceComparison: PieChartResponse =
        await BalanceService.getComparison(req.params.address);

      if (balanceComparison) {
        return res.status(200).send(balanceComparison);
      }

      res.status(404).send('Comparison not found');
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

balanceRouter.post('/spend/:address', async (req: Request, res: Response) => {
  try {
    const spendResponse:
      | { balance: UTXOresponse; pieChartResponse: PieChartResponse }
      | { error: string } = await BalanceService.spendBalance(
      req.params.address,
      req.body.amount,
      req.body.fullAmount
    );
    if (spendResponse) {
      return res.status(200).send(spendResponse);
    }
    res.status(404).send('Address Not Found');
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// GET items

// GET items/:id

// POST items

// PUT items/:id

// DELETE items/:id
