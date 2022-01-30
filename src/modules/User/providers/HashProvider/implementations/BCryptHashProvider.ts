import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(provider: string): Promise<string> {
    return hash(provider, 8);
  }

  public async compareHash(provider: string, hashed: string): Promise<boolean> {
    return compare(provider, hashed);
  }
}
