import supertest from 'supertest';
import { ORDER } from '../../../../models/orders';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);

let order: ORDER;
let userToken: string;
const newUser: USER = {
  user_name: 'kil',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};
describe('Return Product Endpoint', () => {
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
    order = result.body.order;
  });

  it('should return a order by its id', async () => {
    const res = await request
      .get(`/api/order/${order.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that order does not exist', async () => {
    const res = await request
      .get('/api/order/122')
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      msg: `can't find order with ID (122)`,
    });
  });
});
