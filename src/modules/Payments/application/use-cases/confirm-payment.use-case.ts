/* eslint-disable prettier/prettier */
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { PaymentRepository } from "../../domain/repositories/payment.repository";
import { PaymentEntity } from "../../domain/entities/payment.entity";
import { SendPaymentConfirmationUseCase } from "../../../notifications/application/use-cases/send-payment-confirmation.use-case";

@Injectable()
export class ConfirmPaymentUseCase {
  constructor(
    @Inject("PaymentRepository")
    private readonly paymentRepository: PaymentRepository,
    private readonly sendPaymentConfirmation: SendPaymentConfirmationUseCase
  ) {}

  async execute(paymentId: number): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) throw new NotFoundException("Payment not found");

    payment.status = "completed";
    await this.paymentRepository.update(payment);

    this.sendPaymentConfirmation.execute(
      payment.user.email,
      payment.amount,
      payment.method || ''
    );
    return payment;
  }
}
