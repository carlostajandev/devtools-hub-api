/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmailAdapter } from './infrastructure/adapters/email.adapter';
import { SendEmailUseCase } from './application/use-cases/send-email.use-case';
import { SendSubscriptionChangeUseCase } from './application/use-cases/send-subscription-change.use-case';
import { SendPaymentConfirmationUseCase } from './application/use-cases/send-payment-confirmation.use-case';
import { NotificationController } from './infrastructure/controllers/notification.controller';

@Module({
  controllers: [NotificationController],
  providers: [
    EmailAdapter,
    SendEmailUseCase,
    SendSubscriptionChangeUseCase,
    SendPaymentConfirmationUseCase,
  ],
  exports: [
    SendEmailUseCase,
    SendSubscriptionChangeUseCase,
    SendPaymentConfirmationUseCase,
  ],
})
export class NotificationsModule {}
