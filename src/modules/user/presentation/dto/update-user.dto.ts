/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'María García López',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name?: string;

  @ApiProperty({
    description: 'Dirección de correo electrónico',
    example: 'maria.garcia@ejemplo.com',
    format: 'email',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser una dirección válida' })
  email?: string;

  @ApiProperty({
    description: 'Plan activo del usuario',
    example: 'premium',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'El plan activo debe ser una cadena de texto' })
  activePlan?: string;
}