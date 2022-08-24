import supertest from 'supertest';
import { PRODUCT } from '../../../../models/products';
import { app } from '../../../../server';

const request = supertest(app);

const userToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjYxMTA3OTMyfQ.tqcnzQT0XXX440IG-OwFOuPjmhAXW4UzdRvfnIvRo9w';
let pro: PRODUCT;
export const newProduct: PRODUCT = {
  p_name: 'www',
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
  it('should return a product by its id', async () => {
    const res = await request.get(`/api/product/${pro.id}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that product does not exist', async () => {
    const res = await request.get('/api/product/122');

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      msg: `can't find product with ID (122)`,
    });
  });
});
