/**
 * UserTierEvaluatorService
 * @module user-service/infrastructure/services/internal
 *
 * Wraps domain UserTierService with infrastructure-level signals.
 */
import { Injectable } from '@nestjs/common';
import { UserTierService, type UserTier } from '@domain/services/user-tier.service';
import { UserEntity } from '@domain/entities/user.entity';

export interface TierEvaluationInput {
  readonly user: UserEntity;
  readonly hasKyc: boolean;
  readonly accountAgeDays: number;
}

export interface TierEvaluationResult {
  readonly tier: UserTier;
  readonly requiresEnhancedKyc: boolean;
  readonly maxAddresses: number;
}

@Injectable()
export class UserTierEvaluatorService {
  evaluate(input: TierEvaluationInput): TierEvaluationResult {
    const tier = UserTierService.computeTier(input.user, {
      hasVerifiedEmail: input.user.emailVerified,
      hasVerifiedPhone: input.user.phoneVerified,
      hasKyc: input.hasKyc,
      accountAgeDays: input.accountAgeDays,
    });

    return {
      tier,
      requiresEnhancedKyc: UserTierService.requiresEnhancedKyc(tier),
      maxAddresses: UserTierService.maxAddressesFor(tier),
    };
  }

  computeTier(input: TierEvaluationInput): UserTier {
    return this.evaluate(input).tier;
  }
}
