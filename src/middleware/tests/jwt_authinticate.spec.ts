import supertest from 'supertest';
import { USER } from '../../models/users';
import { app } from '../../server';

const request = supertest(app);
let userToken: string;
const newUser: USER = {
  user_name: 'khanosamn',
  first_name: 'asdf',
  last_name: 'dfgf',
  password_digest: 'dffjlklk',
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
      .get('/api/user')
      .set('Content-type', 'application/json')
      .set('authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeTruthy();
  });
});
