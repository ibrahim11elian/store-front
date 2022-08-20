import { db } from '../database';
import { USER } from '../models/users';
import bcrypt from 'bcrypt';

export async function authenticate(
  username: string,
  password: string
): Promise<USER | null> {
  const conn = await db.connect();
  const sql = 'SELECT password_digest FROM users WHERE user_name=($1)';

  const result = await conn.query(sql, [username]);

  if (result.rows.length) {
    const user = result.rows[0];

    if (bcrypt.compareSync(password, user.password_digest)) {
      return user;
    }
  }

  return null;
}
