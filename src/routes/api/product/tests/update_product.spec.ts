import supertest from 'supertest';
import { PRODUCT } from '../../../../models/products';
import { app } from '../../../../server';

const request = supertest(app);
const userToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjYxMTA3OTMyfQ.tqcnzQT0XXX440IG-OwFOuPjmhAXW4UzdRvfnIvRo9w';
let pro: PRODUCT;
export const newProduct: PRODUCT = {
  p_name: 'ggg',
  p_price: 50,
  p_category: 'mnb',
};

describe('Update Product Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/product`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send(newProduct);

    pro = res.body.product;
  });
  it('should update product name', async () => {
    const res = await request
      .put(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ name: 'moha' });

    expect(res.statusCode).toEqual(201);
  });

  it('should update product price', async () => {
    const res = await request
      .put(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ price: 132 });

    expect(res.statusCode).toEqual(201);
  });

  it('should update product category', async () => {
    const res = await request
      .put(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ category: 'bab' });

    expect(res.statusCode).toEqual(201);
  });

  it('should update product name and price', async () => {
    const res = await request
      .put(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ name: 'mmm', price: 456 });

    expect(res.statusCode).toEqual(201);
  });

  it('should update product name and category', async () => {
    const res = await request
      .put(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ name: 'mmm', category: 'bbab' });

    expect(res.statusCode).toEqual(201);
  });

  it('should update product price and category', async () => {
    const res = await request
      .put(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ price: 678, category: 'bacab' });

    expect(res.statusCode).toEqual(201);
  });

  it('should update product name, price and category', async () => {
    const res = await request
      .put(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ name: 'ggg', price: 50, category: 'a' });

    expect(res.statusCode).toEqual(201);
  });

  it('should return that product does not exist when update product', async () => {
    const res = await request
      .put(`/api/product/80`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send({ name: 'a', price: 50, category: 'a' });

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({
      msg: `product with ID (80) doesn't exist`,
    });
  });
});
