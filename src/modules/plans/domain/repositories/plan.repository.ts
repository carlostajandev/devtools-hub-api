/* eslint-disable prettier/prettier */
import { PlanEntity } from '../entities/plan.entity';

export abstract class PlanRepository {
  abstract findAll(): Promise<PlanEntity[]>;
  abstract findById(id: number): Promise<PlanEntity | null>;
  abstract save(plan: PlanEntity): Promise<PlanEntity>;
  abstract update(plan: PlanEntity): Promise<PlanEntity>;
  abstract delete(id: number): Promise<void>;
}
