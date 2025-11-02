/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, data);
    return this.userRepository.update(user);
  }
}
