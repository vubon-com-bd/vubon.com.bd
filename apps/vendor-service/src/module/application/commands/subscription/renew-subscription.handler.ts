import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RenewSubscriptionCommand } from './renew-subscription.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { VendorSubscriptionResponseDto } from '../../dtos/responses/vendor-subscription-response.dto.js';

@CommandHandler(RenewSubscriptionCommand)
export class RenewSubscriptionHandler
  implements ICommandHandler<RenewSubscriptionCommand, VendorSubscriptionResponseDto>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE) private readonly service: IVendorSubscriptionService,
  ) {}
  async execute(cmd: RenewSubscriptionCommand): Promise<VendorSubscriptionResponseDto> {
    return this.service.renew(cmd.dto, cmd.actorId);
  }
}
