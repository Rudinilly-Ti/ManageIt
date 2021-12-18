import { container } from 'tsyringe';
import { Request, Response } from 'express';

import AccountService from '../../../services/AccountService';

export default class AccountController {
  public async createAccount(request: Request, response: Response): Promise<Response> {
    const accountService = container.resolve(AccountService);

    const user_id = request.user.id;

    const { name, login, password } = request.body;

    const account = await accountService.create({
      user_id, name, login, password,
    });

    return response.json(account);
  }

  public async listAccounts(request: Request, response: Response): Promise<Response> {
    const accountService = container.resolve(AccountService);

    const user_id = request.user.id;

    const { option, optionValue } = request.body;

    const accounts = await accountService.listAccounts({ user_id, option, optionValue });

    return response.json(accounts);
  }

  public async updateAccount(request: Request, response: Response): Promise<Response> {
    const accountService = container.resolve(AccountService);

    const user_id = request.user.id;

    const {
      id, name, login, password,
    } = request.body;

    const account = await accountService.updateAccount({
      id, user_id, name, login, password,
    });

    return response.json(account);
  }

  public async deleteAccount(request: Request, response: Response): Promise<Response> {
    const accountService = container.resolve(AccountService);

    const user_id = request.user.id;

    const { id } = request.body;

    const account = await accountService.deleteAccount(id, user_id);

    return response.json(account);
  }
}
