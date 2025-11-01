/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  planId: number;
}
