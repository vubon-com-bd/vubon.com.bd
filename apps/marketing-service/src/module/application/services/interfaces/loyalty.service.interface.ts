import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LoyaltyEntity } from '../../../domain/entities/loyalty.entity';
import type { LoyaltyResponseDTO } from '../../dtos/responses/loyalty-response.dto';

export interface LoyaltyServiceInterface
  extends BaseServiceInterface<LoyaltyEntity, string> {
  findByUser(userId: string): Promise<LoyaltyResponseDTO | null>;
  earnPoints(userId: string, points: number): Promise<LoyaltyResponseDTO>;
  redeemPoints(userId: string, points: number): Promise<LoyaltyResponseDTO>;
  upgradeTier(userId: string, targetTier: string): Promise<LoyaltyResponseDTO>;
}
