/* eslint-disable prettier/prettier */
import { SubscriptionEntity } from '../entities/subscription.entity';

export abstract class SubscriptionRepository {
  abstract findByUser(userId: string): Promise<SubscriptionEntity[]>;
  abstract findById(id: number): Promise<SubscriptionEntity | null>;
  abstract save(subscription: SubscriptionEntity): Promise<SubscriptionEntity>;
  abstract update(subscription: SubscriptionEntity): Promise<SubscriptionEntity>;
}
