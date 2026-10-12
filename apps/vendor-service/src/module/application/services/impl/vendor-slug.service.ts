/**
 * VendorSlugService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_REPOSITORY,
  type VendorRepository,
} from '../../../domain/repositories/vendor.repository.interface.js';
import { VendorSlugVO } from '../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorSlugGeneratorService } from '../../../domain/services/vendor-slug-generator.service.js';
import {
  VENDOR_SLUG_SERVICE,
  type IVendorSlugService,
  type SlugAvailabilityDto,
} from '../interfaces/vendor-slug.service.interface.js';

@Injectable()
export class VendorSlugService implements IVendorSlugService {
  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly repo: VendorRepository,
  ) {}

  async checkAvailability(slug: string): Promise<SlugAvailabilityDto> {
    const vo = VendorSlugVO.create(slug);
    const taken = await this.repo.existsBySlug(vo);
    if (!taken) {
      return { slug: vo.value, available: true };
    }
    const suggestion = VendorSlugGeneratorService.generateUnique(
      vo.value,
      new Set([vo.value]),
    );
    return { slug: vo.value, available: false, suggestion: suggestion.slug.value };
  }

  async suggestFor(name: string): Promise<SlugAvailabilityDto> {
    const allTaken = new Set<string>();
    const paginated = await this.repo.findPaginated({ page: 1, limit: 1000 });
    for (const v of paginated.items) {
      allTaken.add(v.slug.value);
    }
    const result = VendorSlugGeneratorService.generateUnique(name, allTaken);
    return {
      slug: result.slug.value,
      available: result.isUnique,
    };
  }

  isSuspicious(slug: string): boolean {
    return VendorSlugGeneratorService.isSuspicious(slug);
  }
}
