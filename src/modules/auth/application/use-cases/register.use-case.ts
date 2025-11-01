/* eslint-disable prettier/prettier */
import { Injectable, ConflictException, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "../../presentation/dto/register.dto";
import { UserMapper } from "../../infrastructure/mappers/user.mapper";
import { UserEntity } from "../../../user/domain/user.entity";
import { UserRepository } from "../../../user/domain/repositories/user.repository";
import { SendPaymentConfirmationUseCase } from "../../../notifications/application/use-cases/send-payment-confirmation.use-case";

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository,
    private readonly sendConfirmation: SendPaymentConfirmationUseCase
  ) {}

  async execute(dto: RegisterDto): Promise<UserEntity> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException("Email already registered");

    const user = UserMapper.toEntity(dto);
    user.password = await bcrypt.hash(user.password, 10);
    
    const savedUser = await this.userRepository.save(user);

    // Envía email de bienvenida/confirmación
    await this.sendConfirmation.execute(
      savedUser.email,
      0, // Monto 0 para registro
      'registration' // Tipo de operación
    );

    return savedUser;
  }
}