/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../../domain/entities/payment.entity';

@Injectable()
export class PaymentService {
  calculateTax(payment: PaymentEntity): number {
    return Number((payment.amount * 0.19).toFixed(2));
  }

  calculateNetAmount(payment: PaymentEntity): number {
    return Number((payment.amount - this.calculateTax(payment)).toFixed(2));
  }
}
