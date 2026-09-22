import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { HandleNagadWebhookCommand } from './handle-nagad-webhook.command';
import type { PaymentRepository } from '../../../domain/repositories/payment.repository.interface';
import type { VerificationRepository } from '../../../domain/repositories/verification.repository.interface';
import { WebhookProcessingFailedError } from '../../errors/webhook.errors';

@CommandHandler(HandleNagadWebhookCommand)
export class HandleNagadWebhookHandler
  extends BaseCommandHandler<HandleNagadWebhookCommand, void>
  implements ICommandHandler<HandleNagadWebhookCommand>
{
  readonly commandType = 'webhook.nagad';

  constructor(
    @Inject('PaymentRepository')
    private readonly paymentRepo: PaymentRepository,
    @Inject('VerificationRepository')
    private readonly verificationRepo: VerificationRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: HandleNagadWebhookCommand): Promise<void> {
    void this.paymentRepo;
    void this.verificationRepo;
    void this.eventBus;
    void command;
    throw new WebhookProcessingFailedError('not yet wired');
  }
}
