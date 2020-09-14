import { hash, compare } from 'bcryptjs';
import IHashProvier from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvier {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
