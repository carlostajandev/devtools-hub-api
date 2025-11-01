import { Injectable, ConflictException, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { RegisterDto } from "../../presentation/dto/register.dto";
import { UserMapper } from "../../infrastructure/mappers/user.mapper";
import { UserEntity } from "../../../user/domain/user.entity";
import { UserRepository } from "../../../user/domain/repositories/user.repository";

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: RegisterDto): Promise<UserEntity> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException("Email already registered");

    const user = UserMapper.toEntity(dto);
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepository.save(user);
  }
}
