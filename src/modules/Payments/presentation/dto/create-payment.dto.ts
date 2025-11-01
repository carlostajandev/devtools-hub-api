/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  subscriptionId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  method?: string;
}
