/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';

@Injectable()
export class GetUserSubscriptionsUseCase {
  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(userId: string): Promise<SubscriptionEntity[]> {
    return this.subscriptionRepository.findByUser(userId);
  }
}
