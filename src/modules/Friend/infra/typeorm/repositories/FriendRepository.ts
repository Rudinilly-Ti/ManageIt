import {
  getRepository, Repository, DeleteResult, Like,
} from 'typeorm';
import IFriendDTO from '../../../dtos/IFriendDTO';
import IFriendRepository from '../../../repositories/IFriendRepository';
import Friend from '../entities/Friend';

export default class FriendRepository implements IFriendRepository {
  private ormRepository: Repository<Friend>

  constructor() {
    this.ormRepository = getRepository(Friend)
  }

  public async create(data: IFriendDTO): Promise<Friend> {
    const friend = this.ormRepository.create(data);

    await this.ormRepository.save(friend);

    return friend;
  }

  public async findById(id: string): Promise<Friend | null> {
    const friend = await this.ormRepository.findOne({ id });

    return friend || null;
  }

  public async findByUserId(user_id: string): Promise<Friend[] | null> {
    const friends = await this.ormRepository.find({ user_id });

    return friends || null;
  }

  public async findByName(user_id: string, name: string): Promise<Friend[] | null> {
    const friend = await this.ormRepository.find({ user_id, name: Like(`%${name}%`) });

    return friend || null;
  }

  public async findByAddress(user_id: string, address: string): Promise<Friend[] | null> {
    const friends = await this.ormRepository.find({ user_id, address: Like(`%${address}%`) });

    return friends || null;
  }

  public async findByPhone(user_id: string, phone: string): Promise<Friend[] | null> {
    const friends = await this.ormRepository.find({ user_id, phone: Like(`%${phone}%`) });

    return friends || null;
  }

  public async update(data: Friend): Promise<Friend> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete({ id })
  }
}
