/**
 * UserEligibilityService — Aggregated eligibility rules
 * @module auth-service/domain/services
 */
import { UserEntity } from '../entities/user.entity';
import { UserNotActiveError } from '../errors/user.errors';

export interface EligibilityContext {
  readonly now: number;
  readonly requireEmailVerified?: boolean;
  readonly requirePhoneVerified?: boolean;
}

export interface EligibilityResult {
  readonly eligible: boolean;
  readonly reasons: readonly string[];
}

export class UserEligibilityService {
  static check(
    user: UserEntity,
    ctx: EligibilityContext,
  ): EligibilityResult {
    const reasons: string[] = [];

    if (!user.isActive()) {
      reasons.push(`status=${user.status.value}`);
    }
    if (ctx.requireEmailVerified && !user.emailVerified) {
      reasons.push('email_not_verified');
    }
    if (ctx.requirePhoneVerified && !user.phoneVerified) {
      reasons.push('phone_not_verified');
    }
    return { eligible: reasons.length === 0, reasons };
  }

  static assertEligible(user: UserEntity, ctx: EligibilityContext): void {
    const result = UserEligibilityService.check(user, ctx);
    if (!result.eligible) {
      throw new UserNotActiveError(user.id, result.reasons.join(','));
    }
  }

  static canLogin(user: UserEntity): boolean {
    return UserEligibilityService.check(user, {
      now: Date.now(),
    }).eligible && user.canLogin();
  }
}
