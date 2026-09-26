/**
 * CanRecoverAccountSpecification
 * @module auth-service/domain/specifications
 */
import { UserEntity } from '../entities/user.entity';

export interface CanRecoverAccountContext {
  readonly now: number;
  readonly hasRecoveryCodes: boolean;
  readonly successfulChallenges: number;
  readonly requiredChallenges: number;
  readonly recoveryWindowOpen: boolean;
}

export class CanRecoverAccountSpecification {
  static isSatisfiedBy(
    user: UserEntity,
    ctx: CanRecoverAccountContext,
  ): boolean {
    if (user.status.value === 'deleted') return false;
    if (!ctx.recoveryWindowOpen) return false;
    if (!ctx.hasRecoveryCodes) return false;
    if (ctx.successfulChallenges < ctx.requiredChallenges) return false;
    return true;
  }

  static explain(
    user: UserEntity,
    ctx: CanRecoverAccountContext,
  ): readonly string[] {
    const reasons: string[] = [];
    if (user.status.value === 'deleted') reasons.push('user_deleted');
    if (!ctx.recoveryWindowOpen) reasons.push('window_closed');
    if (!ctx.hasRecoveryCodes) reasons.push('no_recovery_codes');
    if (ctx.successfulChallenges < ctx.requiredChallenges) {
      reasons.push(
        `challenges_incomplete:${ctx.successfulChallenges}/${ctx.requiredChallenges}`,
      );
    }
    return reasons;
  }
}
