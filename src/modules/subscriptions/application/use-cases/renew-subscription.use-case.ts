/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { UserRepository } from '../../../user/domain/repositories/user.repository';
import { PlanRepository } from '../../../plans/domain/repositories/plan.repository';

@Injectable()
export class RenewSubscriptionUseCase {
  constructor(
    @Inject('SubscriptionRepository')
    private readonly subscriptionRepository: SubscriptionRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('PlanRepository')
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(userId: string, planId: number): Promise<SubscriptionEntity> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const plan = await this.planRepository.findById(planId);
    if (!plan) throw new NotFoundException('Plan not found');

    const newSubscription = new SubscriptionEntity();
    newSubscription.user = user;
    newSubscription.plan = plan;
    newSubscription.startDate = new Date();
    newSubscription.status = 'active';

    return this.subscriptionRepository.save(newSubscription);
  }
}
