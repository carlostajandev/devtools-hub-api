/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

@Injectable()
export class CancelSubscriptionUseCase {
  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(id: number): Promise<SubscriptionEntity> {
    const subscription = await this.subscriptionRepository.findById(id);
    if (!subscription) throw new NotFoundException('Subscription not found');

    subscription.status = 'cancelled';
    subscription.endDate = new Date();

    return this.subscriptionRepository.update(subscription);
  }
}
