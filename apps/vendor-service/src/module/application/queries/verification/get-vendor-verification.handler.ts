import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorVerificationQuery } from './get-vendor-verification.query.js';
import {
  VENDOR_VERIFICATION_SERVICE,
  type IVendorVerificationService,
} from '../../services/interfaces/vendor-verification.service.interface.js';
import type { VendorVerificationResponseDto } from '../../dtos/responses/vendor-verification-response.dto.js';

@QueryHandler(GetVendorVerificationQuery)
export class GetVendorVerificationHandler
  implements IQueryHandler<GetVendorVerificationQuery, VendorVerificationResponseDto>
{
  constructor(@Inject(VENDOR_VERIFICATION_SERVICE) private readonly service: IVendorVerificationService) {}
  async execute(query: GetVendorVerificationQuery): Promise<VendorVerificationResponseDto> {
    return this.service.getByVendorId(query.vendorId);
  }
}
