import { DeleteResult } from 'typeorm';
import IFriendDTO from '../dtos/IFriendDTO';
import Friend from '../infra/typeorm/entities/Friend';

export default interface IFriendRepository {
  create(data: IFriendDTO): Promise<Friend>
  findById(id: string): Promise<Friend | null>
  findByUserId(user_id: string): Promise<Friend[] | null>
  findByName(user_id: string, name: string): Promise<Friend[] | null>
  findByAddress(user_id: string, address: string): Promise<Friend[] | null>
  findByPhone(user_id: string, phone: string): Promise<Friend[] | null>
  update(data: Friend): Promise<Friend>
  delete(id: string): Promise<DeleteResult>
}
