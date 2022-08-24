import supertest from 'supertest';
import { ORDER } from '../../../../models/orders';
import { PRODUCT } from '../../../../models/products';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);
let prod: PRODUCT;
let ord: ORDER;
let userToken: string;
const newUser: USER = {
  user_name: 'ghjkll',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};

const newProduct: PRODUCT = {
  p_name: 'dghhj',
  p_price: 24,
  p_category: 'a',
};

describe('Add Product to Order Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/user`)
      .set('Content-type', 'application/json')
      .send(newUser);

    userToken = res.body;

    // create product to add
    const pro = await request
      .post('/api/product')
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send(newProduct);
    prod = pro.body.product;

    const or = await request
      .post(`/api/user/${newUser.user_name}/order`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'active' });
    ord = or.body.order;
  });

  it('should add a product to an existng order for user', async () => {
    const res = await request
      .post(`/api/user/${newUser.user_name}/order/product`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ orderID: ord.id, productID: prod.id, quantity: 23 });
    expect(res.statusCode).toEqual(201);
  });

  it('should update product quantity in existng order for user if it already exist', async () => {
    const res = await request
      .post(`/api/user/${newUser.user_name}/order/product`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ orderID: ord.id, productID: prod.id, quantity: 65 });
    expect(res.statusCode).toEqual(201);
  });

  it('should return that product quantity only accept positive number', async () => {
    const res = await request
      .post(`/api/user/${newUser.user_name}/order/product`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ orderID: ord.id, productID: prod.id, quantity: -1 });
    expect(res.statusCode).toEqual(400);
  });

  it('should return that there is no existng order for user in this order id', async () => {
    const res = await request
      .post(`/api/user/${newUser.user_name}/order/product`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ orderID: 34, productID: prod.id, quantity: 65 });
    expect(res.statusCode).toEqual(400);
  });
});
