import { inject, injectable } from 'tsyringe';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth'
import IUserDto from '../dtos/IUserDto';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  login: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

interface IRequestUpdate {
  id: string,
  name?: string,
  login?: string;
  password?: string;
}

@injectable()
export default class UserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) { }

  public async authenticate({ login, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByLogin(login);
    if (!user) {
      throw new Error('Incorrect Login/Password!');
    }

    const passwordMatched = await compare(password, user.password)
    if (!passwordMatched) {
      throw new Error('Incorrect Login/Password!');
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }

  public async createUser({ name, login, password }: IUserDto): Promise<User> {
    const checkUserExists = await this.userRepository.findByLogin(login);
    if (checkUserExists) { throw new Error('User already exists') }

    const hashedPassword = await hash(password, 8);
    const user = await this.userRepository.create({
      name,
      login,
      password: hashedPassword,
    });

    return user;
  }

  public async updateUser({
    id, name, login, password,
  }: IRequestUpdate): Promise<User> {
    const checkUserExists = await this.userRepository.findByLogin(login);
    if (checkUserExists) { throw new Error('This login is unavailable') }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Only authenticated users can update.');
    }

    if (name && user.name !== name) { user.name = name; }
    if (login && user.login !== login) { user.login = login; }
    if (password) {
      const passwordMatched = await compare(password, user.password)
      if (!passwordMatched) {
        const hashedPassword = await hash(password, 8);
        user.password = hashedPassword;
      }
    }

    await this.userRepository.update(user);

    return user;
  }
}
