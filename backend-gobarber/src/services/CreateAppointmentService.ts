import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepositoy';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // vai padronizar a date para pegar somente a hora
    const appointmentDate = startOfHour(date);

    const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    // encontra para saber se existe um agendamento no mesmo horário
    if (findAppointmentsInSameDate) {
      throw new AppError('This appointment is alredy booked');
    }

    // somente cria a instância do appointment, mas não salva ele no Banco de dados
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    //Salva os appointment no banco de dados
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
export default CreateAppointmentService;
