/**
 * RejectVendorApprovalHandler
 * @module vendor-service/application/commands/approval
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectVendorApprovalCommand } from './reject-vendor-approval.command.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { VendorApprovalResponseDto } from '../../dtos/responses/vendor-approval-response.dto.js';

@CommandHandler(RejectVendorApprovalCommand)
export class RejectVendorApprovalHandler
  implements ICommandHandler<RejectVendorApprovalCommand, VendorApprovalResponseDto>
{
  constructor(
    @Inject(VENDOR_APPROVAL_SERVICE) private readonly service: IVendorApprovalService,
  ) {}

  async execute(cmd: RejectVendorApprovalCommand): Promise<VendorApprovalResponseDto> {
    return this.service.reject(cmd.dto, cmd.actorId);
  }
}
