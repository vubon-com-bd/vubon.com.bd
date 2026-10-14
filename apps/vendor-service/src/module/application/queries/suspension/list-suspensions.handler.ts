import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListSuspensionsQuery } from './list-suspensions.query.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../../services/interfaces/vendor-suspension.service.interface.js';
import type { SuspensionListResponseDTO } from '../../dtos/responses/suspension-response.dto.js';

@QueryHandler(ListSuspensionsQuery)
export class ListSuspensionsHandler
  implements IQueryHandler<ListSuspensionsQuery, SuspensionListResponseDTO>
{
  constructor(
    @Inject(VENDOR_SUSPENSION_SERVICE)
    private readonly service: IVendorSuspensionService,
  ) {}

  async execute(q: ListSuspensionsQuery): Promise<SuspensionListResponseDTO> {
    return this.service.listByVendor(q.vendorId);
  }
}
