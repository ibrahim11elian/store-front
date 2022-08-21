import { Router } from 'express';
import jwtAuthenticate from '../middleware/jwt_authinticate';
import jwtAuthorize from '../middleware/jwt_authorization';
import user from './api/user';
import product from './api/product';
import order from './api/order';

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
route.put('/user/:userName', jwtAuthorize, user.updateUser);
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
// update product data by its id, token required
route.put('/product/:productID', jwtAuthenticate, product.updateProduct);
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
route.put('/user/:userName/order/:orderID', jwtAuthorize, order.updateOrder);
// delete order for specific user by its id, token required
route.delete('/user/:userName/order/:orderID', jwtAuthorize, order.deleteOrder);

export default route;
