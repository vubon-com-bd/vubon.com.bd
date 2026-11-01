/**
 * UserTierEvaluatorService
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { UserTierService } from '../../../domain/services/user-tier.service.js';

@Injectable()
export class UserTierEvaluatorService {
  evaluate(input: {
    totalOrders: number;
    totalSpent: number;
    accountAgeDays: number;
    kycLevel: number;
  }): { tier: string; score: number; nextTierAt: number } {
    return UserTierService.compute(input);
  }

  tierFromScore(score: number): string {
    return UserTierService.tierFromScore(score);
  }
}
