import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateSubscriptionCommand } from './create-subscription.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { VendorSubscriptionResponseDto } from '../../dtos/responses/vendor-subscription-response.dto.js';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  implements ICommandHandler<CreateSubscriptionCommand, VendorSubscriptionResponseDto>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE) private readonly service: IVendorSubscriptionService,
  ) {}
  async execute(cmd: CreateSubscriptionCommand): Promise<VendorSubscriptionResponseDto> {
    return this.service.create(cmd.dto, cmd.actorId);
  }
}
