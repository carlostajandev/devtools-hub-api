/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionRepository } from '../../domain/repositories/subscription.repository';
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';

@Injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly ormRepo: Repository<SubscriptionEntity>,
  ) {}

  findByUser(userId: string): Promise<SubscriptionEntity[]> {
    return this.ormRepo.find({ where: { user: { id: userId } }, relations: ['plan', 'user'] });
  }

  findById(id: number): Promise<SubscriptionEntity | null> {
    return this.ormRepo.findOne({ where: { id }, relations: ['plan', 'user'] });
  }

  save(subscription: SubscriptionEntity): Promise<SubscriptionEntity> {
    return this.ormRepo.save(subscription);
  }

  update(subscription: SubscriptionEntity): Promise<SubscriptionEntity> {
    return this.ormRepo.save(subscription);
  }
}
