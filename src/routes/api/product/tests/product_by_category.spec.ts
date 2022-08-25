import supertest from 'supertest';
import { PRODUCT } from '../../../../models/products';
import { app } from '../../../../server';

const request = supertest(app);

const userToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjYxMTA3OTMyfQ.tqcnzQT0XXX440IG-OwFOuPjmhAXW4UzdRvfnIvRo9w';
let pro: PRODUCT;
export const newProduct: PRODUCT = {
  p_name: 'kl',
  p_price: 50,
  p_category: 'cvb',
};

describe('Return Product Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/product`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send(newProduct);

    pro = res.body.product;
  });
  it('should return list of products by its category', async () => {
    const res = await request.get(`/api/product/category/${pro.p_category}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return empty list when products does not exist on category', async () => {
    const res = await request.get('/api/product/category/asdfg');

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({
      msg: "can't find products in category (asdfg)",
    });
  });
});
