import { hash } from '../password_hashing';

describe('Password Hashing Test', () => {
  it('should take paasword and return back hashed password', () => {
    expect(hash('12345')).toBeTruthy();
  });
});
