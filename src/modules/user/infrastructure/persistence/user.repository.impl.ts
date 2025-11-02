import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/user.entity";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: string): Promise<UserEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findAll(): Promise<UserEntity[]> {
    return this.repo.find();
  }

  save(user: UserEntity): Promise<UserEntity> {
    return this.repo.save(user);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const existing = await this.findById(user.id);
    if (!existing) {
      throw new Error(`Usuario con ID ${user.id} no existe`);
    }

    return this.repo.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
