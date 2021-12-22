import { uuid } from 'uuidv4';
import IUserRepository from '../IUserRepository';
import IUserDto from '../../dtos/IUserDto';
import User from '../../infra/typeorm/entities/User';

export default class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async create({ name, login, password }: IUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: uuid(), name, login, password,
    })

    this.users.push(user);

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const findUser = this.users.find(
      (user) => user.id === id,
    )

    return findUser;
  }

  public async findByLogin(login: string): Promise<User | null> {
    const findUser = this.users.find(
      (user) => user.login === login,
    )

    return findUser;
  }

  public async update(data: User): Promise<User> {
    const findUser = this.users.find(
      (user) => user.id === data.id,
    )

    this.users.filter((user) => user.id === data.id)

    findUser.name = data.name
    findUser.login = data.login
    findUser.password = data.password

    this.users.push(findUser);

    return findUser;
  }
}
