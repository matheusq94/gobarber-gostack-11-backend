import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  email: string;
  name: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    const findEmail = await this.usersRepository.findByEmail(email);

    if (findEmail && user_id !== findEmail.id) {
      throw new AppError('This email address already exists.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (old_password && password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.', 401);
      }

      const newPassword = await this.hashProvider.generateHash(password);
      user.password = newPassword;
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
