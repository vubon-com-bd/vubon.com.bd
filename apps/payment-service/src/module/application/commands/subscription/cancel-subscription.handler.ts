/**
 * CancelSubscriptionHandler
 * @module payment-service/application/commands/subscription
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelSubscriptionCommand } from './cancel-subscription.command.js';
import {
  SUBSCRIPTION_SERVICE,
  type ISubscriptionService,
} from '@application/services/interfaces/subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '@application/dtos/responses/subscription-response.dto.js';

@CommandHandler(CancelSubscriptionCommand)
export class CancelSubscriptionHandler
  implements ICommandHandler<CancelSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly service: ISubscriptionService,
  ) {}
  async execute(c: CancelSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.cancel(c.dto, c.userId);
  }
}
