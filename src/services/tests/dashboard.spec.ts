import { DashboardQueries } from '../dashboard';
import { Order } from '../../models/orders';
import { Product } from '../../models/products';
import { User } from '../../models/users';

const dashboard = new DashboardQueries();

const order = new Order();
const product = new Product();
const user = new User();

describe('Dashboard services', () => {
  describe('Define Methods', () => {
    it('should have method to retrive all completed oredrs by user', () => {
      expect(dashboard.completedOrderByUser).toBeDefined();
    });

    it('should have method to retrive 5 most Recent Purchases by user', () => {
      expect(dashboard.mostRecentPurchases).toBeDefined();
    });

    it('should have method that retrive carrunt active order by user', () => {
      expect(dashboard.carruntOrder).toBeDefined();
    });

    it('should have method that retrive 5 most popular products', () => {
      expect(dashboard.popularProducts).toBeDefined();
    });
  });

  describe('Method Tests', () => {
    beforeAll(async () => {
      try {
        // create new user to open a new order for him
        const testUser = await user.create({
          user_name: 'asderfgt',
          first_name: 'mohamed',
          last_name: 'ahmed',
          password_digest: '1234567890',
        });

        // create new order to add product to
        await order.create(testUser?.user_name as string, 'active');

        // create new product to add it to order
        await product.create({
          p_name: 'sdrfgt',
          p_price: 200,
          p_category: 'ferniture',
        });
      } catch (error) {
        console.log(error);
      }
    });
    describe('Test completedOrderByUser Method', () => {
      it('completedOrderByUser method should retrive all completed oredrs by user', async () => {
        const result = await dashboard.completedOrderByUser('asderfgt');
        expect(result).toBeTruthy();
      });
    });

    describe('Test mostRecentPurchases Method', () => {
      it('mostRecentPurchases method should retrive 5 most Recent Purchases by user', async () => {
        const result = await dashboard.mostRecentPurchases('asderfgt');
        expect(result).toBeTruthy();
      });
    });

    describe('Test carruntOrder Method', () => {
      it('getProduct method should retrive retrive carrunt active order by user', async () => {
        const result = await dashboard.carruntOrder('asderfgt');
        expect(result).toBeTruthy();
      });
    });

    describe('Test popularProducts Method', () => {
      it('popularProducts method should retrive 5 most popular products', async () => {
        const result = await dashboard.popularProducts();
        expect(result).toBeTruthy();
      });
    });
  });
});
