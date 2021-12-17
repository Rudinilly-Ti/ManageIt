import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FriendService from '../../../services/FriendService';

export default class FriendController {
  private friendService: FriendService

  constructor() {
    this.friendService = container.resolve(FriendService);
  }

  public async createFriend(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, adress, phone } = request.body;

    const friend = await this.friendService.create({
      user_id, name, adress, phone,
    });

    return response.json(friend);
  }

  public async listFriends(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { option, optionValue } = request.body;

    const friends = await this.friendService.listFriends({ user_id, option, optionValue });

    return response.json(friends);
  }

  public async updateFriend(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      id, name, adress, phone,
    } = request.body;

    const friend = await this.friendService.updateFriend({
      id, user_id, name, adress, phone,
    });

    return response.json(friend);
  }

  public async deleteFriend(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { id } = request.body;

    const friend = await this.friendService.deleteFriend(id, user_id);

    return response.json(friend);
  }
}
