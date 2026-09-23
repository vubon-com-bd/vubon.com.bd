import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AffiliateLinkEntity } from '../entities/affiliate-link.entity';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';

export interface AffiliateLinkRepository
  extends BaseRepository<AffiliateLinkEntity, string> {
  findByAffiliate(affiliateId: AffiliateIdVO): Promise<readonly AffiliateLinkEntity[]>;
}
