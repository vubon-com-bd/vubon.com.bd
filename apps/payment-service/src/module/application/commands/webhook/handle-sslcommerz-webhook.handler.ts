/**
 * HandleSslcommerzWebhookHandler
 * @module payment-service/application/commands/webhook
 */
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { HandleSslcommerzWebhookCommand } from './handle-sslcommerz-webhook.command.js';
import { ConfirmPaymentCommand } from '../payment/confirm-payment.command.js';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface.js';

@CommandHandler(HandleSslcommerzWebhookCommand)
export class HandleSslcommerzWebhookHandler
  implements ICommandHandler<HandleSslcommerzWebhookCommand, PaymentResponseDTO | null>
{
  private readonly logger = new Logger(HandleSslcommerzWebhookHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {}

  async execute(c: HandleSslcommerzWebhookCommand): Promise<PaymentResponseDTO | null> {
    this.logger.log(`SSLCommerz webhook: tran=${c.dto.tran_id} status=${c.dto.status}`);
    if (c.dto.status !== 'VALID' && c.dto.status !== 'VALIDATED') return null;

    const payment = await this.repo.findByGatewayReference(c.dto.tran_id);
    if (!payment) {
      this.logger.warn(`SSLCommerz payment not found: ${c.dto.tran_id}`);
      return null;
    }
    return this.commandBus.execute(
      new ConfirmPaymentCommand({
        paymentId: payment.id,
        gatewayReference: c.dto.val_id,
        confirmedAmount: Number(c.dto.amount),
      }),
    );
  }
}
