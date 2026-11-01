/**
 * CanResetPasswordSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { AuthEntity } from '../entities/auth.entity.js';

export interface CanResetPasswordContext {
  readonly nowMs?: number;
  readonly recentResetCount?: number;
  readonly maxResetsPerHour?: number;
  readonly resetWindowMinutes?: number;
  readonly lastResetAtMs?: number;
}

export interface CanResetPasswordCandidate {
  readonly auth: AuthEntity;
  readonly context?: CanResetPasswordContext;
}

export class CanResetPasswordSpecification extends Specification<CanResetPasswordCandidate> {
  private static readonly DEFAULT_MAX_RESETS = 3;
  private static readonly DEFAULT_WINDOW_MINUTES = 60;

  isSatisfiedBy(c: CanResetPasswordCandidate): boolean {
    const { auth, context } = c;
    if (auth.isFinal()) return false;
    if (!auth.isActive() && !auth.isLocked()) return false;

    const max = context?.maxResetsPerHour ?? CanResetPasswordSpecification.DEFAULT_MAX_RESETS;
    if ((context?.recentResetCount ?? 0) >= max) return false;

    const windowMs =
      (context?.resetWindowMinutes ?? CanResetPasswordSpecification.DEFAULT_WINDOW_MINUTES) *
      60 *
      1000;
    if (context?.lastResetAtMs && Date.now() - context.lastResetAtMs < windowMs) {
      // Only disallow if we're within cooldown AND already at max
      if ((context?.recentResetCount ?? 0) >= max) return false;
    }

    return true;
  }

  explain(c: CanResetPasswordCandidate): string | null {
    const { auth, context } = c;
    if (auth.isFinal()) {
      return `Auth status "${auth.status.value}" is terminal`;
    }
    if (!auth.isActive() && !auth.isLocked()) {
      return `Auth status "${auth.status.value}" does not allow password reset`;
    }
    const max = context?.maxResetsPerHour ?? CanResetPasswordSpecification.DEFAULT_MAX_RESETS;
    if ((context?.recentResetCount ?? 0) >= max) {
      return `Too many password reset requests (${max}/hour)`;
    }
    return null;
  }

  static strict(): CanResetPasswordSpecification {
    return new CanResetPasswordSpecification();
  }
}
