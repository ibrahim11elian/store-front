import supertest from 'supertest';
import { USER } from '../../models/users';
import { app } from '../../server';

const request = supertest(app);
let userToken: string;
const newUser: USER = {
  user_name: 'xcdser',
  first_name: 'dsgf',
  last_name: 'dd',
  password_digest: 'fr2334',
};

describe('JWT Authinticate Test', () => {
  beforeAll(async () => {
    const res = await request
      .post(`/api/user`)
      .set('Content-type', 'application/json')
      .send(newUser);

    userToken = res.body;
  });
  it('should get back 200 response status code', async () => {
    const res = await request
      .delete(`/api/user/${newUser.user_name}`)
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy();
  });
});
