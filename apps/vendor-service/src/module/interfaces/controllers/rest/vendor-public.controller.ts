/**
 * VendorPublicController — public read-only vendor endpoints
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';
import { ParseUuidPipe } from '@vubon/shared-kernel/interfaces/pipes';

import { VENDOR_SWAGGER_TAGS } from '../../swagger/index.js';

import { GetVendorPublicQuery } from '../../../application/queries/vendor/get-vendor-public.query.js';
import { GetVendorBySlugQuery } from '../../../application/queries/vendor/get-vendor-by-slug.query.js';
import { SearchVendorsQuery } from '../../../application/queries/vendor/search-vendors.query.js';
import { FindTopRatedVendorsQuery } from '../../../application/queries/vendor/find-top-rated-vendors.query.js';
import { FindFeaturedVendorsQuery } from '../../../application/queries/vendor/find-featured-vendors.query.js';

@ApiTags(VENDOR_SWAGGER_TAGS.VENDOR_PUBLIC)
@Controller('public/vendors')
export class VendorPublicController extends BaseController {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  @Get('top-rated')
  @Public()
  @ApiOperation({ summary: 'Get top-rated vendors' })
  async topRated(@Query('limit') limit?: string): Promise<unknown> {
    const n = limit ? Number(limit) : 10;
    return this.queryBus.execute(new FindTopRatedVendorsQuery(n));
  }

  @Get('featured')
  @Public()
  @ApiOperation({ summary: 'Get featured vendors' })
  async featured(@Query('limit') limit?: string): Promise<unknown> {
    const n = limit ? Number(limit) : 10;
    return this.queryBus.execute(new FindFeaturedVendorsQuery(n));
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search public vendors' })
  async search(
    @Query('q') q: string | undefined,
    @Query('limit') limit?: string,
  ): Promise<unknown> {
    const n = limit ? Number(limit) : 20;
    return this.queryBus.execute(new SearchVendorsQuery({
      query: q,
      page: 1,
      limit: n,
      sortBy: 'rating',
      sortDir: 'desc',
    }));
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get vendor by slug' })
  async getBySlug(@Param('slug') slug: string): Promise<unknown> {
    return this.queryBus.execute(new GetVendorBySlugQuery(slug));
  }

  @Get(':vendorId')
  @Public()
  @ApiOperation({ summary: 'Get public vendor by id' })
  async getById(
    @Param('vendorId', ParseUuidPipe) vendorId: string,
  ): Promise<unknown> {
    return this.queryBus.execute(new GetVendorPublicQuery(vendorId));
  }
}
