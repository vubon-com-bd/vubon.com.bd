/**
 * PauseSubscriptionHandler
 * @module payment-service/application/commands/subscription
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PauseSubscriptionCommand } from './pause-subscription.command.js';
import {
  SUBSCRIPTION_SERVICE,
  type ISubscriptionService,
} from '@application/services/interfaces/subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '@application/dtos/responses/subscription-response.dto.js';

@CommandHandler(PauseSubscriptionCommand)
export class PauseSubscriptionHandler
  implements ICommandHandler<PauseSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly service: ISubscriptionService,
  ) {}
  async execute(c: PauseSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.pause(c.dto, c.userId);
  }
}
