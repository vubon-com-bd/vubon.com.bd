import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { LoyaltyPointsEntity } from '../../../domain/entities/loyalty-points.entity';

export interface LoyaltyPointsServiceInterface
  extends BaseServiceInterface<LoyaltyPointsEntity, string> {
  calculateEarned(orderAmount: number, pointsPerUnit: number): Promise<number>;
  calculateTierFromPoints(points: number): Promise<string>;
}
