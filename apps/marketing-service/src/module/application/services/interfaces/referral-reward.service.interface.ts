import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ReferralRewardEntity } from '../../../domain/entities/referral-reward.entity';

export interface ReferralRewardServiceInterface
  extends BaseServiceInterface<ReferralRewardEntity, string> {
  calculate(baseAmount: number, rewardPercent: number): Promise<number>;
}
