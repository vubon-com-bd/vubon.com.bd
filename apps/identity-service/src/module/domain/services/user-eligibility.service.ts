/**
 * UserEligibilityService
 * @module identity-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { UserEntity } from '../entities/user.entity.js';

export interface EligibilityContext {
  readonly requiresEmailVerification?: boolean;
  readonly requiresPhoneVerification?: boolean;
  readonly requiresKyc?: boolean;
  readonly kycVerified?: boolean;
  readonly minAgeYears?: number;
  readonly userAgeYears?: number;
}

export class UserEligibilityService {
  /**
   * Check if user can perform a gated action.
   */
  static canPerform(user: UserEntity, context: EligibilityContext = {}): boolean {
    if (!user.isActive()) return false;
    if (context.requiresEmailVerification && !user.emailVerified) return false;
    if (context.requiresPhoneVerification && !user.phoneVerified) return false;
    if (context.requiresKyc && !context.kycVerified) return false;
    if (context.minAgeYears && (context.userAgeYears ?? 0) < context.minAgeYears) return false;
    return true;
  }

  static assertCanPerform(user: UserEntity, context: EligibilityContext = {}): void {
    if (!user.isActive()) {
      throw new BusinessRuleError(
        `User status "${user.status.value}" is not active`,
        'USER_NOT_ACTIVE',
        { userId: user.id, status: user.status.value },
      );
    }
    if (context.requiresEmailVerification && !user.emailVerified) {
      throw new BusinessRuleError(
        'Email verification required',
        'USER_EMAIL_NOT_VERIFIED',
        { userId: user.id },
      );
    }
    if (context.requiresPhoneVerification && !user.phoneVerified) {
      throw new BusinessRuleError(
        'Phone verification required',
        'USER_PHONE_NOT_VERIFIED',
        { userId: user.id },
      );
    }
    if (context.requiresKyc && !context.kycVerified) {
      throw new BusinessRuleError(
        'KYC verification required',
        'USER_KYC_NOT_VERIFIED',
        { userId: user.id },
      );
    }
    if (context.minAgeYears && (context.userAgeYears ?? 0) < context.minAgeYears) {
      throw new BusinessRuleError(
        `User must be at least ${context.minAgeYears} years old`,
        'USER_AGE_INELIGIBLE',
        { userId: user.id, userAge: context.userAgeYears, minAge: context.minAgeYears },
      );
    }
  }

  /**
   * Whether the user can transact (purchase, sell, etc).
   */
  static canTransact(user: UserEntity): boolean {
    return this.canPerform(user, {
      requiresEmailVerification: true,
    });
  }
}
