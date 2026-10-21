/**
 * UpgradeSubscriptionHandler
 * @module payment-service/application/commands/subscription
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpgradeSubscriptionCommand } from './upgrade-subscription.command.js';
import {
  SUBSCRIPTION_SERVICE,
  type ISubscriptionService,
} from '@application/services/interfaces/subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '@application/dtos/responses/subscription-response.dto.js';

@CommandHandler(UpgradeSubscriptionCommand)
export class UpgradeSubscriptionHandler
  implements ICommandHandler<UpgradeSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly service: ISubscriptionService,
  ) {}
  async execute(c: UpgradeSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.upgrade(c.dto, c.userId);
  }
}
