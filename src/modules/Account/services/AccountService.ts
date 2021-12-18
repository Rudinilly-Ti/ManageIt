import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import IAccountRepository from '../repositories/IAccountRepository';
import IAccountDTO from '../dtos/IAccountDTO';
import Account from '../infra/typeorm/entities/Account';

interface IResquest {
  id: string
  user_id: string
  name: string
  login: string
  password: string
}

interface IListAccounts {
  user_id: string
  option?: string
  optionValue?: string
}

@injectable()
export default class AccountService {
  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
  ) { }

  public async create({
    user_id, name, login, password,
  }: IAccountDTO): Promise<Account> {
    const myAccounts = await this.accountRepository.findByUserId(user_id);

    myAccounts.forEach((acc) => {
      if (acc.name === name && acc.login === login) {
        throw new Error('Account already registred.');
      }
    })

    const account = await this.accountRepository.create({
      user_id, name, login, password,
    })

    return account;
  }

  public async listAccounts({ user_id, option, optionValue }: IListAccounts): Promise<Account[]> {
    let accounts: Account[];
    if (!option) {
      accounts = await this.accountRepository.findByUserId(user_id);
    }

    if (option === 'name') {
      accounts = await this.accountRepository.findByName(user_id, optionValue);
    }

    if (option === 'login') {
      accounts = await this.accountRepository.findByLogin(user_id, optionValue);
    }

    if (accounts.length === 0) {
      throw new Error("Can't find any account.");
    }

    return accounts;
  }

  public async updateAccount({
    id, user_id, name, login, password,
  }: IResquest): Promise<Account> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new Error('Account not found.');
    }

    if (account.user_id !== user_id) {
      throw new Error('You are not allowed to update.');
    }

    if (account.name !== name) { account.name = name }
    if (account.login !== login) { account.login = login }
    if (account.password !== password) { account.password = password }

    await this.accountRepository.update(account);

    return account;
  }

  public async deleteAccount(id: string, user_id: string): Promise<DeleteResult> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new Error('Account not found.');
    }

    if (account.user_id !== user_id) {
      throw new Error('You are not allowed to delete.');
    }

    const res = await this.accountRepository.delete(id);

    return res;
  }
}
