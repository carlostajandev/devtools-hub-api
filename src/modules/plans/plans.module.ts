/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './domain/entities/plan.entity';
import { PlanRepositoryImpl } from './infrastructure/persistence/plan.repository.impl';
import { CreatePlanUseCase } from './application/use-cases/create-plan.use-case';
import { GetAllPlansUseCase } from './application/use-cases/get-all-plans.use-case';

import { UpdatePlanUseCase } from './application/use-cases/update-plan.use-case';
import { DeletePlanUseCase } from './application/use-cases/delete-plan.use-case';
import { PlanService } from './application/services/plan.service';
import { PlanController } from './infrastructure/controllers/plan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlanEntity])],
  controllers: [PlanController],
  providers: [
    // 👇 PRIMERO definimos el repositorio
    {
      provide: 'PlanRepository',
      useClass: PlanRepositoryImpl,
    },
    // 👇 luego todos los casos de uso
    CreatePlanUseCase,
    GetAllPlansUseCase,
    UpdatePlanUseCase,
    DeletePlanUseCase,
    // 👇 finalmente el servicio
    PlanService,
  ],
  exports: ['PlanRepository', PlanService],
})
export class PlansModule {}
