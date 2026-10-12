import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorReturnPolicyQuery } from './get-vendor-return-policy.query.js';
import {
  VENDOR_RETURN_POLICY_SERVICE,
  type IVendorReturnPolicyService,
  type VendorReturnPolicyResponseDto,
} from '../../services/interfaces/vendor-return-policy.service.interface.js';

@QueryHandler(GetVendorReturnPolicyQuery)
export class GetVendorReturnPolicyHandler
  implements IQueryHandler<GetVendorReturnPolicyQuery, VendorReturnPolicyResponseDto>
{
  constructor(@Inject(VENDOR_RETURN_POLICY_SERVICE) private readonly service: IVendorReturnPolicyService) {}
  async execute(query: GetVendorReturnPolicyQuery): Promise<VendorReturnPolicyResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}
