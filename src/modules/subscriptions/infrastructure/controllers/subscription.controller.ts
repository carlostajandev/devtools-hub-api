/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { CreateSubscriptionUseCase } from '../../application/use-cases/create-subscription.use-case';
import { GetUserSubscriptionsUseCase } from '../../application/use-cases/get-user-subscriptions.use-case';
import { CancelSubscriptionUseCase } from '../../application/use-cases/cancel-subscription.use-case';
import { RenewSubscriptionUseCase } from '../../application/use-cases/renew-subscription.use-case';
import { CreateSubscriptionDto } from '../../presentation/dto/create-subscription.dto';
import { SubscriptionMapper } from '../mappers/subscription.mapper';
import { SubscriptionResponseDto } from '../../presentation/dto/subscription-response.dto';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(
    private readonly createSubscription: CreateSubscriptionUseCase,
    private readonly getUserSubscriptions: GetUserSubscriptionsUseCase,
    private readonly cancelSubscription: CancelSubscriptionUseCase,
    private readonly renewSubscription: RenewSubscriptionUseCase,
  ) {}

  @Post('create')
  async create(@Body() body: CreateSubscriptionDto): Promise<SubscriptionResponseDto> {
    const entity = await this.createSubscription.execute(body.userId, body.planId);
    return SubscriptionMapper.toResponse(entity);
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: string): Promise<SubscriptionResponseDto[]> {
    const entities = await this.getUserSubscriptions.execute(userId);
    return entities.map(SubscriptionMapper.toResponse.bind(SubscriptionMapper));
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<SubscriptionResponseDto> {
    const entity = await this.cancelSubscription.execute(Number(id));
    return SubscriptionMapper.toResponse(entity);
  }

  @Post('renew')
  async renew(@Body() body: CreateSubscriptionDto): Promise<SubscriptionResponseDto> {
    const entity = await this.renewSubscription.execute(body.userId, body.planId);
    return SubscriptionMapper.toResponse(entity);
  }
}
