/* eslint-disable prettier/prettier */
import { PaymentEntity } from '../../domain/entities/payment.entity';
import { PaymentResponseDto } from '../../presentation/dto/payment-response.dto';

export class PaymentMapper {
  static toResponse(entity: PaymentEntity): PaymentResponseDto {
    return {
      id: entity.id,
      userId: entity.user?.id,
      subscriptionId: entity.subscription?.id,
      amount: Number(entity.amount),
      status: entity.status,
      method: entity.method,
      createdAt: entity.createdAt,
    };
  }
}
