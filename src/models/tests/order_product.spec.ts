import { Order } from '../orders';
import { Product } from '../products';
import { User } from '../users';

const order = new Order();
const product = new Product();
const user = new User();
let testProductID: number | undefined;
let testOrderID: number | undefined;
let testOrderProductID: number | undefined;
describe('Order Products Model', () => {
  describe('Define Methods', () => {
    it('should have method to retrive all products in all orders', () => {
      expect(order.getProducts).toBeDefined();
    });

    it('should have method to get spsefic order product', () => {
      expect(order.getOrderProduct).toBeDefined();
    });

    it('should have method that add existing product to an existing order', () => {
      expect(order.addProduct).toBeDefined();
    });

    it('should have method to update quantity of product in order', () => {
      expect(order.updateOrderProduct).toBeDefined();
    });

    it('should have method that delete product in order', () => {
      expect(order.deleteOrderProduct).toBeDefined();
    });
  });

  describe('Method Tests', () => {
    beforeAll(async () => {
      try {
        // create new user to open a new order for him
        const testUser = await user.create({
          user_name: 'ali',
          first_name: 'mohamed',
          last_name: 'ahmed',
          password_digest: '1234567890',
        });

        // create new order to add product to
        const testOrder = await order.create(
          testUser?.user_name as string,
          'active'
        );
        testOrderID = testOrder?.id;
        // create new product to add it to order
        const testProduct = await product.create({
          p_name: 'taplet',
          p_price: 200,
          p_category: 'ferniture',
        });
        testProductID = testProduct?.id;
      } catch (error) {
        console.log(error);
      }
    });
    describe('Test addOrderProduct Method', () => {
      it('addOrderProduct method should add a product to an order', async () => {
        const result = await order.addProduct(
          testOrderID as number,
          testProductID as number,
          15
        );
        testOrderProductID = result?.id;
        expect(result).toBeTruthy();
      });
    });

    describe('Test getProducts Method', () => {
      it('getProducts method should get all products in all orders ', async () => {
        const result = await order.getProducts();
        expect(result).toBeTruthy();
      });
    });

    describe('Test getProduct Method', () => {
      it('getProduct method should retrive a product in specific order by its id', async () => {
        const result = await order.getOrderProduct(
          testOrderProductID as number
        );
        expect(result?.id).toEqual(testOrderProductID);
      });
    });

    describe('Test updateOrderProduct Method', () => {
      it('updateOrderProduct method should update order product quantity', async () => {
        const result = await order.updateOrderProduct(
          testOrderProductID as number,
          10
        );
        expect(result).toEqual({
          id: testOrderProductID as number,
          o_id: testOrderID as number,
          p_id: testProductID as number,
          quantity: '10',
        });
      });
    });

    describe('Test deleteOrderProduct Method', () => {
      it('deleteOrderProduct method should delete product in order', async () => {
        const result = await order.deleteOrderProduct(
          testOrderProductID as number
        );
        expect(result).toEqual(
          `product in order deleted with ID: ${testOrderProductID}`
        );
      });
    });
  });
});
