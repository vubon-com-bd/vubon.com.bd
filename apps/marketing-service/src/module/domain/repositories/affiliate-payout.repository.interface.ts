import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AffiliatePayoutEntity } from '../entities/affiliate-payout.entity';
import { AffiliatePayoutIdVO } from '../value-objects/primitives/affiliate-payout-id.vo';
import { AffiliateIdVO } from '../value-objects/primitives/affiliate-id.vo';

export interface AffiliatePayoutRepository
  extends BaseRepository<AffiliatePayoutEntity, AffiliatePayoutIdVO> {
  findByAffiliate(affiliateId: AffiliateIdVO): Promise<readonly AffiliatePayoutEntity[]>;
}
