import supertest from 'supertest';
import { app } from '../../../../server';

const request = supertest(app);

const userToken =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFobWVkIiwiaWF0IjoxNjYxMTA3OTMyfQ.tqcnzQT0XXX440IG-OwFOuPjmhAXW4UzdRvfnIvRo9w';

describe('Return Orders Endpoint', () => {
  it('should return array of orders', async () => {
    const res = await request
      .get('/api/order')
      .set('Content-type', 'application/json')
      .set('authorization', userToken);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy();
  });
});
