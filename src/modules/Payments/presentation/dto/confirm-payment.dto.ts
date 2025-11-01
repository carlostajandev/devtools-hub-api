/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ConfirmPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  paymentId: number;
}
