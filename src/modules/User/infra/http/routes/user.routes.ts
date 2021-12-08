import { Router } from 'express';
import UserController from '../controllers/UserController';
import ensureAutenticated from '../middlewares/ensureAuthenticated';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post('/createUser', userController.create);
userRoutes.post('/authentication', userController.authentication);
userRoutes.put('/updateUser', ensureAutenticated, userController.update)

export default userRoutes;
