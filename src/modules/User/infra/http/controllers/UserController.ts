import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UserService from '../../../services/UserService';

export default class UserController {
  public async authentication(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService);
    const { login, password } = request.body;

    const { user, token } = await userService.authenticate({ login, password });

    delete user.password;

    return response.json({ user, token });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService);
    const { name, login, password } = request.body;

    const user = await userService.createUser({
      name, login, password,
    });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService);
    const { id } = request.user;

    const { name, login, password } = request.body;

    const user = await userService.updateUser({
      id, name, login, password,
    });

    delete user.password;

    return response.json(user);
  }
}
