import { DeleteResult } from 'typeorm'

import User from '../infra/typeorm/entities/User';
import IUserDto from '../dtos/IUserDto';

export default interface IUserRepository {
  create(data: IUserDto): Promise<User>
  findByLogin(login: string): Promise<User | null>
  update(data: IUserDto): Promise<User | null>
  delete(id: string): Promise<DeleteResult>
}
