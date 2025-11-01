/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreatePlanUseCase } from '../../application/use-cases/create-plan.use-case';
import { PlanRepository } from '../../domain/repositories/plan.repository';
import { PlanEntity } from '../../domain/entities/plan.entity';

@Controller('plans')
export class PlanController {
  constructor(
    private readonly createPlan: CreatePlanUseCase,
    private readonly planRepository: PlanRepository,
  ) {}

  @Get('all')
  async findAll(): Promise<PlanEntity[]> {
    return this.planRepository.findAll();
  }

  @Post('create')
  async create(@Body() body): Promise<PlanEntity> {
    return this.createPlan.execute(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PlanEntity | null> {
    return this.planRepository.findById(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.planRepository.delete(id);
  }
}
