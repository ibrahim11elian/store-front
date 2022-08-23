import { Product } from '../products';

const product = new Product();
let testProductID: number | undefined;
describe('Products Model', () => {
  describe('Define Methods', () => {
    it('should have an index method', () => {
      expect(product.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(product.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(product.create).toBeDefined();
    });

    it('should have a update method', () => {
      expect(product.update).toBeDefined();
    });

    it('should have a delete method', () => {
      expect(product.delete).toBeDefined();
    });
  });

  describe('Method Tests', async () => {
    describe('Test Create Method', () => {
      it('create method should add a product', async () => {
        const result = await product.create({
          p_name: 'phone',
          p_price: 500,
          p_category: 'device',
        });
        testProductID = result?.id;
        expect(result).toBeTruthy();
      });
    });

    describe('Test Index Method', () => {
      it('index method should retrive an array include one product', async () => {
        const result = await product.index();
        expect(result).toBeTruthy();
      });
    });

    describe('Test Show Method', () => {
      it('show method should retrive a product by its id', async () => {
        const result = await product.show(testProductID as number);
        expect(result).toBeTruthy();
      });
    });

    describe('Test Update Method', () => {
      it('update method should update product name for product', async () => {
        const result = await product.update(testProductID as number, 'phone');
        expect(result).toBeTruthy();
      });

      it('update method should update price for product', async () => {
        const result = await product.update(testProductID as number, '', 600);
        expect(result).toBeTruthy();
      });

      it('update method should update the category of product', async () => {
        const result = await product.update(
          testProductID as number,
          '',
          undefined,
          'electronics'
        );
        expect(result).toBeTruthy();
      });

      it('update method should update the name and price of product', async () => {
        const result = await product.update(
          testProductID as number,
          'phone',
          500
        );
        expect(result).toBeTruthy();
      });

      it('update method should update the name and category of product', async () => {
        const result = await product.update(
          testProductID as number,
          'cup',
          undefined,
          'device'
        );
        expect(result).toBeTruthy();
      });

      it('update method should update the price and category of product', async () => {
        const result = await product.update(
          testProductID as number,
          undefined,
          600,
          'electronics'
        );
        expect(result).toBeTruthy();
      });

      it('update method should update the name, price and category of product', async () => {
        const result = await product.update(
          testProductID as number,
          'phone',
          500,
          'device'
        );
        expect(result).toBeTruthy();
      });
    });

    //     describe('Test Delete Method', () => {
    //       it('delete method should delete a product', async () => {
    //         const result = await product.delete(testProduct?.id as number);
    //         expect(result).toEqual(`product deleted with ID: ${testProduct?.id}`);
    //       });
    //     });
  });
});
