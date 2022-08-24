import supertest from 'supertest';
import { USER } from '../../../../models/users';
import { app } from '../../../../server';

const request = supertest(app);
let userToken: string;
const newUser: USER = {
  user_name: 'zaq',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
};

describe('Create Order Endpoint', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/user`)
      .set('Content-type', 'application/json')
      .send(newUser);

    userToken = res.body;
  });

  it('should create a new order for user', async () => {
    const res = await request
      .post(`/api/user/${newUser.user_name}/order`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'active' });
    expect(res.statusCode).toEqual(201);
  });

  it('should return that order can not be created as the status out of active or complete', async () => {
    const res = await request
      .post(`/api/user/${newUser.user_name}/order`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`)
      .send({ status: 'ascd' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.msg).toEqual(`can't create order`);
  });
});
