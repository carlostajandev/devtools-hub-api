/* eslint-disable prettier/prettier */
export class PaymentResponseDto {
  id: number;
  userId: string;
  subscriptionId: number;
  amount: number;
  status: string;
  method?: string;
  createdAt: Date;
}
