/**
 * Required External Modules
 */

import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { balanceRouter } from './routers/balance.router';

dotenv.config();
/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const corsOpts: any = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Authorization',
    'Cache-Control',
    'Pragma',
  ],
};

const app = express();
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors(corsOpts));
app.use(express.json());
app.use((req, res, next) => {
  // TODO Dynamic origin for multiple origins.
  // TODO Add origin validation
  // TODO determine allowed origins dynamically
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma'
  );
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});
app.use('/', balanceRouter);
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
