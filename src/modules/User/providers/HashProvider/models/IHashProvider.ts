export default interface IHashProvider {
  generateHash(provider: string): Promise<string>
  compareHash(provider: string, hashed: string): Promise<boolean>
}
