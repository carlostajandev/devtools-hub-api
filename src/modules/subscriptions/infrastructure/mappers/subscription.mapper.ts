/* eslint-disable prettier/prettier */
import { SubscriptionEntity } from '../../domain/entities/subscription.entity';
import { SubscriptionResponseDto } from '../../presentation/dto/subscription-response.dto';

export class SubscriptionMapper {
  static toResponse(entity: SubscriptionEntity): SubscriptionResponseDto {
    return {
      id: entity.id,
      userId: entity.user?.id,
      planId: entity.plan?.id,
      planName: entity.plan?.name,
      status: entity.status,
      startDate: entity.startDate,
      endDate: entity.endDate,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
