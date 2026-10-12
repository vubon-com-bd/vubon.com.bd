/**
 * ResubmitApprovalHandler
 * @module vendor-service/application/commands/approval
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ResubmitApprovalCommand } from './resubmit-approval.command.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { VendorApprovalResponseDto } from '../../dtos/responses/vendor-approval-response.dto.js';

@CommandHandler(ResubmitApprovalCommand)
export class ResubmitApprovalHandler
  implements ICommandHandler<ResubmitApprovalCommand, VendorApprovalResponseDto>
{
  constructor(
    @Inject(VENDOR_APPROVAL_SERVICE) private readonly service: IVendorApprovalService,
  ) {}

  async execute(cmd: ResubmitApprovalCommand): Promise<VendorApprovalResponseDto> {
    return this.service.resubmit(cmd.vendorId, cmd.actorId);
  }
}
