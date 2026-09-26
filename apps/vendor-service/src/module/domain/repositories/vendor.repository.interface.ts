import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorEntity } from '../entities/vendor.entity';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface VendorRepository extends BaseRepository<VendorEntity, VendorIdVO> {
  findBySlug(slug: VendorSlugVO): Promise<VendorEntity | null>;
  findByOwnerId(ownerId: UserIdVO): Promise<VendorEntity | null>;
  existsBySlug(slug: VendorSlugVO): Promise<boolean>;
}
