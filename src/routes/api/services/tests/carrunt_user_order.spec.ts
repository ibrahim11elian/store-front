import supertest from 'supertest';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);

let userToken: string;
const newUser: USER = {
  user_name: 'fghytr',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};

describe('Return All Products in All Orders Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/user`)
      .set('Content-type', 'application/json')
      .send(newUser);

    userToken = res.body;

    await request
      .post(`/api/user/${newUser.user_name}/order`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'active' });
  });

  it('should return current active order for user', async () => {
    const res = await request
      .get(`/api/user/${newUser.user_name}/order/active`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
  });
});
