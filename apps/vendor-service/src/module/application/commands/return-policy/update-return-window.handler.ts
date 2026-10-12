import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateReturnWindowCommand } from './update-return-window.command.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type VendorReturnPolicyResponseDto,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@CommandHandler(UpdateReturnWindowCommand)
export class UpdateReturnWindowHandler
  implements ICommandHandler<UpdateReturnWindowCommand, VendorReturnPolicyResponseDto>
{
  constructor(@Inject(VENDOR_RETURN_POLICY_SERVICE) private readonly service: IVendorReturnPolicyService) {}
  async execute(cmd: UpdateReturnWindowCommand): Promise<VendorReturnPolicyResponseDto> {
    return this.service.updateWindow(cmd.vendorId, cmd.days, cmd.actorId);
  }
}
