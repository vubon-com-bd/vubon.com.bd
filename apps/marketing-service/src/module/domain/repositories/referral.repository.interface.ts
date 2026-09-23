import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ReferralEntity } from '../entities/referral.entity';
import { ReferralIdVO } from '../value-objects/primitives/referral-id.vo';
import { ReferralCodeVO } from '../value-objects/primitives/referral-code.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface ReferralRepository
  extends BaseRepository<ReferralEntity, ReferralIdVO> {
  findByCode(code: ReferralCodeVO): Promise<ReferralEntity | null>;
  findByReferrer(referrerId: UserIdVO): Promise<readonly ReferralEntity[]>;
}
