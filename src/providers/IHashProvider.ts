interface IHashProvider {
  generateHash(password: string): Promise<string>;

  compareHashes(password: string, passwordInStore: string): Promise<boolean>;
}

export default IHashProvider;
