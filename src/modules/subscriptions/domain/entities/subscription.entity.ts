/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from '../../../user/domain/user.entity';
import { PlanEntity } from '../../../plans/domain/entities/plan.entity';

@Entity({ name: 'subscriptions' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => PlanEntity)
  @JoinColumn({ name: 'plan_id' })
  plan: PlanEntity;

  @Column({ type: 'timestamp', name: 'start_date', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'timestamp', name: 'end_date', nullable: true })
  endDate?: Date;

  @Column({ default: 'active' })
  status: 'active' | 'cancelled' | 'expired';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
