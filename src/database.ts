import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PG_HOST, PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT } = process.env;

export const db = new Pool({
  host: PG_HOST,
  user: PG_USER,
  database: PG_DATABASE,
  password: PG_PASSWORD,
  port: Number(PG_PORT),
});
