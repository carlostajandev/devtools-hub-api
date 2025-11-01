/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.use-case';
import { ConfirmPaymentUseCase } from '../../application/use-cases/confirm-payment.use-case';
import { RefundPaymentUseCase } from '../../application/use-cases/refund-payment.use-case';
import { GetPaymentsByUserUseCase } from '../../application/use-cases/get-payments-by-user.use-case';
import { CreatePaymentDto } from '../../presentation/dto/create-payment.dto';
import { PaymentMapper } from '../mappers/payment.mapper';
import { PaymentResponseDto } from '../../presentation/dto/payment-response.dto';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly createPayment: CreatePaymentUseCase,
    private readonly confirmPayment: ConfirmPaymentUseCase,
    private readonly refundPayment: RefundPaymentUseCase,
    private readonly getPaymentsByUser: GetPaymentsByUserUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreatePaymentDto): Promise<PaymentResponseDto> {
    const entity = await this.createPayment.execute(body.userId, body.subscriptionId, body.amount, body.method);
    return PaymentMapper.toResponse(entity);
  }

  @Get(':userId')
  async getByUser(@Param('userId') userId: string): Promise<PaymentResponseDto[]> {
    const payments = await this.getPaymentsByUser.execute(userId);
    return payments.map(PaymentMapper.toResponse.bind(PaymentMapper));
  }

  @Patch(':id/confirm')
  async confirm(@Param('id') id: string): Promise<PaymentResponseDto> {
    const entity = await this.confirmPayment.execute(Number(id));
    return PaymentMapper.toResponse(entity);
  }

  @Patch(':id/refund')
  async refund(@Param('id') id: string): Promise<PaymentResponseDto> {
    const entity = await this.refundPayment.execute(Number(id));
    return PaymentMapper.toResponse(entity);
  }
}
