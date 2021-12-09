import { Request, Response } from 'express';
import { container } from 'tsyringe';

import Friend from '../../typeorm/entities/Friend';
import FriendService from '../../../services/FriendService';

export default class FriendController {
  public async createFriend(request: Request, response: Response): Promise<Response> {
    const friendService = container.resolve(FriendService);

    const user_id = request.user.id;
    const { name, adress, phone } = request.body;

    const friend = await friendService.create({
      user_id, name, adress, phone,
    });

    return response.json(friend);
  }

  public async listFriends(request: Request, response: Response): Promise<Response> {
    const friendService = container.resolve(FriendService);

    const user_id = request.user.id;
    const friends = await friendService.listFriends(user_id);

    return response.json(friends);
  }

  public async updateFriend(request: Request, response: Response): Promise<Response> {
    const friendService = container.resolve(FriendService);
    const user_id = request.user.id;
    const {
      id, name, adress, phone,
    } = request.body;

    const friend = await friendService.updateFriend({
      id, user_id, name, adress, phone,
    });

    return response.json(friend);
  }

  public async deleteFriend(request: Request, response: Response): Promise<Response> {
    const friendService = container.resolve(FriendService);

    const { id } = request.body;
    const user_id = request.user.id;
    const friend = await friendService.deleteFriend(id, user_id);

    return response.json(friend);
  }
}
