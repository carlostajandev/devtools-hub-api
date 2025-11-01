import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { LoginDto } from "../../presentation/dto/login.dto";
import { UserRepository } from "../../../user/domain/repositories/user.repository";

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject("UserRepository")
    private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException("Invalid credentials");

    // JWT debería generarse aquí
    return { token: "FAKE_JWT_TOKEN" };
  }
}
