import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateReturnTypeCommand } from './update-return-type.command.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type VendorReturnPolicyResponseDto,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@CommandHandler(UpdateReturnTypeCommand)
export class UpdateReturnTypeHandler
  implements ICommandHandler<UpdateReturnTypeCommand, VendorReturnPolicyResponseDto>
{
  constructor(@Inject(VENDOR_RETURN_POLICY_SERVICE) private readonly service: IVendorReturnPolicyService) {}
  async execute(cmd: UpdateReturnTypeCommand): Promise<VendorReturnPolicyResponseDto> {
    return this.service.updateType(cmd.vendorId, cmd.returnType, cmd.actorId);
  }
}
