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
    user_id, name, adress, phone,
  }: IFriendDTO): Promise<Friend> {
    const myfriends = await this.friendRepository.findByUserId(user_id);

    myfriends.forEach((friend) => {
      if (friend.name === name && friend.adress === adress && friend.phone === phone) {
        throw new Error('Friend already registred.');
      }
    })

    const friend = await this.friendRepository.create({
      user_id, name, adress, phone,
    });

    return friend;
  }

  public async listFriends({
    user_id, option, optionValue,
  }: IListFriends): Promise<Friend[] | Friend> {
    let friends;
    let friend;
    if (!option) {
      friends = await this.friendRepository.findByUserId(user_id);
    }

    if (option === 'name') {
      friends = await this.friendRepository.findByName(user_id, optionValue);
    }

    if (option === 'adress') {
      friends = await this.friendRepository.findByAdress(user_id, optionValue);
    }

    if (option === 'phone') {
      friend = await this.friendRepository.findByPhone(user_id, optionValue);
    }

    if (!friends && !friend) {
      throw new Error('Friends not found.')
    }

    return friends || friend;
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
