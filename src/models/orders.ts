import { db } from '../database';

export type ORDER = {
  id?: number;
  user_name: string;
  status: 'active' | 'complete';
};

export class Order {
  async create(userName: string, status: string): Promise<ORDER | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO orders (user_name,o_status) VALUES ($1, $2) RETURNING *';

      const result = await conn.query(sql, [userName, status]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create order for (${userName}): ${error}`);
    }
  }

  async index(): Promise<ORDER[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve orders: ${error}`);
    }
  }

  async show(orderID: number): Promise<ORDER | null> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM orders WHERE id = $1';

      const result = await conn.query(sql, [orderID]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve order: ${error}`);
    }
  }

  async update(orderID: number, status: string): Promise<ORDER> {
    try {
      const conn = await db.connect();
      const sql = 'UPDATE orders SET o_status = $1 WHERE id = $2 RETURNING *';

      const result = await conn.query(sql, [status, orderID]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update order status: ${error}`);
    }
  }

  async delete(orderID: number): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM orders WHERE id = $1';

      await conn.query(sql, [orderID]);

      conn.release();

      return `order deleted with ID: ${orderID}`;
    } catch (error) {
      throw new Error(`unable to delete order: ${error}`);
    }
  }

  // add product to open order
  async addProduct(
    orderID: number,
    productID: number,
    quantity: number
  ): Promise<object | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO order_product (o_id,p_id,quantity) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [orderID, productID, quantity]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to add product to an order: ${error}`);
    }
  }

  // get all products in all orders "for admins"
  async getProducts(): Promise<object[] | null> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM order_product';

      const result = await conn.query(sql);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to get products: ${error}`);
    }
  }

  // get all products that belong to specific order
  async getOrderProduct(orderID: number): Promise<object | null> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM order_product WHERE o_id = $1';

      const result = await conn.query(sql, [orderID]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve order product: ${error}`);
    }
  }

  // update quantity of spacific product in order
  async updateOrderProduct(
    orderID: number,
    productID: number,
    quantity: number
  ): Promise<ORDER> {
    try {
      const conn = await db.connect();
      const sql =
        'UPDATE order_product SET quantity = $1 WHERE o_id = $2 AND p_id = $3 RETURNING *';

      const result = await conn.query(sql, [quantity, orderID, productID]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update quantity: ${error}`);
    }
  }

  // delete spacific product in order
  async deleteOrderProduct(
    orderID: number,
    productID: number
  ): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM order_product WHERE o_id = $1 AND p_id = $2';

      await conn.query(sql, [orderID, productID]);

      conn.release();

      return `product in order deleted with ID: ${productID}`;
    } catch (error) {
      throw new Error(`unable to delete order product: ${error}`);
    }
  }

  // delete all products in order
  async deleteAllOrderProducts(orderID: number): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM order_product WHERE o_id = $1';

      await conn.query(sql, [orderID]);

      conn.release();

      return `All products in order are deleted with ID: ${orderID}`;
    } catch (error) {
      throw new Error(`unable to delete order products: ${error}`);
    }
  }
}
