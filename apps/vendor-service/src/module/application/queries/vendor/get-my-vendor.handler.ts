import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetMyVendorQuery } from './get-my-vendor.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetMyVendorQuery)
export class GetMyVendorHandler
  implements IQueryHandler<GetMyVendorQuery, VendorResponseDTO>
{
  constructor(
    @Inject(VENDOR_SERVICE)
    private readonly service: IVendorService,
  ) {}

  async execute(q: GetMyVendorQuery): Promise<VendorResponseDTO> {
    return this.service.getMyVendor(q.userId);
  }
}
