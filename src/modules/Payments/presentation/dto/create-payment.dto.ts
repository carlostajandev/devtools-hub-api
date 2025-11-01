/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'ID del usuario que realiza el pago',
    example: 'user-12345',
    required: true
  })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  @IsString({ message: 'El ID del usuario debe ser una cadena de texto' })
  userId: string;

  @ApiProperty({
    description: 'ID de la suscripción asociada al pago',
    example: 1,
    required: true
  })
  @IsNotEmpty({ message: 'El ID de la suscripción es requerido' })
  @IsNumber({}, { message: 'El ID de la suscripción debe ser un número' })
  subscriptionId: number;

  @ApiProperty({
    description: 'Monto del pago',
    example: 99.99,
    required: true
  })
  @IsNotEmpty({ message: 'El monto es requerido' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  amount: number;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'credit_card',
    required: false
  })
  @IsString({ message: 'El método de pago debe ser una cadena de texto' })
  method?: string;
}