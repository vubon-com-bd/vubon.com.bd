import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateReturnPolicyCommand } from './update-return-policy.command.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type ReturnPolicyDTO,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@CommandHandler(UpdateReturnPolicyCommand)
export class UpdateReturnPolicyHandler
  implements ICommandHandler<UpdateReturnPolicyCommand, ReturnPolicyDTO>
{
  constructor(
    @Inject(VENDOR_RETURN_POLICY_SERVICE)
    private readonly service: IVendorReturnPolicyService,
  ) {}

  async execute(c: UpdateReturnPolicyCommand): Promise<ReturnPolicyDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
