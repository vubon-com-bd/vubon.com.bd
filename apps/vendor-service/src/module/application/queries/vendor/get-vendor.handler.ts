import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorQuery } from './get-vendor.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

@QueryHandler(GetVendorQuery)
export class GetVendorHandler implements IQueryHandler<GetVendorQuery, VendorResponseDto> {
  constructor(@Inject(VENDOR_SERVICE) private readonly service: IVendorService) {}
  async execute(query: GetVendorQuery): Promise<VendorResponseDto> {
    return this.service.getById(query.vendorId);
  }
}
