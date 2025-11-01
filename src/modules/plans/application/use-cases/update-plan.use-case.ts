/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlanEntity } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';

@Injectable()
export class UpdatePlanUseCase {
  constructor(
    @Inject('PlanRepository')
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(id: number, data: Partial<PlanEntity>): Promise<PlanEntity> {
    const existing = await this.planRepository.findById(id);
    if (!existing) throw new NotFoundException('Plan not found');

    // Aplica cambios
    Object.assign(existing, data);
    const updated = await this.planRepository.update(existing);
    return updated;
  }
}
