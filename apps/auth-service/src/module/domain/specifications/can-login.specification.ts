/**
 * CanLoginSpecification — Composite rule: "may this user log in?"
 * @module auth-service/domain/specifications
 */
import { UserEntity } from '../entities/user.entity';

export interface CanLoginContext {
  readonly now: number;
  readonly accountLocked: boolean;
  readonly emailVerifiedRequired: boolean;
}

export class CanLoginSpecification {
  static isSatisfiedBy(user: UserEntity, ctx: CanLoginContext): boolean {
    if (!user.isActive()) return false;
    if (!user.canLogin()) return false;
    if (ctx.accountLocked) return false;
    if (ctx.emailVerifiedRequired && !user.emailVerified) return false;
    return true;
  }

  static explain(user: UserEntity, ctx: CanLoginContext): readonly string[] {
    const reasons: string[] = [];
    if (!user.isActive()) reasons.push('user_not_active');
    if (!user.canLogin()) reasons.push('status_blocks_login');
    if (ctx.accountLocked) reasons.push('account_locked');
    if (ctx.emailVerifiedRequired && !user.emailVerified) {
      reasons.push('email_not_verified');
    }
    return reasons;
  }
}
