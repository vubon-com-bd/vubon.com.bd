import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateSubscriptionCommand } from './create-subscription.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { SubscriptionResponseDTO } from '../../dtos/responses/subscription-response.dto.js';

@CommandHandler(CreateSubscriptionCommand)
export class CreateSubscriptionHandler
  implements ICommandHandler<CreateSubscriptionCommand, SubscriptionResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE)
    private readonly service: IVendorSubscriptionService,
  ) {}

  async execute(c: CreateSubscriptionCommand): Promise<SubscriptionResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
