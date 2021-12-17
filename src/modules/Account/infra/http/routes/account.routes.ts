import { Router } from 'express';
import AccountController from '../controllers/AccountController';
import ensureAutenticated from '../../../../User/infra/http/middlewares/ensureAuthenticated';

const accountRoutes = Router();
const accountControler = new AccountController();

accountRoutes.post('/createAccount', ensureAutenticated, accountControler.createAccount);
accountRoutes.get('/listAccounts', ensureAutenticated, accountControler.listAccounts);
accountRoutes.put('/updateAccount', ensureAutenticated, accountControler.updateAccount);
accountRoutes.delete('/deleteAccount', ensureAutenticated, accountControler.deleteAccount);

export default accountRoutes;
