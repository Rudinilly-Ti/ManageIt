import { getRepository, Repository, DeleteResult } from 'typeorm';
import IUserRepository from '../../../repositories/IUserRepository';
import IUserDto from '../../../dtos/IUserDto';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: IUserDto): Promise<User> {
    const user = this.ormRepository.create(data);

    await this.ormRepository.save(user);
    return user;
  }

  public async findByLogin(login: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { login } });

    return user || null;
  }

  public async update(data: IUserDto): Promise<User | null> {
    const user = await this.ormRepository.save(data);

    return user || null;
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(id)
  }
}
