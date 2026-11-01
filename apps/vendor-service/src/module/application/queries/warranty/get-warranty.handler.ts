import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetWarrantyQuery } from './get-warranty.query.js';
import {
  VENDOR_WARRANTY_SERVICE,
  type IVendorWarrantyService,
  type WarrantyDTO,
} from '../../services/interfaces/vendor-warranty.service.interface.js';

@QueryHandler(GetWarrantyQuery)
export class GetWarrantyHandler
  implements IQueryHandler<GetWarrantyQuery, WarrantyDTO | null>
{
  constructor(
    @Inject(VENDOR_WARRANTY_SERVICE)
    private readonly service: IVendorWarrantyService,
  ) {}

  async execute(q: GetWarrantyQuery): Promise<WarrantyDTO | null> {
    return this.service.getByVendorId(q.vendorId);
  }
}
