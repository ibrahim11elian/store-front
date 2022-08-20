import { Router } from 'express';
import jwtAuthenticate from '../middleware/jwt_authinticate';
import jwtAuthorize from '../middleware/jwt_authorization';
import user from './api/user';

const route = Router();

// user routes
// create new user
route.post('/user', user.create);
// get all users tonken required
route.get('/users', jwtAuthenticate, user.index);
// get user by his user name, tonken required
route.get('/user/:userName', jwtAuthenticate, user.getUser);
// update user data by his user name, user tonken required
route.put('/user/:userName', jwtAuthorize, user.updateUser);
// delete user by his user name, user tonken required
route.delete('/user/:userName', jwtAuthorize, user.deleteUser);

export default route;
