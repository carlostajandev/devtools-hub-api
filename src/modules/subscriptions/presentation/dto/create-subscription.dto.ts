/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    description: 'ID del usuario que crea la suscripción',
    example: 'user-12345',
    required: true
  })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsString({ message: 'El ID del usuario debe ser una cadena de texto' })
  userId: string;

  @ApiProperty({
    description: 'ID del plan al que se suscribe el usuario',
    example: 1,
    required: true
  })
  @IsNotEmpty({ message: 'El ID del plan es requerido' })
  @IsNumber({}, { message: 'El ID del plan debe ser un número' })
  planId: number;
}