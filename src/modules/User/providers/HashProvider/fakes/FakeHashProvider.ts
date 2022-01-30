import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(provider: string): Promise<string> {
    return provider;
  }

  public async compareHash(provider: string, hashed: string): Promise<boolean> {
    return provider === hashed;
  }
}
