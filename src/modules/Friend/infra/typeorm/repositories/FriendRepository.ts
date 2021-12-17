import { getRepository, Repository, DeleteResult } from 'typeorm';
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

  public async findByName(user_id: string, name: string): Promise<Friend | null> {
    const friend = await this.ormRepository.findOne({ user_id, name });

    return friend || null;
  }

  public async findByAdress(user_id: string, adress: string): Promise<Friend[] | null> {
    const friends = await this.ormRepository.find({ user_id, adress });

    return friends || null;
  }

  public async findByPhone(user_id: string, phone: string): Promise<Friend | null> {
    const friend = await this.ormRepository.findOne({ user_id, phone });

    return friend || null;
  }

  public async update(data: Friend): Promise<Friend> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete({ id })
  }
}
