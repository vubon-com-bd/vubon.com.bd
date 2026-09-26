/**
 * CanResetPasswordSpecification
 * @module auth-service/domain/specifications
 */
import { UserEntity } from '../entities/user.entity';

export interface CanResetPasswordContext {
  readonly now: number;
  readonly tokenValid: boolean;
  readonly tokenExpired: boolean;
  readonly recentlyReset: boolean;
}

export class CanResetPasswordSpecification {
  static readonly COOLDOWN_MS = 60 * 1000;

  static isSatisfiedBy(
    user: UserEntity,
    ctx: CanResetPasswordContext,
  ): boolean {
    if (!user.isActive()) return false;
    if (user.status.value === 'deleted') return false;
    if (!ctx.tokenValid) return false;
    if (ctx.tokenExpired) return false;
    if (ctx.recentlyReset) return false;
    return true;
  }

  static explain(
    user: UserEntity,
    ctx: CanResetPasswordContext,
  ): readonly string[] {
    const reasons: string[] = [];
    if (!user.isActive()) reasons.push('user_not_active');
    if (user.status.value === 'deleted') reasons.push('user_deleted');
    if (!ctx.tokenValid) reasons.push('invalid_token');
    if (ctx.tokenExpired) reasons.push('token_expired');
    if (ctx.recentlyReset) reasons.push('cooldown_active');
    return reasons;
  }
}
