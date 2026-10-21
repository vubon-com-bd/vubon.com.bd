/**
 * HandleNagadWebhookHandler
 * @module payment-service/application/commands/webhook
 */
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { HandleNagadWebhookCommand } from './handle-nagad-webhook.command.js';
import { ConfirmPaymentCommand } from '../payment/confirm-payment.command.js';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface.js';

@CommandHandler(HandleNagadWebhookCommand)
export class HandleNagadWebhookHandler
  implements ICommandHandler<HandleNagadWebhookCommand, PaymentResponseDTO | null>
{
  private readonly logger = new Logger(HandleNagadWebhookHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {}

  async execute(c: HandleNagadWebhookCommand): Promise<PaymentResponseDTO | null> {
    this.logger.log(`Nagad webhook: order=${c.dto.orderId} status=${c.dto.status}`);
    if (c.dto.status !== 'Success') return null;

    const payment = await this.repo.findByGatewayReference(c.dto.paymentRefId);
    if (!payment) {
      this.logger.warn(`Nagad payment not found: ${c.dto.paymentRefId}`);
      return null;
    }
    return this.commandBus.execute(
      new ConfirmPaymentCommand({
        paymentId: payment.id,
        gatewayReference: c.dto.paymentRefId,
        confirmedAmount: Number(c.dto.amount),
      }),
    );
  }
}
