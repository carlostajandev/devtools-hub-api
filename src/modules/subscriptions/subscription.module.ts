/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './domain/entities/subscription.entity';
import { SubscriptionRepositoryImpl } from './infrastructure/persistence/subscription.repository.impl';
import { SubscriptionController } from './infrastructure/controllers/subscription.controller';
import { CreateSubscriptionUseCase } from './application/use-cases/create-subscription.use-case';
import { GetUserSubscriptionsUseCase } from './application/use-cases/get-user-subscriptions.use-case';
import { CancelSubscriptionUseCase } from './application/use-cases/cancel-subscription.use-case';
import { RenewSubscriptionUseCase } from './application/use-cases/renew-subscription.use-case';
import { UsersModule } from '../user/user.module';
import { PlansModule } from '../plans/plans.module';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity]), UsersModule, PlansModule],
  controllers: [SubscriptionController],
  providers: [
    {
      provide: 'SubscriptionRepository',
      useClass: SubscriptionRepositoryImpl,
    },
    CreateSubscriptionUseCase,
    GetUserSubscriptionsUseCase,
    CancelSubscriptionUseCase,
    RenewSubscriptionUseCase,
  ],
  exports: ['SubscriptionRepository'],
})
export class SubscriptionsModule {}
