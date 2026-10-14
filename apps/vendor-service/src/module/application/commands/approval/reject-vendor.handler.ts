import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectVendorCommand } from './reject-vendor.command.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { ApprovalResponseDTO } from '../../dtos/responses/approval-response.dto.js';

@CommandHandler(RejectVendorCommand)
export class RejectVendorHandler
  implements ICommandHandler<RejectVendorCommand, ApprovalResponseDTO>
{
  constructor(
    @Inject(VENDOR_APPROVAL_SERVICE)
    private readonly service: IVendorApprovalService,
  ) {}

  async execute(c: RejectVendorCommand): Promise<ApprovalResponseDTO> {
    return this.service.reject(c.dto, c.actorId);
  }
}
