import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSuspensionQuery } from './get-suspension.query.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { VendorSuspensionResponseDto } from '../../dtos/responses/vendor-suspension-response.dto.js';

@QueryHandler(GetSuspensionQuery)
export class GetSuspensionHandler
  implements IQueryHandler<GetSuspensionQuery, VendorSuspensionResponseDto>
{
  constructor(@Inject(VENDOR_SUSPENSION_SERVICE) private readonly service: IVendorSuspensionService) {}
  async execute(query: GetSuspensionQuery): Promise<VendorSuspensionResponseDto> {
    return this.service.getById(query.suspensionId);
  }
}
