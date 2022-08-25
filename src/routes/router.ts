import { Router } from 'express';
import jwtAuthenticate from '../middleware/jwt_authinticate';
import jwtAuthorize from '../middleware/jwt_authorization';
import user from './api/user/handlers/user';
import product from './api/product/handlers/product';
import order from './api/order/handlers/order';
import orderProduct from './api/order/handlers/order_product';
import service from './api/services/handlers/dashboard';

// router generator
const route = Router();

/*
    user routes
*/

// create new user
route.post('/user', user.create);

// get all users token required
route.get('/user', jwtAuthenticate, user.index);

// get user by his user name, token required
route.get('/user/:userName', jwtAuthenticate, user.getUser);

// update user data by his user name, user token required
route.put('/user/:userName', jwtAuthorize, user.update);

// delete user by his user name, user token required
route.delete('/user/:userName', jwtAuthorize, user.deleteUser);

// ###################################################################

/*
    product routes
*/

// create new product, token required
route.post('/product', jwtAuthenticate, product.create);

// get all products
route.get('/product', product.index);

// get product by its id
route.get('/product/:productID', product.getProduct);

// get product by its category
route.get('/product/category/:category', product.productsByCategory);

// update product data by its id, token required
route.put('/product/:productID', jwtAuthenticate, product.update);

// delete product by its id, token required
route.delete('/product/:productID', jwtAuthenticate, product.deleteProduct);

// ###################################################################

/*
    order routes
*/

// create new order, token required
route.post('/user/:userName/order', jwtAuthorize, order.create);

// get all orders
route.get('/order', jwtAuthenticate, order.index);

// get order by its id
route.get('/order/:orderID', jwtAuthenticate, order.getOrder);

// update order status for specific user by its id, token required
route.put('/user/:userName/order/:orderID', jwtAuthorize, order.update);

// delete order for specific user by its id, token required
route.delete('/user/:userName/order/:orderID', jwtAuthorize, order.deleteOrder);

// ###################################################################

/*
    order product routes
*/

// adding product to order for specific user, token required
route.post(
  '/user/:userName/order/product',
  jwtAuthorize,
  orderProduct.addOrderProduct
);

// get all products in all orders
route.get('/order/product/all', jwtAuthenticate, orderProduct.getAllProducts);

// get product in order by order product id
route.get('/order/product/:ID', jwtAuthenticate, orderProduct.getOrderProduct);

// update product quantity in specific order for specific user by its id, token required
route.put(
  '/user/:userName/order/product/:ID',
  jwtAuthorize,
  orderProduct.updateOrderProduct
);

// delete product in order for specific user by its id, token required
route.delete(
  '/user/:userName/order/product/:id',
  jwtAuthorize,
  orderProduct.deleteOrderProduct
);

// ###################################################################

/*
    dashboard routes
*/

// get completed order by user
route.get(
  '/user/:userName/order/completed',
  jwtAuthenticate,
  service.completedOrderByUser
);

// get current order by user
route.get(
  '/user/:userName/order/active',
  jwtAuthenticate,
  service.carruntOrderByUser
);

// get 5 most popular products
route.get('/products/popular', service.getPopularProducts);

export default route;
