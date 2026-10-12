import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddReturnExclusionCommand } from './add-return-exclusion.command.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type VendorReturnPolicyResponseDto,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@CommandHandler(AddReturnExclusionCommand)
export class AddReturnExclusionHandler
  implements ICommandHandler<AddReturnExclusionCommand, VendorReturnPolicyResponseDto>
{
  constructor(@Inject(VENDOR_RETURN_POLICY_SERVICE) private readonly service: IVendorReturnPolicyService) {}
  async execute(cmd: AddReturnExclusionCommand): Promise<VendorReturnPolicyResponseDto> {
    return this.service.addExclusion(cmd.vendorId, cmd.term, cmd.actorId);
  }
}
