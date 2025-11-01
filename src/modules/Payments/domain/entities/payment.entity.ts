/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserEntity } from '../../../user/domain/user.entity';
import { SubscriptionEntity } from '../../../subscriptions/domain/entities/subscription.entity';

@Entity({ name: 'payments' })
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => SubscriptionEntity)
  @JoinColumn({ name: 'subscription_id' })
  subscription: SubscriptionEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'completed' | 'failed' | 'refunded';

  @Column({ nullable: true })
  method?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
