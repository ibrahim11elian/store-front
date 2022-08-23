/* order handlers */

import create from './handlers/order/create_order';
import index from './handlers/order/all_orders';
import getOrder from './handlers/order/show_order';
import updateOrder from './handlers/order/update_order';
import deleteOrder from './handlers/order/delete_order';

/* order product handlers */

import addOrderProduct from './handlers/order_product/add_order_product';
import getAllProducts from './handlers/order_product/all_orders_products';
import getOrderProduct from './handlers/order_product/get_order_product';
import updateOrderProduct from './handlers/order_product/update_order_product';
import deleteOrderProduct from './handlers/order_product/delete_order_product';

export default {
  create,
  index,
  getOrder,
  updateOrder,
  deleteOrder,
  addOrderProduct,
  getAllProducts,
  getOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
};
