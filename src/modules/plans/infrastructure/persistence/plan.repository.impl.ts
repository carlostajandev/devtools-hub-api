/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanEntity } from '../../domain/entities/plan.entity';
import { PlanRepository } from '../../domain/repositories/plan.repository';

@Injectable()
export class PlanRepositoryImpl implements PlanRepository {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly repo: Repository<PlanEntity>,
  ) {}

  async findAll(): Promise<PlanEntity[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<PlanEntity | null> {
    return this.repo.findOneBy({ id });
  }

  async save(plan: PlanEntity): Promise<PlanEntity> {
    return this.repo.save(plan);
  }

  async update(plan: PlanEntity): Promise<PlanEntity> {
    await this.repo.save(plan);
    return plan;
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
