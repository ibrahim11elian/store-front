import { Product, PRODUCT } from '../../../../models/products';
import order from '../../order/handlers/order';
import { Request, Response } from 'express';

const product = new Product();

// creating a new product by request /product route by post method and return a new product

async function create(req: Request, res: Response) {
  const newProduct: PRODUCT = req.body;

  try {
    const result = await product.create(newProduct);

    res.status(201).json({ msg: 'product created', product: result });
  } catch (error) {
    res.status(400).json({ msg: `can't create pruduct` });
  }
}

// getting all products by request /product route by get method and return a all products

async function index(req: Request, res: Response) {
  try {
    const result = await product.index();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get products` });
  }
}

// get a specific product by request /product/:productID route by get method and return a product if exist

async function getProduct(req: Request, res: Response) {
  const productID: string = req.params.productID;

  try {
    const result = await product.show(Number(productID));
    if (result) res.status(200).json(result);
    else {
      res
        .status(400)
        .json({ msg: `can't find product with ID (${productID})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// updating a product by request /product/:productID route by put method and update a product if it exists

async function update(req: Request, res: Response) {
  const productID: string = req.params.productID;
  const { name, price, category } = req.body;

  try {
    const result = await product.show(Number(productID));
    if (result) {
      const updated = await product.update(
        Number(productID),
        name as string,
        Number(price),
        category as string
      );
      res.status(201).json({ msg: `${name} data updated`, product: updated });
    } else {
      res
        .status(404)
        .json({ msg: `product with ID (${productID}) doesn't exist` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// deleting a pruduct by request /product/:productID route by delete method and delete a product if exist

async function deleteProduct(req: Request, res: Response) {
  const productID: string = req.params.productID;
  try {
    const result = await product.show(Number(productID));
    if (result) {
      await order.deleteAllOrderProducts(Number(productID), 'p');
      const deleted = await product.delete(Number(productID));
      res.status(200).json({ msg: deleted });
    } else {
      res
        .status(404)
        .json({ msg: `can't find product with ID (${productID})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// get products by its category request /product/category/:category route by get method and return a products if exist

async function productsByCategory(req: Request, res: Response) {
  const category: string = req.params.category;
  try {
    const result = await product.productByCategory(category);
    if (result?.length) res.status(200).json(result);
    else {
      res
        .status(404)
        .json({ msg: `can't find products in category (${category})` });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

export default {
  create,
  index,
  update,
  getProduct,
  deleteProduct,
  productsByCategory,
};
