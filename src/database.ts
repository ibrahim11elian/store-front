import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  PG_HOST,
  PG_USER,
  PG_DATABASE,
  PG_PASSWORD,
  PG_PORT,
  PG_TEST_DATABASE,
  NODE_ENV,
} = process.env;

export const db = new Pool({
  host: PG_HOST,
  user: PG_USER,
  database: NODE_ENV === 'DEV' ? PG_DATABASE : PG_TEST_DATABASE,
  password: PG_PASSWORD,
  port: Number(PG_PORT),
});

db.on('error', (err) => console.error(`database conniction faild: ${err}`));
