import { db } from '../database';

export class DashboardQueries {
  async completedOrderByUser(
    userName: string
  ): Promise<{ user_name: string; order_id: number; order_status: string }[]> {
    try {
      const conn = await db.connect();
      const sql =
        "SELECT users.user_name , orders.id AS order_id,orders.o_status AS order_status FROM users INNER JOIN orders ON orders.user_name = users.user_name WHERE orders.user_name = $1 AND orders.o_status = 'complete'";

      const result = await conn.query(sql, [userName]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get orders: ${err}`);
    }
  }

  //   return 5 most Recent Purchases by user
  async mostRecentPurchases(
    userName: string
  ): Promise<{ user_name: string; order_id: number; order_status: string }[]> {
    try {
      const conn = await db.connect();
      const sql =
        "SELECT users.user_name , orders.id AS order_id,orders.o_status AS order_status FROM users INNER JOIN orders ON orders.user_name = users.user_name WHERE orders.user_name = $1 AND orders.o_status = 'complete' ORDER BY orders.id DESC LIMIT 5";

      const result = await conn.query(sql, [userName]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get orders: ${err}`);
    }
  }

  //   return carrunt active order by user
  async carruntOrder(
    userName: string
  ): Promise<{ user_name: string; order_id: number; order_status: string }[]> {
    try {
      const conn = await db.connect();
      const sql =
        "SELECT users.user_name , orders.id AS order_id,orders.o_status AS order_status FROM users INNER JOIN orders ON orders.user_name = users.user_name WHERE orders.user_name = $1 AND orders.o_status = 'active' ORDER BY orders.id DESC LIMIT 1;";

      const result = await conn.query(sql, [userName]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get orders: ${err}`);
    }
  }

  //   return 5 most popular products ordered
  async popularProducts(): Promise<
    { product_name: string; quantity_ordered: number }[]
  > {
    try {
      const conn = await db.connect();
      const sql =
        'SELECT products.p_name AS product_name, sum(order_product.quantity) AS quantity_ordered FROM products INNER JOIN order_product ON products.id = order_product.p_id GROUP BY product_name ORDER BY quantity_ordered DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products: ${err}`);
    }
  }
}
