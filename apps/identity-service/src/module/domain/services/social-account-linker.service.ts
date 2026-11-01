/**
 * SocialAccountLinkerService
 * @module identity-service/domain/services
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { AUTH_SOCIAL } from '@vubon/shared-constants/auth';

export interface SocialLinkDecision {
  readonly allowed: boolean;
  readonly reason?: string;
}

export class SocialAccountLinkerService {
  static supportedProviders(): readonly string[] {
    return Object.values(AUTH_SOCIAL);
  }

  static isSupported(provider: string): boolean {
    return this.supportedProviders().includes(provider);
  }

  static assertSupported(provider: string): void {
    if (!this.isSupported(provider)) {
      throw new BusinessRuleError(
        `Unsupported social provider: ${provider}`,
        'SOCIAL_PROVIDER_UNSUPPORTED',
        { provider, allowed: this.supportedProviders() },
      );
    }
  }

  /**
   * Decide if linking is allowed given existing links.
   */
  static canLink(params: {
    readonly provider: string;
    readonly alreadyLinked: boolean;
    readonly emailVerified: boolean;
  }): SocialLinkDecision {
    if (!this.isSupported(params.provider)) {
      return { allowed: false, reason: 'unsupported_provider' };
    }
    if (params.alreadyLinked) {
      return { allowed: false, reason: 'already_linked' };
    }
    if (!params.emailVerified) {
      return { allowed: false, reason: 'email_not_verified' };
    }
    return { allowed: true };
  }

  /**
   * Whether the last credential prevents unlinking.
   * e.g. if user only has one auth method, cannot unlink.
   */
  static canUnlink(params: {
    readonly totalAuthMethods: number;
    readonly hasPassword: boolean;
  }): boolean {
    if (params.totalAuthMethods <= 1 && !params.hasPassword) {
      return false;
    }
    return true;
  }
}
