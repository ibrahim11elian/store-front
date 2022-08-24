import supertest from 'supertest';
import { PRODUCT } from '../../../../models/products';
import { app } from '../../../../server';

const request = supertest(app);

const userToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjYxMTA3OTMyfQ.tqcnzQT0XXX440IG-OwFOuPjmhAXW4UzdRvfnIvRo9w';
let pro: PRODUCT;
const newProduct: PRODUCT = {
  p_name: 'rty',
  p_price: 342,
  p_category: 'dsa',
};

describe('Delete product Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/product`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken)
      .send(newProduct);

    pro = res.body.product;
  });

  it('should delete product and its all orders its in', async () => {
    const res = await request
      .delete(`/api/product/${pro.id}`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that product does not exist when delete product', async () => {
    const res = await request
      .delete(`/api/product/90`)
      .set('Content-type', 'application/json')
      .set('authorization', userToken);

    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({
      msg: `can't find product with ID (90)`,
    });
  });
});
