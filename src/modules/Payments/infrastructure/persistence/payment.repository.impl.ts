/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';

@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repo: Repository<PaymentEntity>,
  ) {}

  async save(payment: PaymentEntity): Promise<PaymentEntity> {
    return await this.repo.save(payment);
  }

  async findById(id: number): Promise<PaymentEntity | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['user', 'subscription'],
    });
  }

  async findByUser(userId: string): Promise<PaymentEntity[]> {
    return await this.repo.find({
      where: { user: { id: userId } },
      relations: ['user', 'subscription'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(payment: PaymentEntity): Promise<PaymentEntity> {
    await this.repo.save(payment);
    return payment;
  }
}
