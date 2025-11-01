/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GetAllUsersUseCase } from '../use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly getAllUsers: GetAllUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  findAll() {
    return this.getAllUsers.execute();
  }

  findById(id: string) {
    return this.getUserById.execute(id);
  }

  update(id: string, data: any) {
    return this.updateUser.execute(id, data);
  }

  delete(id: string) {
    return this.deleteUser.execute(id);
  }
}
