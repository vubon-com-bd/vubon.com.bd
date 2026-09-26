import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ReferralRewardEntity } from '../entities/referral-reward.entity';
import { ReferralIdVO } from '../value-objects/primitives/referral-id.vo';

export interface ReferralRewardRepository
  extends BaseRepository<ReferralRewardEntity, string> {
  findByReferral(referralId: ReferralIdVO): Promise<readonly ReferralRewardEntity[]>;
}
