import { Router } from 'express';
import FriendController from '../controllers/FriendController';
import ensureAutenticated from '../../../../User/infra/http/middlewares/ensureAuthenticated';

const friendRoutes = Router();
const friendControler = new FriendController();

friendRoutes.post('/createFriend', ensureAutenticated, friendControler.createFriend);
friendRoutes.get('/listFriends', ensureAutenticated, friendControler.listFriends);
friendRoutes.put('/updateFriend', ensureAutenticated, friendControler.updateFriend);
friendRoutes.delete('/deleteFriend', ensureAutenticated, friendControler.deleteFriend);

export default friendRoutes;
