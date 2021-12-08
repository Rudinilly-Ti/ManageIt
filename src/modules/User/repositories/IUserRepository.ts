import { DeleteResult } from 'typeorm'

import User from '../infra/typeorm/entities/User';
import IUserDto from '../dtos/IUserDto';

export default interface IUserRepository {
  create(data: IUserDto): Promise<User>
  findById(id: string): Promise<User | null>
  findByLogin(login: string): Promise<User | null>
  update(data: User): Promise<User | null>
  delete(id: string): Promise<DeleteResult>
}
