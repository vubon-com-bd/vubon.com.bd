/**
 * VendorSearchService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../../domain/repositories/vendor.repository.interface.js';
import { VendorMapper } from '../../mappers/vendor.mapper.js';
import {
  VENDOR_SEARCH_SERVICE,
  type IVendorSearchService,
  type VendorSearchInput,
  type VendorSearchResultDto,
} from '../interfaces/vendor-search.service.interface.js';
import type {
  VendorPublicDto,
  VendorSummaryDto,
} from '../../dtos/responses/vendor-response.dto.js';

@Injectable()
export class VendorSearchService implements IVendorSearchService {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly repo: VendorRepository,
  ) {}

  async search(input: VendorSearchInput): Promise<VendorSearchResultDto> {
    const result = await this.repo.findPaginated({
      page: input.page,
      limit: input.limit,
      sortBy: input.sortBy,
      sortDir: input.sortDir,
      filter: {
        status: input.status,
        type: input.type,
        tier: input.tier,
        isVerified: input.isVerified,
        isFeatured: input.isFeatured,
        minRating: input.minRating,
        search: input.query,
      },
    });
    return {
      items: VendorMapper.toSummaryList(result.items),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async searchPublic(query: string, limit: number): Promise<readonly VendorPublicDto[]> {
    const result = await this.repo.findPaginated({
      page: 1,
      limit,
      sortBy: 'rating',
      sortDir: 'desc',
      filter: {
        status: 'active',
        search: query,
      },
    });
    return VendorMapper.toPublicList(result.items);
  }

  async findTopRated(limit: number): Promise<readonly VendorSummaryDto[]> {
    const result = await this.repo.findPaginated({
      page: 1,
      limit,
      sortBy: 'rating',
      sortDir: 'desc',
      filter: { status: 'active', isVerified: true },
    });
    return VendorMapper.toSummaryList(result.items);
  }

  async findFeatured(limit: number): Promise<readonly VendorPublicDto[]> {
    const result = await this.repo.findPaginated({
      page: 1,
      limit,
      sortBy: 'rating',
      sortDir: 'desc',
      filter: { status: 'active', isFeatured: true },
    });
    return VendorMapper.toPublicList(result.items);
  }
}
