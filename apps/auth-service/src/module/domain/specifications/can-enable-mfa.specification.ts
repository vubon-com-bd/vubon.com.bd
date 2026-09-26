/**
 * CanEnableMfaSpecification
 * @module auth-service/domain/specifications
 */
import { UserEntity } from '../entities/user.entity';
import { AuthMfaEntity } from '../entities/auth-mfa.entity';

export interface CanEnableMfaContext {
  readonly now: number;
  readonly emailVerified: boolean;
  readonly existingMfa: AuthMfaEntity | null;
}

export class CanEnableMfaSpecification {
  static isSatisfiedBy(
    user: UserEntity,
    ctx: CanEnableMfaContext,
  ): boolean {
    if (!user.isActive()) return false;
    if (!ctx.emailVerified) return false;
    if (ctx.existingMfa?.isEnabled()) return false;
    return true;
  }

  static explain(
    user: UserEntity,
    ctx: CanEnableMfaContext,
  ): readonly string[] {
    const reasons: string[] = [];
    if (!user.isActive()) reasons.push('user_not_active');
    if (!ctx.emailVerified) reasons.push('email_not_verified');
    if (ctx.existingMfa?.isEnabled()) reasons.push('mfa_already_enabled');
    return reasons;
  }
}
