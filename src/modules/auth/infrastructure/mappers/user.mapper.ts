import { UserEntity } from "../../../user/domain/user.entity";
import { RegisterDto } from "../../presentation/dto/register.dto";

export class UserMapper {
  static toEntity(dto: RegisterDto): UserEntity {
    const user = new UserEntity();
    user.name = dto.name;
    user.email = dto.email;
    user.password = dto.password; // hash se aplica en el use-case
    return user;
  }
}
