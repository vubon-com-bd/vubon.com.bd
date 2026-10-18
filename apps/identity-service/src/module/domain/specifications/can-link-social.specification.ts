/**
 * CanLinkSocialSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { AUTH_SOCIAL } from '@vubon/shared-constants/auth';
import type { AuthEntity } from '../entities/auth.entity.js';

export interface CanLinkSocialContext {
  readonly provider: string;
  readonly alreadyLinked: boolean;
  readonly providerUserId: string;
  readonly providerEmail?: string;
  readonly sameEmailAsAccount?: boolean;
}

export interface CanLinkSocialCandidate {
  readonly auth: AuthEntity;
  readonly context: CanLinkSocialContext;
}

export class CanLinkSocialSpecification extends Specification<CanLinkSocialCandidate> {
  private static readonly SUPPORTED = Object.values(AUTH_SOCIAL);

  isSatisfiedBy(c: CanLinkSocialCandidate): boolean {
    const { auth, context } = c;

    if (auth.isFinal()) return false;
    if (!auth.isActive()) return false;
    if (!CanLinkSocialSpecification.SUPPORTED.includes(context.provider as never)) return false;
    if (context.alreadyLinked) return false;
    if (!context.providerUserId || context.providerUserId.trim().length === 0) return false;

    return true;
  }

  explain(c: CanLinkSocialCandidate): string | null {
    const { auth, context } = c;

    // Terminal FIRST
    if (auth.isFinal()) {
      return `Auth status "${auth.status.value}" is terminal`;
    }
    if (!auth.isActive()) {
      return `Auth status "${auth.status.value}" is not active`;
    }
    if (!CanLinkSocialSpecification.SUPPORTED.includes(context.provider as never)) {
      return `Unsupported social provider: ${context.provider}`;
    }
    if (context.alreadyLinked) {
      return `Social account already linked for provider "${context.provider}"`;
    }
    if (!context.providerUserId) {
      return 'Provider user id is required';
    }
    return null;
  }

  static strict(): CanLinkSocialSpecification {
    return new CanLinkSocialSpecification();
  }
}
