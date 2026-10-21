/**
 * HandleBkashWebhookHandler
 * @module payment-service/application/commands/webhook
 *
 * bKash webhook → confirm payment by gateway reference.
 */
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { HandleBkashWebhookCommand } from './handle-bkash-webhook.command.js';
import { ConfirmPaymentCommand } from '../payment/confirm-payment.command.js';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface.js';

@CommandHandler(HandleBkashWebhookCommand)
export class HandleBkashWebhookHandler
  implements ICommandHandler<HandleBkashWebhookCommand, PaymentResponseDTO | null>
{
  private readonly logger = new Logger(HandleBkashWebhookHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {}

  async execute(c: HandleBkashWebhookCommand): Promise<PaymentResponseDTO | null> {
    this.logger.log(`bKash webhook: trx=${c.dto.trxID} status=${c.dto.transactionStatus}`);
    if (c.dto.transactionStatus !== 'Completed') return null;

    const payment = await this.repo.findByGatewayReference(c.dto.paymentID);
    if (!payment) {
      this.logger.warn(`bKash payment not found: ${c.dto.paymentID}`);
      return null;
    }
    return this.commandBus.execute(
      new ConfirmPaymentCommand({
        paymentId: payment.id,
        gatewayReference: c.dto.trxID,
        confirmedAmount: Number(c.dto.amount),
      }),
    );
  }
}
