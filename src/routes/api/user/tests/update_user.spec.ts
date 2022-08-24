import supertest from 'supertest';
import { app } from '../../../../server';
import { newUser, userToken } from './create_user.spec';

const request = supertest(app);

describe('Update User Endpoint', () => {
  it('should update user first name', async () => {
    const res = await request
      .put(`/api/user/${newUser.user_name}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ firstName: 'moha' });

    expect(res.statusCode).toEqual(201);
  });

  it('should update user last name', async () => {
    const res = await request
      .put(`/api/user/${newUser.user_name}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ lastName: 'moha' });

    expect(res.statusCode).toEqual(201);
  });

  it('should update user first name and last name', async () => {
    const res = await request
      .put(`/api/user/${newUser.user_name}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ firstName: 'mooo', lastName: 'salah' });

    expect(res.statusCode).toEqual(201);
  });
});
