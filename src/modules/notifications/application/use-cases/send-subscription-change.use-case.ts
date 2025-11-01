/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EmailAdapter } from '../../infrastructure/adapters/email.adapter';

@Injectable()
export class SendSubscriptionChangeUseCase {
  constructor(private readonly emailAdapter: EmailAdapter) {}

  execute(email: string, planName: string, status: string): void {
    const subject = `Tu suscripción al plan ${planName} ha sido ${status}`;
    const message = `Hola! Te informamos que tu suscripción al plan "${planName}" ha cambiado de estado a "${status}".`;
    this.emailAdapter.sendEmail(email, subject, message);
  }
}
