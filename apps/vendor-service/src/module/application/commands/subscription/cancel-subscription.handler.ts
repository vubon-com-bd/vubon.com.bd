import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelSubscriptionCommand } from './cancel-subscription.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { VendorSubscriptionResponseDto } from '../../dtos/responses/vendor-subscription-response.dto.js';

@CommandHandler(CancelSubscriptionCommand)
export class CancelSubscriptionHandler
  implements ICommandHandler<CancelSubscriptionCommand, VendorSubscriptionResponseDto>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE) private readonly service: IVendorSubscriptionService,
  ) {}
  async execute(cmd: CancelSubscriptionCommand): Promise<VendorSubscriptionResponseDto> {
    return this.service.cancel(cmd.dto, cmd.actorId);
  }
}
