import supertest from 'supertest';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);
export let userToken: string;
export const newUser: USER = {
  user_name: 'mohmed',
  first_name: 'mooo',
  last_name: 'salah',
  password_digest: '1234rfds',
};

describe('Create User Endpoint', () => {
  it('should create a new user and return token', async () => {
    const res = await request
      .post('/api/user')
      .set('Content-type', 'application/json')
      .send(newUser);
    userToken = res.body;
    expect(res.statusCode).toEqual(201);
  });

  it('should return that user already exist', async () => {
    const res = await request
      .post('/api/user')
      .set('Content-type', 'application/json')
      .send(newUser);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ msg: `${newUser['user_name']} already exist` });
  });
});
