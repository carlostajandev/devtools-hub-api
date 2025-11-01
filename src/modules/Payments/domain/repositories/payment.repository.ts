/* eslint-disable prettier/prettier */
import { PaymentEntity } from '../entities/payment.entity';

export abstract class PaymentRepository {
  abstract save(payment: PaymentEntity): Promise<PaymentEntity>;
  abstract findById(id: number): Promise<PaymentEntity | null>;
  abstract findByUser(userId: string): Promise<PaymentEntity[]>;
  abstract update(payment: PaymentEntity): Promise<PaymentEntity>;
}
