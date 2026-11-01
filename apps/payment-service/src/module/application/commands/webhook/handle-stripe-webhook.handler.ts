/**
 * HandleStripeWebhookHandler
 * @module payment-service/application/commands/webhook
 */
import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { Inject, Logger } from '@nestjs/common';
import { HandleStripeWebhookCommand } from './handle-stripe-webhook.command.js';
import { ConfirmPaymentCommand } from '../payment/confirm-payment.command.js';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto.js';
import {
  PAYMENT_REPOSITORY,
  type PaymentRepository,
} from '@domain/repositories/payment.repository.interface.js';

@CommandHandler(HandleStripeWebhookCommand)
export class HandleStripeWebhookHandler
  implements ICommandHandler<HandleStripeWebhookCommand, PaymentResponseDTO | null>
{
  private readonly logger = new Logger(HandleStripeWebhookHandler.name);

  constructor(
    private readonly commandBus: CommandBus,
    @Inject(PAYMENT_REPOSITORY)
    private readonly repo: PaymentRepository,
  ) {}

  async execute(c: HandleStripeWebhookCommand): Promise<PaymentResponseDTO | null> {
    this.logger.log(`Stripe webhook: type=${c.dto.type}`);
    if (c.dto.type !== 'payment_intent.succeeded') return null;

    const obj = c.dto.data.object as Record<string, unknown>;
    const intentId = typeof obj['id'] === 'string' ? obj['id'] : undefined;
    if (!intentId) return null;

    const payment = await this.repo.findByGatewayReference(intentId);
    if (!payment) {
      this.logger.warn(`Stripe payment not found: ${intentId}`);
      return null;
    }
    return this.commandBus.execute(
      new ConfirmPaymentCommand({
        paymentId: payment.id,
        gatewayReference: intentId,
      }),
    );
  }
}
