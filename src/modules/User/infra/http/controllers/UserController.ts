import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UserService from '../../../services/UserService';

export default class UserController {
  private userService: UserService

  constructor() {
    this.userService = container.resolve(UserService)
  }

  public async authentication(request: Request, response: Response): Promise<Response> {
    const { login, password } = request.body;

    const { user, token } = await this.userService.authenticate({ login, password });

    delete user.password;

    return response.json({ user, token });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, login, password } = request.body;

    const user = await this.userService.createUser({
      name, login, password,
    });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { name, login, password } = request.body;

    const user = await this.userService.updateUser({
      id, name, login, password,
    });

    delete user.password;

    return response.json(user);
  }
}
