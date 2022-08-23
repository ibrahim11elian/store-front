import { db } from '../database';
import { hash } from '../utilities/password_hashing';

export type USER = {
  id?: number;
  user_name: string;
  first_name: string;
  last_name: string;
  password_digest?: string;
};

export class User {
  async create(user: USER): Promise<USER | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO users (user_name,first_name,last_name,password_digest) VALUES ($1, $2, $3, $4) RETURNING id, user_name, first_name, last_name';

      const password_digest = hash(user.password_digest as string);
      const result = await conn.query(sql, [
        user.user_name,
        user.first_name,
        user.last_name,
        password_digest,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create user (${user.user_name}): ${error}`);
    }
  }

  async index(): Promise<USER[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT id, user_name, first_name, last_name FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve users: ${error}`);
    }
  }

  async show(userName: USER['user_name']): Promise<USER | null> {
    try {
      const conn = await db.connect();
      const sql =
        'SELECT id, user_name, first_name, last_name FROM users WHERE user_name = $1';

      const result = await conn.query(sql, [userName]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve user: ${error}`);
    }
  }

  //   for just update the first and last name
  async update(
    userName: USER['user_name'],
    firstName?: USER['first_name'],
    lastName?: USER['last_name']
  ): Promise<USER> {
    try {
      const conn = await db.connect();
      const sql =
        !firstName && lastName
          ? 'UPDATE users SET last_name = $1 WHERE user_name = $2 RETURNING id, user_name, first_name, last_name'
          : firstName && !lastName
          ? 'UPDATE users SET first_name = $1 WHERE user_name = $2 RETURNING id, user_name, first_name, last_name'
          : 'UPDATE users SET first_name = $1, last_name = $2 WHERE user_name = $3 RETURNING id, user_name, first_name, last_name';

      let vlaues: string[] = [];
      if (!firstName && lastName) {
        vlaues = [lastName, userName];
      } else if (firstName && !lastName) {
        vlaues = [firstName, userName];
      } else {
        vlaues = [firstName as string, lastName as string, userName];
      }
      const result = await conn.query(sql, vlaues);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update user: ${error}`);
    }
  }

  async delete(userName: USER['user_name']): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM users WHERE user_name = $1';

      await conn.query(sql, [userName]);

      conn.release();

      return `user deleted with user name: ${userName}`;
    } catch (error) {
      throw new Error(`unable to delete user: ${error}`);
    }
  }
}
