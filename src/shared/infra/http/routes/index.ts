import { Router } from 'express';
import userRoutes from '../../../../modules/User/infra/http/routes/user.routes';
import friendRoutes from '../../../../modules/Friend/infra/http/routes/friend.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/friend', friendRoutes);

export default routes;
