import { container } from 'tsyringe';
import { Request, Response } from 'express';

import UserService from '../../../services/UserService';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService);
    const { name, login, password } = request.body;

    const user = await userService.createUser({
      name, login, password,
    });

    delete user.password;

    return response.json(user);
  }
}
