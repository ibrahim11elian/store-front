import supertest from 'supertest';
import { app } from '../../../../server';
import { userToken } from './create_user.spec';

const request = supertest(app);

describe('Return Users Endpoint', () => {
  it('should return array of users', async () => {
    const res = await request
      .get('/api/user')
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy();
  });
});
