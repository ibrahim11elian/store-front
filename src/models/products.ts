import { db } from '../database';

export type PRODUCT = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class Product {
  async create(product: PRODUCT): Promise<PRODUCT | null> {
    try {
      const conn = await db.connect();
      const sql =
        'INSERT INTO products (p_name,p_price,p_category) VALUES ($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to create product (${product.name}): ${error}`);
    }
  }

  async index(): Promise<PRODUCT[]> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve products: ${error}`);
    }
  }

  async show(productID: number): Promise<PRODUCT | null> {
    try {
      const conn = await db.connect();
      const sql = 'SELECT * FROM products WHERE id = $1';

      const result = await conn.query(sql, [productID]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to retrieve product: ${error}`);
    }
  }

  async update(
    productID: number,
    p_name?: string,
    p_price?: number,
    p_category?: string
  ): Promise<PRODUCT> {
    try {
      const conn = await db.connect();
      const sql =
        p_name && !p_price && !p_category
          ? 'UPDATE products SET p_name = $1 WHERE id = $2 RETURNING *'
          : !p_name && p_price && !p_category
          ? 'UPDATE products SET p_price = $1 WHERE id = $2 RETURNING *'
          : !p_name && !p_price && p_category
          ? 'UPDATE products SET p_category = $1 WHERE id = $2 RETURNING *'
          : p_name && p_price && !p_category
          ? 'UPDATE products SET p_name = $1, p_price = $2 WHERE id = $3 RETURNING *'
          : p_name && !p_price && p_category
          ? 'UPDATE products SET p_name = $1, p_category = $2 WHERE id = $3 RETURNING *'
          : !p_name && p_price && p_category
          ? 'UPDATE products SET p_price = $1, p_category = $2 WHERE id = $3 RETURNING *'
          : 'UPDATE products SET p_name = $1, p_price = $2, p_category = $3 WHERE id = $4 RETURNING *';

      console.log(sql);
      let vlaues: (number | string)[] = [];
      if (p_name && !p_price && !p_category) {
        vlaues = [p_name, productID];
      } else if (!p_name && p_price && !p_category) {
        vlaues = [p_price as unknown as string, productID];
      } else if (!p_name && !p_price && p_category) {
        vlaues = [p_category, productID];
      } else if (p_name && p_price && !p_category) {
        vlaues = [p_name, p_price, productID];
      } else if (p_name && !p_price && p_category) {
        vlaues = [p_name, p_category, productID];
      } else if (!p_name && p_price && p_category) {
        vlaues = [p_price, p_category, productID];
      } else {
        vlaues = [
          p_name as string,
          p_price as number,
          p_category as string,
          productID,
        ];
      }
      const result = await conn.query(sql, vlaues);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`unable to update product: ${error}`);
    }
  }

  async delete(productID: number): Promise<string> {
    try {
      const conn = await db.connect();
      const sql = 'DELETE FROM products WHERE id = $1';

      await conn.query(sql, [productID]);

      conn.release();

      return `product deleted with ID: ${productID}`;
    } catch (error) {
      throw new Error(`unable to delete product: ${error}`);
    }
  }
}
