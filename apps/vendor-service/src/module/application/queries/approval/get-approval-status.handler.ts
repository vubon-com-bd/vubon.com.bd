import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetApprovalStatusQuery } from './get-approval-status.query.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { ApprovalStatusResponseDTO } from '../../dtos/responses/approval-response.dto.js';

@QueryHandler(GetApprovalStatusQuery)
export class GetApprovalStatusHandler
  implements IQueryHandler<GetApprovalStatusQuery, ApprovalStatusResponseDTO>
{
  constructor(
    @Inject(VENDOR_APPROVAL_SERVICE)
    private readonly service: IVendorApprovalService,
  ) {}

  async execute(q: GetApprovalStatusQuery): Promise<ApprovalStatusResponseDTO> {
    return this.service.getStatus(q.vendorId);
  }
}
