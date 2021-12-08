import { Router } from 'express';
import userRoutes from '../../../../modules/User/infra/http/routes/user.routes';

const routes = Router();

routes.use('/user', userRoutes);

export default routes;
