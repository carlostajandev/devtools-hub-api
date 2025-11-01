/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { SubscriptionRepository } from '../../../subscriptions/domain/repositories/subscription.repository';

@Injectable()
export class CreatePaymentUseCase {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: string, subscriptionId: number, amount: number, method?: string): Promise<PaymentEntity> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const subscription = await this.subscriptionRepository.findById(subscriptionId);
    if (!subscription) throw new NotFoundException('Subscription not found');

    const payment = new PaymentEntity();
    payment.user = user;
    payment.subscription = subscription;
    payment.amount = amount;
    payment.method = method || 'manual';
    payment.status = 'pending';

    return this.paymentRepository.save(payment);
  }
}
