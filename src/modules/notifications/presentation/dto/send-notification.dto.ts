/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({
    description: 'Dirección de correo electrónico del destinatario',
    example: 'destinatario@ejemplo.com',
    format: 'email'
  })
  @IsEmail({}, { message: 'El email del destinatario debe ser válido' })
  recipientEmail: string;

  @ApiProperty({
    description: 'Asunto de la notificación',
    example: 'Confirmación de Pago Exitoso',
    required: true
  })
  @IsString({ message: 'El asunto debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El asunto es requerido' })
  subject: string;

  @ApiProperty({
    description: 'Mensaje o contenido de la notificación',
    example: 'Su pago ha sido procesado exitosamente. Gracias por su compra.',
    required: true
  })
  @IsString({ message: 'El mensaje debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El mensaje es requerido' })
  message: string;
}