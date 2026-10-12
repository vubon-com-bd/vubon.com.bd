import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSuspensionsQuery } from './list-suspensions.query.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { VendorSuspensionResponseDto } from '../../dtos/responses/vendor-suspension-response.dto.js';

@QueryHandler(ListSuspensionsQuery)
export class ListSuspensionsHandler
  implements IQueryHandler<ListSuspensionsQuery, readonly VendorSuspensionResponseDto[]>
{
  constructor(@Inject(VENDOR_SUSPENSION_SERVICE) private readonly service: IVendorSuspensionService) {}
  async execute(query: ListSuspensionsQuery): Promise<readonly VendorSuspensionResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
