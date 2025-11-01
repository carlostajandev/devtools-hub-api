import { UserEntity } from "../user.entity";

export abstract class UserRepository {
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract findAll(): Promise<UserEntity[]>;
  abstract save(user: UserEntity): Promise<UserEntity>;
  abstract update(user: UserEntity): Promise<UserEntity>;
  abstract delete(id: string): Promise<void>;
}
