import supertest from 'supertest';
import { ORDER, ORDER_PRODUCT } from '../../../../models/orders';
import { PRODUCT } from '../../../../models/products';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);

let ordProd: ORDER_PRODUCT;

let userToken: string;
const newUser: USER = {
  user_name: 'asdfrew',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};

const newProduct: PRODUCT = {
  p_name: 'zxcdasq',
  p_price: 24,
  p_category: 'a',
};

describe('Delete Order Product Endpoint', () => {
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

  it('should delete order product by its id', async () => {
    const res = await request
      .delete(`/api/user/${newUser.user_name}/order/product/${ordProd.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that order product does not exist', async () => {
    const res = await request
      .delete(`/api/user/${newUser.user_name}/order/product/1245`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(404);
  });
});
