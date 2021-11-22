const { Pool } = require('pg');
//comment to kick off build

export const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,

  // ssl: {
  //   // USE FOLLOWING LINE FOR STAGING
  //   // ca: fs.readFileSync('./key.pem').toString(),

  //   // USE FOLLOWING LINE FOR LOCAL
  //   ca: fs.readFileSync('./rds-ca.pem').toString(),
  // },
});
