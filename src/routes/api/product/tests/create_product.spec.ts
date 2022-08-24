import supertest from 'supertest';
import { PRODUCT } from '../../../../models/products';
import { app } from '../../../../server';

const request = supertest(app);
const userToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjYxMTA3OTMyfQ.tqcnzQT0XXX440IG-OwFOuPjmhAXW4UzdRvfnIvRo9w';
export const newProduct: PRODUCT = {
  p_name: 'a',
  p_price: 50,
  p_category: 'a',
};

describe('Create Product Endpoint', () => {
  it('should create a new product', async () => {
    const res = await request
      .post('/api/product')
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send(newProduct);
    expect(res.statusCode).toEqual(201);
  });

  it('should return that product already exist', async () => {
    const res = await request
      .post('/api/product')
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send(newProduct);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ msg: `can't create pruduct` });
  });
});
