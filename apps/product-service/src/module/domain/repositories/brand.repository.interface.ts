import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { BrandEntity } from '../entities/brand.entity';
import { BrandIdVO } from '../value-objects/primitives/brand-id.vo';
import { BrandSlugVO } from '../value-objects/primitives/brand-slug.vo';

export interface BrandRepository extends BaseRepository<BrandEntity, BrandIdVO> {
  findBySlug(slug: BrandSlugVO): Promise<BrandEntity | null>;
  existsBySlug(slug: BrandSlugVO): Promise<boolean>;
  findActive(): Promise<readonly BrandEntity[]>;
}
