import { container } from 'tsyringe';

import UserRepository from '../../modules/User/infra/typeorm/repositories/UserRepository';
import IUserRepository from '../../modules/User/repositories/IUserRepository';
import FriendRepository from '../../modules/Friend/infra/typeorm/repositories/FriendRepository';
import IFriendRepository from '../../modules/Friend/repositories/IFriendRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IFriendRepository>('FriendRepository', FriendRepository);
