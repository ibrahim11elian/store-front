import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { SALT_ROUNDS } = process.env;

// hash user password

export function hash(pass: string): string {
  try {
    const password_digest = bcrypt.hashSync(pass, Number(SALT_ROUNDS));
    return password_digest;
  } catch (error) {
    throw new Error(`Error while hashing: ${error}`);
  }
}
