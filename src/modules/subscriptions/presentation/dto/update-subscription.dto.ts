/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsString()
  status?: 'active' | 'cancelled' | 'expired';

  @IsOptional()
  @IsDateString()
  endDate?: Date;
}
