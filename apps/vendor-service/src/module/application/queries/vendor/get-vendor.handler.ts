import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorQuery } from './get-vendor.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetVendorQuery)
export class GetVendorHandler
  implements IQueryHandler<GetVendorQuery, VendorResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(q: GetVendorQuery): Promise<VendorResponseDTO> {
    return this.service.getById(q.vendorId);
  }
}
