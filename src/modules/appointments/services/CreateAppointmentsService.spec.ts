import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createRepository: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createRepository = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createRepository.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should NOT be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createRepository.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    await expect(
      createRepository.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
