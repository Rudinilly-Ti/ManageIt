import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import Friend from '../infra/typeorm/entities/Friend';
import IFriendDTO from '../dtos/IFriendDTO';
import IFriendRepository from '../repositories/IFriendRepository';

interface IRequest {
  id: string
  user_id: string
  name: string
  adress: string
  phone: string
}

@injectable()
export default class FriendService {
  constructor(
    @inject('FriendRepository')
    private friendRepository: IFriendRepository,
  ) { }

  public async create({
    user_id, name, adress, phone,
  }: IFriendDTO): Promise<Friend> {
    const checkName = await this.friendRepository.findByName(name);
    if (checkName) {
      throw new Error('Name already used.');
    }

    const checkPhone = await this.friendRepository.findByPhone(phone);
    if (checkPhone) {
      throw new Error('Phone already used.');
    }

    const friend = await this.friendRepository.create({
      user_id, name, adress, phone,
    });

    return friend;
  }

  public async listFriends(user_id: string): Promise<Friend[]> {
    const friends = await this.friendRepository.findByUserId(user_id);

    if (!friends) {
      throw new Error('User does not have any friend.')
    }

    return friends;
  }

  public async updateFriend({
    id, user_id, name, adress, phone,
  }: IRequest): Promise<Friend> {
    const friend = await this.friendRepository.findById(id);

    if (!friend) {
      throw new Error('Friend not found.')
    }

    if (friend.user_id !== user_id) {
      throw new Error('You are not allowed to update.');
    }

    if (friend.name !== name && name) { friend.name = name }
    if (friend.adress !== adress && adress) { friend.adress = adress }
    if (friend.phone !== phone && phone) { friend.phone = phone }

    await this.friendRepository.update(friend);

    return friend;
  }

  public async deleteFriend(id: string, user_id: string): Promise<DeleteResult> {
    const friend = await this.friendRepository.findById(id);

    if (friend.user_id !== user_id) {
      throw new Error('You are not allowed to delete.');
    }

    const res = await this.friendRepository.delete(id);

    return res;
  }
}
