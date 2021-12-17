import { DeleteResult } from 'typeorm';
import IAccountDTO from '../dtos/IAccountDTO';
import Account from '../infra/typeorm/entities/Account';

export default interface IAccountRepository {
  create(data: IAccountDTO): Promise<Account | null>
  findById(id: string): Promise<Account | null>
  findByUserId(user_id: string): Promise<Account[] | null>
  findByName(user_id: string, name: string): Promise<Account[] | null>
  findByLogin(user_id: string, login: string): Promise<Account[] | null>
  update(data: Account): Promise<Account>
  delete(id: string): Promise<DeleteResult>
}
