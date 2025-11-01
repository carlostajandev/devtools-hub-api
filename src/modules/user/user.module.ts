/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserRepositoryImpl } from './infrastructure/persistence/user.repository.impl';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './application/services/user.service';

// Casos de uso
import { GetAllUsersUseCase } from './application/use-cases/get-all-users.use-case';
import { GetUserByIdUseCase } from './application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    // Infraestructura
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    // Aplicación
    UserService,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: ['UserRepository', UserService],
})
export class UsersModule {}
