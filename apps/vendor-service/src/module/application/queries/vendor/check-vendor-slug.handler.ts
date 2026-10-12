import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CheckVendorSlugQuery } from './check-vendor-slug.query.js';
import {
  VENDOR_SLUG_SERVICE,
  type IVendorSlugService,
  type SlugAvailabilityDto,
} from '../../services/interfaces/vendor-slug.service.interface.js';

@QueryHandler(CheckVendorSlugQuery)
export class CheckVendorSlugHandler implements IQueryHandler<CheckVendorSlugQuery, SlugAvailabilityDto> {
  constructor(@Inject(VENDOR_SLUG_SERVICE) private readonly service: IVendorSlugService) {}
  async execute(query: CheckVendorSlugQuery): Promise<SlugAvailabilityDto> {
    return this.service.checkAvailability(query.slug);
  }
}
