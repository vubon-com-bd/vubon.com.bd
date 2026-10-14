/**
 * VendorResolver — GraphQL read endpoints for vendor core
 * @module vendor-service/interfaces/controllers/graphql
 *
 * Read-only GraphQL (queries only). Commands stay on REST.
 */
import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { Logger, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

import { GetVendorQuery } from '../../../application/queries/vendor/get-vendor.query.js';
import { GetVendorBySlugQuery } from '../../../application/queries/vendor/get-vendor-by-slug.query.js';
import { ListVendorsQuery } from '../../../application/queries/vendor/list-vendors.query.js';
import { SearchVendorsQuery } from '../../../application/queries/vendor/search-vendors.query.js';
import { GetVendorStatsQuery } from '../../../application/queries/vendor/get-vendor-stats.query.js';

@Resolver('Vendor')
@UseGuards(JwtAuthGuard)
export class VendorResolver {
  private readonly logger = new Logger(VendorResolver.name);

  constructor(private readonly queryBus: QueryBus) {}

  @Query('vendor')
  @Public()
  async getVendor(@Args('id') id: string): Promise<unknown> {
    this.logger.debug(`GraphQL: vendor id=${id}`);
    return this.queryBus.execute(new GetVendorQuery(id));
  }

  @Query('vendorBySlug')
  @Public()
  async getVendorBySlug(@Args('slug') slug: string): Promise<unknown> {
    this.logger.debug(`GraphQL: vendor slug=${slug}`);
    return this.queryBus.execute(new GetVendorBySlugQuery(slug));
  }

  @Query('vendors')
  @Public()
  async listVendors(
    @Args('page') page?: number,
    @Args('limit') limit?: number,
    @Args('status') status?: string,
    @Args('type') type?: string,
    @Args('search') search?: string,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: list vendors`);
    return this.queryBus.execute(
      new ListVendorsQuery({
        page: page ?? 1,
        limit: limit ?? 20,
        filter: { status, type, search },
      }),
    );
  }

  @Query('searchVendors')
  @Public()
  async searchVendors(
    @Args('term') term: string,
    @Args('limit') limit?: number,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: search vendors "${term}"`);
    return this.queryBus.execute(new SearchVendorsQuery(term, limit ?? 20));
  }

  @Query('vendorStats')
  async vendorStats(
    @Args('vendorId') vendorId?: string,
  ): Promise<unknown> {
    this.logger.debug(`GraphQL: vendor stats`);
    void vendorId;
    return this.queryBus.execute(new GetVendorStatsQuery());
  }
}
