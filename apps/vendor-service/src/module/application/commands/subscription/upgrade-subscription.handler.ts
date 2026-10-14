import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpgradeSubscriptionCommand } from './upgrade-subscription.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto.js';

@CommandHandler(UpgradeSubscriptionCommand)
export class UpgradeSubscriptionHandler
  implements ICommandHandler<UpgradeSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE)
    private readonly service: IVendorSubscriptionService,
  ) {}

  async execute(c: UpgradeSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.upgrade(c.dto, c.actorId);
  }
}
