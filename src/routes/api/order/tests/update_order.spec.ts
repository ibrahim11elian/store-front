import supertest from 'supertest';
import { ORDER } from '../../../../models/orders';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);
let ord: ORDER;
let userToken: string;
const newUser: USER = {
  user_name: 'plikm',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};

describe('Update Order Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/user`)
      .set('Content-type', 'application/json')
      .send(newUser);

    userToken = res.body;

    const result = await request
      .post(`/api/user/${newUser.user_name}/order`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'active' });

    ord = result.body.order;
  });

  it('should update order status for user', async () => {
    const res = await request
      .put(`/api/user/${newUser.user_name}/order/${ord.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'complete' });

    expect(res.statusCode).toEqual(201);
  });

  it('should return that user does not have order with this id', async () => {
    const res = await request
      .put(`/api/user/${newUser.user_name}/order/897`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'active' });

    expect(res.statusCode).toEqual(404);
  });
});
