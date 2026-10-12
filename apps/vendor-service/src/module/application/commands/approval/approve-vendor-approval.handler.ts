/**
 * ApproveVendorApprovalHandler
 * @module vendor-service/application/commands/approval
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApproveVendorApprovalCommand } from './approve-vendor-approval.command.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { VendorApprovalResponseDto } from '../../dtos/responses/vendor-approval-response.dto.js';

@CommandHandler(ApproveVendorApprovalCommand)
export class ApproveVendorApprovalHandler
  implements ICommandHandler<ApproveVendorApprovalCommand, VendorApprovalResponseDto>
{
  constructor(
    @Inject(VENDOR_APPROVAL_SERVICE) private readonly service: IVendorApprovalService,
  ) {}

  async execute(cmd: ApproveVendorApprovalCommand): Promise<VendorApprovalResponseDto> {
    return this.service.approve(cmd.dto, cmd.actorId);
  }
}
