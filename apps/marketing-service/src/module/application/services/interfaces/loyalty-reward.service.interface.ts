import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LoyaltyRewardEntity } from '../../../domain/entities/loyalty-reward.entity';
import type { LoyaltyRewardResponseDTO } from '../../dtos/responses/loyalty-reward-response.dto';

export interface LoyaltyRewardServiceInterface
  extends BaseServiceInterface<LoyaltyRewardEntity, string> {
  findActive(): Promise<readonly LoyaltyRewardResponseDTO[]>;
  claim(userId: string, rewardId: string): Promise<void>;
}
