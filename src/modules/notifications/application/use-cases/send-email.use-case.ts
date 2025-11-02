/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { EmailAdapter } from '../../infrastructure/adapters/email.adapter';

@Injectable()
export class SendEmailUseCase {
  constructor(private readonly emailAdapter: EmailAdapter) {}

  execute(to: string, subject: string, message: string): void {
    this.emailAdapter.sendEmail(to, subject, message);
  }
}
