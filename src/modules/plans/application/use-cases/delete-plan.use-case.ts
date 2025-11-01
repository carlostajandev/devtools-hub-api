/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PlanRepository } from '../../domain/repositories/plan.repository';

@Injectable()
export class DeletePlanUseCase {
  constructor(
    @Inject('PlanRepository')
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const existing = await this.planRepository.findById(id);
    if (!existing) throw new NotFoundException('Plan not found');
    await this.planRepository.delete(id);
  }
}
