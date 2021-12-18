import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import Friend from '../infra/typeorm/entities/Friend';
import IFriendDTO from '../dtos/IFriendDTO';
import IFriendRepository from '../repositories/IFriendRepository';

interface IRequest {
  id: string
  user_id: string
  name: string
  address: string
  phone: string
}

interface IListFriends {
  user_id: string
  option: string
  optionValue: string
}

@injectable()
export default class FriendService {
  constructor(
    @inject('FriendRepository')
    private friendRepository: IFriendRepository,
  ) { }

  public async create({
    user_id, name, address, phone,
  }: IFriendDTO): Promise<Friend> {
    const myfriends = await this.friendRepository.findByUserId(user_id);

    myfriends.forEach((friend) => {
      if (friend.name === name && friend.address === address && friend.phone === phone) {
        throw new Error('Friend already registred.');
      }
    })

    const friend = await this.friendRepository.create({
      user_id, name, address, phone,
    });

    return friend;
  }

  public async listFriends({
    user_id, option, optionValue,
  }: IListFriends): Promise<Friend[] | Friend> {
    let friends: Friend[];
    if (!option) {
      friends = await this.friendRepository.findByUserId(user_id);
    }

    if (option === 'name') {
      friends = await this.friendRepository.findByName(user_id, optionValue);
    }

    if (option === 'address') {
      friends = await this.friendRepository.findByAddress(user_id, optionValue);
    }

    if (option === 'phone') {
      friends = await this.friendRepository.findByPhone(user_id, optionValue);
    }

    if (friends.length === 0) {
      throw new Error("Can't find any friend.")
    }

    return friends;
  }

  public async updateFriend({
    id, user_id, name, address, phone,
  }: IRequest): Promise<Friend> {
    const friend = await this.friendRepository.findById(id);

    if (!friend) {
      throw new Error('Friend not found.')
    }

    if (friend.user_id !== user_id) {
      throw new Error('You are not allowed to update.');
    }

    if (friend.name !== name && name) { friend.name = name }
    if (friend.address !== address && address) { friend.address = address }
    if (friend.phone !== phone && phone) { friend.phone = phone }

    await this.friendRepository.update(friend);

    return friend;
  }

  public async deleteFriend(id: string, user_id: string): Promise<DeleteResult> {
    const friend = await this.friendRepository.findById(id);

    if (!friend) {
      throw new Error('Friend not found.');
    }

    if (friend.user_id !== user_id) {
      throw new Error('You are not allowed to delete.');
    }

    const res = await this.friendRepository.delete(id);

    return res;
  }
}
