import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ChangeSubscriptionPlanCommand } from './change-subscription-plan.command.js';
import {
  VENDOR_SUBSCRIPTION_SERVICE,
  type IVendorSubscriptionService,
} from '../../services/interfaces/vendor-subscription.service.interface.js';
import type { VendorSubscriptionResponseDto } from '../../dtos/responses/vendor-subscription-response.dto.js';

@CommandHandler(ChangeSubscriptionPlanCommand)
export class ChangeSubscriptionPlanHandler
  implements ICommandHandler<ChangeSubscriptionPlanCommand, VendorSubscriptionResponseDto>
{
  constructor(
    @Inject(VENDOR_SUBSCRIPTION_SERVICE) private readonly service: IVendorSubscriptionService,
  ) {}
  async execute(cmd: ChangeSubscriptionPlanCommand): Promise<VendorSubscriptionResponseDto> {
    return this.service.changePlan(cmd.dto, cmd.actorId);
  }
}
