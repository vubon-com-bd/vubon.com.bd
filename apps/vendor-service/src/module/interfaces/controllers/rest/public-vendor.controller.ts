/**
 * PublicVendorController — public (unauthenticated) vendor endpoints
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { GetVendorQuery } from '../../../application/queries/vendor/get-vendor.query.js';
import { GetVendorBySlugQuery } from '../../../application/queries/vendor/get-vendor-by-slug.query.js';
import { ListVendorsQuery } from '../../../application/queries/vendor/list-vendors.query.js';
import { SearchVendorsQuery } from '../../../application/queries/vendor/search-vendors.query.js';

import type {
  VendorPublicHttpResponseDTO,
  VendorListHttpResponseDTO,
  VendorSummaryHttpResponseDTO,
} from '../../dtos/responses/vendor.response.dto.js';

import { VendorCacheInterceptor } from '../../interceptors/vendor-cache.interceptor.js';

@ApiTags('public-vendors')
@Controller('public/vendors')
@UseInterceptors(VendorCacheInterceptor)
export class PublicVendorController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Public vendor list' })
  async list(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('type') type?: string,
    @Query('tier') tier?: string,
  ): Promise<VendorListHttpResponseDTO> {
    return this.queryBus.execute(
      new ListVendorsQuery({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 20,
        filter: { type, tier, isVerified: true },
      }),
    );
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search public vendors' })
  async search(
    @Query('q') q: string,
    @Query('limit') limit?: string,
  ): Promise<readonly VendorSummaryHttpResponseDTO[]> {
    return this.queryBus.execute(new SearchVendorsQuery(q, limit ? Number(limit) : 20));
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Public vendor by slug' })
  async bySlug(@Param('slug') slug: string): Promise<VendorPublicHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorBySlugQuery(slug));
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Public vendor by ID' })
  async byId(@Param('id') id: string): Promise<VendorPublicHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorQuery(id));
  }
}
