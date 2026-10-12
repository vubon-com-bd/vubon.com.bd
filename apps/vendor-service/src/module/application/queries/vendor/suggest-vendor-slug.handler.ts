import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuggestVendorSlugQuery } from './suggest-vendor-slug.query.js';
import {
  VENDOR_SLUG_SERVICE,
  type IVendorSlugService,
  type SlugAvailabilityDto,
} from '../../services/interfaces/vendor-slug.service.interface.js';

@QueryHandler(SuggestVendorSlugQuery)
export class SuggestVendorSlugHandler
  implements IQueryHandler<SuggestVendorSlugQuery, SlugAvailabilityDto>
{
  constructor(@Inject(VENDOR_SLUG_SERVICE) private readonly service: IVendorSlugService) {}
  async execute(query: SuggestVendorSlugQuery): Promise<SlugAvailabilityDto> {
    return this.service.suggestFor(query.name);
  }
}
