/**
 * DowngradeSubscriptionHandler
 * @module payment-service/application/commands/subscription
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DowngradeSubscriptionCommand } from './downgrade-subscription.command.js';
import {
  SUBSCRIPTION_SERVICE,
  type ISubscriptionService,
} from '@application/services/interfaces/subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '@application/dtos/responses/subscription-response.dto.js';

@CommandHandler(DowngradeSubscriptionCommand)
export class DowngradeSubscriptionHandler
  implements ICommandHandler<DowngradeSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly service: ISubscriptionService,
  ) {}
  async execute(c: DowngradeSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.downgrade(c.dto, c.userId);
  }
}
