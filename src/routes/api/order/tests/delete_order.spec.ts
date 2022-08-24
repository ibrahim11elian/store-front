import supertest from 'supertest';
import { ORDER } from '../../../../models/orders';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);

let ord: ORDER;
let userToken: string;
const newUser: USER = {
  user_name: 'jlkutr',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};

describe('Delete Order Endpoint', () => {
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

  it('should delete order and its all products in it', async () => {
    const res = await request
      .delete(`/api/user/${newUser.user_name}/order/${ord.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that order does not exist when delete order', async () => {
    const res = await request
      .delete(`/api/user/${newUser.user_name}/order/1245`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(404);
  });
});
