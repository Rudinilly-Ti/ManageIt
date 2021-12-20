import {
  Repository, getRepository, DeleteResult, Like,
} from 'typeorm';
import IAccountDTO from '../../../dtos/IAccountDTO';
import IAccountRepository from '../../../repositories/IAccountRepository';
import Account from '../entities/Account';

export default class AccountRepository implements IAccountRepository {
  private ormRepoistory: Repository<Account>

  constructor() {
    this.ormRepoistory = getRepository(Account)
  }

  public async create(data: IAccountDTO): Promise<Account> {
    const account = this.ormRepoistory.create(data)

    await this.ormRepoistory.save(account);

    return account;
  }

  public async findById(id: string): Promise<Account> {
    const account = this.ormRepoistory.findOne({ id });

    return account;
  }

  public async findByUserId(user_id: string): Promise<Account[]> {
    const users = await this.ormRepoistory.find({ user_id });

    return users;
  }

  public async findByName(user_id: string, name: string): Promise<Account[]> {
    const accounts = await this.ormRepoistory.find({ user_id, name: Like(`%${name}%`) });

    return accounts;
  }

  public async findByLogin(user_id: string, login: string): Promise<Account[]> {
    const accounts = await this.ormRepoistory.find({ user_id, login: Like(`%${login}%`) });

    return accounts;
  }

  public async update(data: Account): Promise<Account> {
    return this.ormRepoistory.save(data);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepoistory.delete({ id })
  }
}
