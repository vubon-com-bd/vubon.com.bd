import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorApprovalQuery } from './get-vendor-approval.query.js';
import {
  VENDOR_APPROVAL_SERVICE,
  type IVendorApprovalService,
} from '../../services/interfaces/vendor-approval.service.interface.js';
import type { VendorApprovalResponseDto } from '../../dtos/responses/vendor-approval-response.dto.js';

@QueryHandler(GetVendorApprovalQuery)
export class GetVendorApprovalHandler
  implements IQueryHandler<GetVendorApprovalQuery, VendorApprovalResponseDto>
{
  constructor(@Inject(VENDOR_APPROVAL_SERVICE) private readonly service: IVendorApprovalService) {}
  async execute(query: GetVendorApprovalQuery): Promise<VendorApprovalResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}
