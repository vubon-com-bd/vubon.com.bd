import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HandleBkashWebhookCommand } from './handle-bkash-webhook.command';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { VerificationRepository } from '../../../domain/repositories/verification.repository.interface';
import { WebhookProcessingFailedError } from '../../errors/webhook.errors';

@CommandHandler(HandleBkashWebhookCommand)
export class HandleBkashWebhookHandler
  extends BaseCommandHandler<HandleBkashWebhookCommand, void>
  implements ICommandHandler<HandleBkashWebhookCommand>
{
  readonly commandType = 'webhook.bkash';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    @Inject('VerificationRepository')
    private readonly verificationRepo: VerificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: HandleBkashWebhookCommand): Promise<void> {
    void this.paymentRepo;
    void this.verificationRepo;
    void this.eventBus;
    void command;
    throw new WebhookProcessingFailedError('not yet wired');
  }
}
