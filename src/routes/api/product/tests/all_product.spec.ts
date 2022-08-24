import supertest from 'supertest';
import { app } from '../../../../server';

const request = supertest(app);

describe('Return Product Endpoint', () => {
  it('should return array of products', async () => {
    const res = await request.get('/api/product');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy();
  });
});
