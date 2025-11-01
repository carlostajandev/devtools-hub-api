/* eslint-disable prettier/prettier */
export class SubscriptionResponseDto {
  id: number;
  userId: string;
  planId: number;
  planName: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
