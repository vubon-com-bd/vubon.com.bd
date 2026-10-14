import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RequestInfoCommand } from './request-info.command.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { ApprovalResponseDTO } from '../../dtos/responses/approval-response.dto.js';

@CommandHandler(RequestInfoCommand)
export class RequestInfoHandler
  implements ICommandHandler<RequestInfoCommand, ApprovalResponseDTO>
{
  constructor(
    @Inject(VENDOR_APPROVAL_SERVICE)
    private readonly service: IVendorApprovalService,
  ) {}

  async execute(c: RequestInfoCommand): Promise<ApprovalResponseDTO> {
    return this.service.requestInfo(c.dto, c.actorId);
  }
}
