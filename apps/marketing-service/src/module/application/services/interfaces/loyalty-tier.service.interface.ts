import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LoyaltyTierEntity } from '../../../domain/entities/loyalty-tier.entity';
import type { LoyaltyTierResponseDTO } from '../../dtos/responses/loyalty-tier-response.dto';

export interface LoyaltyTierServiceInterface
  extends BaseServiceInterface<LoyaltyTierEntity, string> {
  isUpgrade(current: string, target: string): Promise<boolean>;
  findByTier(tier: string): Promise<LoyaltyTierResponseDTO | null>;
}
