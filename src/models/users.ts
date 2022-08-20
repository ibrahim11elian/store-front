import { db } from '../database';
import { hash } from '../utilities/password_hashing';

export type USER = {
  id?: number;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class users {
  async create(user: USER): Promise<USER | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO users (user_name,first_name,last_name,password_digest) VALUES ($1, $2, $3, $4) RETURNING *';

      const password_digest = hash(user.password);
      const result = await conn.query(sql, [
        user.userName,
        user.firstName,
        user.lastName,
        password_digest,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create user (${user.userName}): ${error}`);
    }
  }

  async index(): Promise<USER[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT (id, user_name, first_name, last_name) FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve users: ${error}`);
    }
  }

  async show(userName: USER['userName']): Promise<USER | null> {
    try {
      const conn = await db.connect();
      const sql =
        'SELECT (id, user_name, first_name, last_name) FROM users WHERE user_name = $1';

      const result = await conn.query(sql, [userName]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve user: ${error}`);
    }
  }

  //   for just update the first and last name
  async update(
    userName: USER['userName'],
    firstName?: USER['firstName'],
    lastName?: USER['lastName']
  ): Promise<USER> {
    try {
      const conn = await db.connect();
      const sql =
        !firstName && lastName
          ? 'UPDATE users SET last_name = $1 WHERE user_name = $2 RETURNING *'
          : firstName && !lastName
          ? 'UPDATE users SET first_name = $1 WHERE user_name = $2 RETURNING *'
          : 'UPDATE users SET first_name = $1, last_name = $2 WHERE user_name = $3 RETURNING *';

      console.log(sql);
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

  async delete(userName: USER['userName']): Promise<string> {
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
