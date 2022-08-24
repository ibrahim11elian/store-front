import supertest from 'supertest';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);

let userToken: string;
const newUser: USER = {
  user_name: 'ahmed123',
  first_name: 'mooo',
  last_name: 'salah',
  password_digest: '1234rfds',
};

describe('Delete User Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/user`)
      .set('Content-type', 'application/json')
      .send(newUser);

    userToken = res.body;
  });
  it('should delete user and his all orders by user_name', async () => {
    const res = await request
      .delete(`/api/user/${newUser.user_name}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that user does not exist when delete user', async () => {
    const res = await request
      .delete(`/api/user/${newUser.user_name}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ msg: `can't find user (${newUser.user_name})` });
  });
});
