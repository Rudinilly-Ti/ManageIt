import { Router } from 'express';
import userRoutes from '../../../../modules/User/infra/http/routes/user.routes';
import friendRoutes from '../../../../modules/Friend/infra/http/routes/friend.routes';
import accountRoutes from '../../../../modules/Account/infra/http/routes/account.routes';
import expenseRoutes from '../../../../modules/Expense/infra/http/routes/expense.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/friend', friendRoutes);
routes.use('/account', accountRoutes);
routes.use('/expense', expenseRoutes);

export default routes;
