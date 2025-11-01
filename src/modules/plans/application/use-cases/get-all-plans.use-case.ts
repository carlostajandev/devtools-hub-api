/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { PlanEntity } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';

@Injectable()
export class GetAllPlansUseCase {
  constructor(
    @Inject('PlanRepository')
    private readonly planRepository: PlanRepository,
  ) {}

  async execute(): Promise<PlanEntity[]> {
    return this.planRepository.findAll();
  }
}
