import { inject, injectable } from 'tsyringe';
import IUserDto from '../dtos/IUserDto';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

@injectable()
export default class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  public async createUser({ name, login, password }: IUserDto): Promise<User> {
    const checkUserExists = await this.userRepository.findByLogin(login);

    if (checkUserExists) { throw new Error('User already exists') }

    const user = await this.userRepository.create({ name, login, password })
    return user;
  }
}
