import { Router } from 'express';
import jwtAuthenticate from '../middleware/jwt_authinticate';
import jwtAuthorize from '../middleware/jwt_authorization';
import user from './api/user';

const route = Router();

// user routes
route.post('/user', user.create);
route.get('/users', jwtAuthenticate, user.index);
route.get('/user/:userName', jwtAuthenticate, user.getUser);
route.put('/user/:userName', jwtAuthorize, user.updateUser);
route.delete('/user/:userName', jwtAuthorize, user.deleteUser);

export default route;
