import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InitializeReturnPolicyCommand } from './initialize-return-policy.command.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type VendorReturnPolicyResponseDto,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@CommandHandler(InitializeReturnPolicyCommand)
export class InitializeReturnPolicyHandler
  implements ICommandHandler<InitializeReturnPolicyCommand, VendorReturnPolicyResponseDto>
{
  constructor(@Inject(VENDOR_RETURN_POLICY_SERVICE) private readonly service: IVendorReturnPolicyService) {}
  async execute(cmd: InitializeReturnPolicyCommand): Promise<VendorReturnPolicyResponseDto> {
    return this.service.initialize(cmd.vendorId, cmd.actorId);
  }
}
