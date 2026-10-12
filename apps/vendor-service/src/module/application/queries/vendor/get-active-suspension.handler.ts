import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetActiveSuspensionQuery } from './get-active-suspension.query.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { VendorSuspensionResponseDto } from '../../dtos/responses/vendor-suspension-response.dto.js';

@QueryHandler(GetActiveSuspensionQuery)
export class GetActiveSuspensionHandler
  implements IQueryHandler<GetActiveSuspensionQuery, VendorSuspensionResponseDto | null>
{
  constructor(@Inject(VENDOR_SUSPENSION_SERVICE) private readonly service: IVendorSuspensionService) {}
  async execute(query: GetActiveSuspensionQuery): Promise<VendorSuspensionResponseDto | null> {
    return this.service.getActiveByVendorId(query.vendorId);
  }
}
