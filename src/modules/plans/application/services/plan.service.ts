/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { GetAllPlansUseCase } from '../use-cases/get-all-plans.use-case';
import { CreatePlanUseCase } from '../use-cases/create-plan.use-case';
import { UpdatePlanUseCase } from '../use-cases/update-plan.use-case';
import { DeletePlanUseCase } from '../use-cases/delete-plan.use-case';
import { PlanEntity } from '../../domain/entities/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    private readonly getAll: GetAllPlansUseCase,
    private readonly createPlan: CreatePlanUseCase,
    private readonly updatePlan: UpdatePlanUseCase,
    private readonly deletePlan: DeletePlanUseCase,
  ) {}

  findAll(): Promise<PlanEntity[]> {
    return this.getAll.execute();
  }


  create(data: Partial<PlanEntity>): Promise<PlanEntity> {
    return this.createPlan.execute(data);
  }

  update(id: number, data: Partial<PlanEntity>): Promise<PlanEntity> {
    return this.updatePlan.execute(id, data);
  }

  remove(id: number): Promise<void> {
    return this.deletePlan.execute(id);
  }
}
