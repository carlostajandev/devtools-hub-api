/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EmailAdapter } from '../../infrastructure/adapters/email.adapter';

@Injectable()
export class SendPaymentConfirmationUseCase {
  constructor(private readonly emailAdapter: EmailAdapter) {}

  async execute(email: string, amount: number, method: string): Promise<void> {
    const subject = 'Confirmación de tu pago en DevToolsHub';
    const message = `
      Hemos recibido correctamente tu pago de <strong>$${amount}</strong> 
      realizado mediante <strong>${method}</strong>.<br><br>
      Tu suscripción ha sido activada con éxito 🎉.<br><br>
      ¡Gracias por confiar en DevToolsHub!  
      <br><br>
      <em>El equipo de DevToolsHub 💻</em>
    `;
    await this.emailAdapter.sendEmail(email, subject, message);
  }
}
