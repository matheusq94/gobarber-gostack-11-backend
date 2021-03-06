import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const showProfile = container.resolve(ShowProfileService);

      const user = await showProfile.execute({ user_id });

      return response.status(200).json(classToClass(user));
    } catch (error) {
      return response.status(404).json({ error: error.message });
    }
  }

  async update(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, old_password } = request.body;
      const user_id = request.user.id;

      const createUser = container.resolve(UpdateProfileService);

      const user = await createUser.execute({
        user_id,
        name,
        email,
        password,
        old_password,
      });

      return response.status(200).json(classToClass(user));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
