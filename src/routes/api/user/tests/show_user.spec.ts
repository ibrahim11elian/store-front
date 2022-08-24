import supertest from 'supertest';
import { app } from '../../../../server';
import { userToken } from './create_user.spec';

const request = supertest(app);

describe('Return User Endpoint', () => {
  it('should return a user by its user_name', async () => {
    const res = await request
      .get('/api/user')
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
  });

  it('should return that user does not exist', async () => {
    const res = await request
      .get('/api/user/hhhhh')
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ msg: `can't find user (hhhhh)` });
  });
});
