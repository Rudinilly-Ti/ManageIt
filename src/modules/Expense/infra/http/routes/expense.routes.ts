import { Router } from 'express';
import ensureAutenticated from '../../../../User/infra/http/middlewares/ensureAuthenticated';
import ExpenseController from '../controllers/ExpenseController';

const expenseRoutes = Router();
const expenseController = new ExpenseController();

expenseRoutes.post('/createExpense', ensureAutenticated, expenseController.createExpense);
expenseRoutes.get('/listExpenses', ensureAutenticated, expenseController.listExpenses);
expenseRoutes.put('/updateExpense', ensureAutenticated, expenseController.updateExpense);
expenseRoutes.delete('/deleteExpense', ensureAutenticated, expenseController.deleteExpense);

export default expenseRoutes;
