import { Order } from '../../../../models/orders';
import { Request, Response } from 'express';

const order = new Order();

// adding a new product to specific order for specific user by request /user/:userName/order/product route by post method

async function addOrderProduct(req: Request, res: Response) {
  const user = req.params.userName;
  const orderID: number = req.body.orderID;
  const productID = req.body.productID;
  const quantity = req.body.quantity;

  if (Number(quantity) <= 0) {
    res.status(400).json({
      msg: `can't update order product`,
      error: 'the quantity must be grater than 0',
    });
    return;
  }

  try {
    // for checking if user has order with id equal the passed id
    const userOrder = await order.show(Number(orderID));

    if (userOrder?.user_name !== user) {
      res.status(400).json({
        msg: `there is no order with ID (${orderID}) for user ${user}`,
      });
      return;
    }
  } catch (error) {
    res.status(400).json({ eror: `order id must be number` });
    return;
  }

  try {
    // if there is product already in order with product id equal to the passed one update the existing quantity
    const o = await order.getProducts();

    if (o?.length) {
      const orderProduct = o.find(
        (order) => order.p_id === productID && order.o_id === orderID
      );

      if (orderProduct) {
        const updated = await order.updateOrderProduct(
          Number(orderProduct.id),
          Number(quantity)
        );
        res
          .status(201)
          .json({ msg: `order ${orderID} quantity updated`, order: updated });
        return;
      }
    }

    const result = await order.addProduct(
      Number(orderID),
      Number(productID),
      Number(quantity)
    );

    res.status(201).json({
      msg: `product with ID (${productID}) added to order with ID (${orderID})  for user: ${user}`,
      result: result,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: `can't add product to order may be product doesn't exist` });
  }
}

// getting all products added to all orders by request /order/product route by get method

async function getAllProducts(req: Request, res: Response) {
  try {
    const result = await order.getProducts();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ msg: `can't get data` });
  }
}

// get specific product in specific order by request /order/product/:ID route by get method and return a order product if exist

async function getOrderProduct(req: Request, res: Response) {
  const orderproductID: string = req.params.ID;
  try {
    const result = await order.getOrderProduct(Number(orderproductID));
    if (result) res.status(200).json(result);
    else {
      res.status(400).json({
        msg: `can't find order product with ID (${orderproductID})`,
      });
    }
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// updating a product quantity in specific order for specific user by request user/:userName/order/product/:ID route by put method and update a order if it exists

async function updateOrderProduct(req: Request, res: Response) {
  const orderProductID: string = req.params.ID;
  const { quantity } = req.body;

  // make sure that quantity passed is grater than zero
  if (Number(quantity) <= 0) {
    res.status(400).json({
      msg: `can't update order product`,
      error: 'the quantity must be grater than 0',
    });
    return;
  }

  try {
    // checking if order product already exist
    const result = await order.getOrderProduct(Number(orderProductID));
    if (!result) {
      return res.status(400).json({
        msg: `can't find order product with ID (${orderProductID})`,
      });
    }

    // update product quantity in order
    const updated = await order.updateOrderProduct(
      Number(orderProductID),
      Number(quantity)
    );
    res
      .status(201)
      .json({ msg: `order product quantity updated`, order: updated });
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

// deleting a product in order by request user/:userName/order/product/:ID route by delete method and delete a order if exist

async function deleteOrderProduct(req: Request, res: Response) {
  const orderProductID: string = req.params.id;

  try {
    // checking if order product already exist
    const result = await order.getOrderProduct(Number(orderProductID));
    if (!result) {
      return res.status(404).json({
        msg: `can't find order product with ID (${orderProductID})`,
      });
    }

    //   delete product in order
    const deleted = await order.deleteOrderProduct(Number(orderProductID));
    res.status(200).json({ msg: deleted });
  } catch (error) {
    res.status(400).json({ msg: `ERR: ${error}` });
  }
}

export default {
  addOrderProduct,
  getAllProducts,
  getOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
};
