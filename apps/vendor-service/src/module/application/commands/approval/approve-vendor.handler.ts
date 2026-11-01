import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveVendorCommand } from './approve-vendor.command.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { ApprovalResponseDTO } from '../../dtos/responses/approval-response.dto.js';

@CommandHandler(ApproveVendorCommand)
export class ApproveVendorHandler
  implements ICommandHandler<ApproveVendorCommand, ApprovalResponseDTO>
{
  constructor(
    @Inject(VENDOR_APPROVAL_SERVICE)
    private readonly service: IVendorApprovalService,
  ) {}

  async execute(c: ApproveVendorCommand): Promise<ApprovalResponseDTO> {
    return this.service.approve(c.dto, c.actorId);
  }
}
