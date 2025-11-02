/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PlanService } from '../../application/services/plan.service';
import { PlanEntity } from '../../domain/entities/plan.entity';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('all')
  async findAll(): Promise<PlanEntity[]> {
    return this.planService.findAll();
  }

  @Post('create')
  async create(@Body() body: Partial<PlanEntity>): Promise<PlanEntity> {
    return this.planService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: Partial<PlanEntity>): Promise<PlanEntity> {
    return this.planService.update(Number(id), body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.planService.remove(Number(id));
  }
}
