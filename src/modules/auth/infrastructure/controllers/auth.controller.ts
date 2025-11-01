import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../../application/services/auth.service";
import { RegisterDto } from "../../presentation/dto/register.dto";
import { LoginDto } from "../../presentation/dto/login.dto";
import { ResponseDto } from "../../presentation/dto/response.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    return new ResponseDto(true, "User registered successfully", {
      id: user.id,
      email: user.email,
    });
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return new ResponseDto(true, "Login successful", result);
  }
}
