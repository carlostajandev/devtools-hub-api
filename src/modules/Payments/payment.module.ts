/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './domain/entities/payment.entity';
import { PaymentRepositoryImpl } from './infrastructure/persistence/payment.repository.impl';
import { CreatePaymentUseCase } from './application/use-cases/create-payment.use-case';
import { ConfirmPaymentUseCase } from './application/use-cases/confirm-payment.use-case';
import { RefundPaymentUseCase } from './application/use-cases/refund-payment.use-case';
import { GetPaymentsByUserUseCase } from './application/use-cases/get-payments-by-user.use-case';
import { PaymentController } from './infrastructure/controllers/payment.controller';
import { UsersModule } from '../user/user.module';
import { SubscriptionsModule } from '../subscriptions/subscription.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity]), UsersModule, SubscriptionsModule, NotificationsModule],
  controllers: [PaymentController],
  providers: [
    { provide: 'PaymentRepository', useClass: PaymentRepositoryImpl },
    CreatePaymentUseCase,
    ConfirmPaymentUseCase,
    RefundPaymentUseCase,
    GetPaymentsByUserUseCase,
  ],
  exports: ['PaymentRepository'],
})
export class PaymentsModule {}
