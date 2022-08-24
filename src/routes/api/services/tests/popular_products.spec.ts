import supertest from 'supertest';
import { app } from '../../../../server';

const request = supertest(app);

describe('Return All Products in All Orders Endpoint', () => {
  it('should return array of 5 most popular products ordered based on its quantity', async () => {
    const res = await request.get(`/api/products/popular`);

    expect(res.statusCode).toEqual(200);
  });
});
