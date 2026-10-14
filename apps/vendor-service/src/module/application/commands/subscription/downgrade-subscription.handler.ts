import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DowngradeSubscriptionCommand } from './downgrade-subscription.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto.js';

@CommandHandler(DowngradeSubscriptionCommand)
export class DowngradeSubscriptionHandler
  implements ICommandHandler<DowngradeSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE)
    private readonly service: IVendorSubscriptionService,
  ) {}

  async execute(c: DowngradeSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.downgrade(c.dto, c.actorId);
  }
}
