import { DeleteResult } from 'typeorm';
import IFriendDTO from '../dtos/IFriendDTO';
import Friend from '../infra/typeorm/entities/Friend';

export default interface IFriendRepository {
  create(data: IFriendDTO): Promise<Friend>
  findById(id: string): Promise<Friend | null>
  findByUserId(user_id: string): Promise<Friend[] | null>
  findByName(name: string): Promise<Friend | null>
  findByPhone(phone: string): Promise<Friend | null>
  update(data: Friend): Promise<Friend>
  delete(id: string): Promise<DeleteResult>
}
