import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { zonedTimeToUtc } from 'date-fns-tz';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    const timeZonedParsedDate = zonedTimeToUtc(date, 'America/Brasília');

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date: timeZonedParsedDate,
    });

    return response.json(appointment);
  }
}
