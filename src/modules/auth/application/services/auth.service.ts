import { Injectable } from "@nestjs/common";
import { RegisterDto } from "../../presentation/dto/register.dto";
import { LoginDto } from "../../presentation/dto/login.dto";
import { RegisterUseCase } from "../use-cases/register.use-case";
import { LoginUseCase } from "../use-cases/login.use-case";
import { UserEntity } from "../../../user/domain/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  register(dto: RegisterDto): Promise<UserEntity> {
    return this.registerUseCase.execute(dto);
  }

  login(dto: LoginDto): Promise<{ token: string }> {
    return this.loginUseCase.execute(dto);
  }
}
