import { Order } from '../orders';
import { User } from '../users';

const order = new Order();
const user = new User();
let testUserName: string | undefined;
let testOrderID: number | undefined;
describe('Orders Model', () => {
  describe('Define Methods', () => {
    it('should have an index method', () => {
      expect(order.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(order.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(order.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(order.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(order.delete).toBeDefined();
    });
  });

  describe('Method Tests', async () => {
    beforeAll(async () => {
      // create new user to open a new order for him
      try {
        const result = await user.create({
          user_name: 'ahmed11',
          first_name: 'ahmed',
          last_name: 'samir',
          password_digest: '1234567890',
        });
        testUserName = result?.user_name;
      } catch (error) {
        console.log(error);
      }
    });

    describe('Test Create Method', () => {
      it('create method should add a order for user', async () => {
        const result = await order.create(testUserName as string, 'active');
        testOrderID = result?.id;
        expect(result).toBeTruthy();
      });
    });

    describe('Test Index Method', () => {
      it('index method should retrive an array include orders', async () => {
        const result = await order.index();
        expect(result.length).toBeTruthy();
      });
    });

    describe('Test Show Method', () => {
      it('show method should retrive a order by its id', async () => {
        const result = await order.show(testOrderID as number);
        expect(result).toBeTruthy();
      });
    });

    describe('Test Update Method', () => {
      it('update method should update order status for order', async () => {
        const result = await order.update(testOrderID as number, 'complete');
        expect(result).toBeTruthy();
      });
    });

    describe('Test Delete Method', () => {
      it('delete method should delete an order', async () => {
        const result = await order.delete(testOrderID as number);
        expect(result).toEqual(`order deleted with ID: ${testOrderID}`);
      });
    });
  });
});
