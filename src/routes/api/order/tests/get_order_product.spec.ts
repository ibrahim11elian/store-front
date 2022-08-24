import supertest from 'supertest';
import { ORDER, ORDER_PRODUCT } from '../../../../models/orders';
import { PRODUCT } from '../../../../models/products';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);

let ordProd: ORDER_PRODUCT;

let userToken: string;
const newUser: USER = {
  user_name: 'kjhgyu',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};

const newProduct: PRODUCT = {
  p_name: 'cdsaqw',
  p_price: 24,
  p_category: 'a',
};

describe('Return Product in Order Endpoint', () => {
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
    const prod: PRODUCT = pro.body.product;

    const or = await request
      .post(`/api/user/${newUser.user_name}/order`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'active' });
    const ord: ORDER = or.body.order;

    const orderProduct = await request
      .post(`/api/user/${newUser.user_name}/order/product`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ orderID: ord.id, productID: prod.id, quantity: 23 });

    ordProd = orderProduct.body.result;
  });

  it('should return order product by its id', async () => {
    const res = await request
      .get(`/api/order/product/${ordProd.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that order does not exist', async () => {
    const res = await request
      .get('/api/order/product/122')
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      msg: `can't find order product with ID (122)`,
    });
  });
});
