import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVendorsQuery } from './list-vendors.query.js';
import {
  VENDOR_SERVICE,
  type IVendorService,
} from '../../services/interfaces/vendor.service.interface.js';
import type { VendorListResponseDto } from '../../dtos/responses/vendor-list-response.dto.js';

@QueryHandler(ListVendorsQuery)
export class ListVendorsHandler implements IQueryHandler<ListVendorsQuery, VendorListResponseDto> {
  constructor(@Inject(VENDOR_SERVICE) private readonly service: IVendorService) {}
  async execute(query: ListVendorsQuery): Promise<VendorListResponseDto> {
    return this.service.list(query.options);
  }
}
