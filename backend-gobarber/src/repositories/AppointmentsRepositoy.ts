import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepositoy extends Repository<Appointment> {
  // vai fazer a busca pela date e caso não encontre vai retornar Nullo
  // por isso tem o pipe null, para saber que ele ou retornar um appointment
  // ou retorna nulo
  public async findByDate(date: Date): Promise<Appointment | null> {
    // vai percorrer o array de agendamentos(appointments)
    // e econtrar se existe alguma data já marcada
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );

    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepositoy;
