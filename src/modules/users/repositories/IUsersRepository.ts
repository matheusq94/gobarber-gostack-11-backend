import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
}
