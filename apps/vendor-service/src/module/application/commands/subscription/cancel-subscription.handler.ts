import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelSubscriptionCommand } from './cancel-subscription.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto.js';

@CommandHandler(CancelSubscriptionCommand)
export class CancelSubscriptionHandler
  implements ICommandHandler<CancelSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE)
    private readonly service: IVendorSubscriptionService,
  ) {}

  async execute(c: CancelSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
