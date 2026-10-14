import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVendorsQuery } from './list-vendors.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorListResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(ListVendorsQuery)
export class ListVendorsHandler
  implements IQueryHandler<ListVendorsQuery, VendorListResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(q: ListVendorsQuery): Promise<VendorListResponseDTO> {
    return this.service.list(q.options);
  }
}
