import { User } from '../users';

const user = new User();

describe('Users Model', () => {
  describe('Define Methods', () => {
    it('should have an index method', () => {
      expect(user.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(user.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(user.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(user.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(user.delete).toBeDefined();
    });
  });

  describe('Method Tests', () => {
    describe('Test Create Method', () => {
      it('create method should add a user', async () => {
        const result = await user.create({
          user_name: 'ibrahim_ahmed',
          first_name: 'ibrahim',
          last_name: 'ahmed',
          password_digest: '12345678',
        });
        expect(result).not.toBeFalsy();
      });
    });

    describe('Test Index Method', () => {
      it('index method should retrive an array include one user', async () => {
        const result = await user.index();
        expect(result).not.toBeFalsy();
      });
    });

    describe('Test Show Method', () => {
      it('show method should retrive a user by user name', async () => {
        const result = await user.show('ibrahim_ahmed');
        expect(result).not.toBeFalsy();
      });
    });

    describe('Test Update Method', () => {
      it('update method should update first name for user', async () => {
        const result = await user.update('ibrahim_ahmed', 'ali');
        expect(result).not.toBeFalsy();
      });

      it('update method should update last name for user', async () => {
        const result = await user.update('ibrahim_ahmed', '', 'mohamed');
        expect(result).not.toBeFalsy();
      });

      it('update method should update the first and last name for user', async () => {
        const result = await user.update('ibrahim_ahmed', 'ibrahim', 'ahmed');
        expect(result).not.toBeFalsy();
      });
    });

    describe('Test Delete Method', () => {
      it('delete method should delete a user', async () => {
        const result = await user.delete('ibrahim_ahmed');
        expect(result).toEqual('user deleted with user name: ibrahim_ahmed');
      });
    });
  });
});
