/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { PlanEntity } from '../../domain/entities/plan.entity';

@Injectable()
export class CreatePlanUseCase {
  constructor(
    @Inject('PlanRepository') // 👈 AQUI está el cambio CLAVE
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(data: Partial<PlanEntity>): Promise<PlanEntity> {
    const plan = new PlanEntity();
    plan.name = data.name || '';
    plan.description = data.description;
    plan.price = data.price ?? 0;
    plan.isActive = true;

    return this.planRepository.save(plan);
  }
}
