import { compare, hash } from 'bcrypt';

import IHashProvider from './IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    return hash(password, 8);
  }

  public async compareHashes(
    password: string,
    hashedPasswordInStore: string
  ): Promise<boolean> {
    return compare(password, hashedPasswordInStore);
  }
}

export default BCryptHashProvider;
