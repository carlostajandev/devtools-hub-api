/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { PaymentRepository } from '../../domain/repositories/payment.repository';
import { PaymentEntity } from '../../domain/entities/payment.entity';

@Injectable()
export class GetPaymentsByUserUseCase {
  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async execute(userId: string): Promise<PaymentEntity[]> {
    return this.paymentRepository.findByUser(userId);
  }
}
