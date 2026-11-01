/**
 * SsoFlowService
 * @module identity-service/domain/services
 */
import { AUTH_SSO, AUTH_SSO_SESSION } from '@vubon/shared-constants/auth';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class SsoFlowService {
  static supportedProviders(): readonly string[] {
    return Object.values(AUTH_SSO);
  }

  static isSupported(provider: string): boolean {
    return this.supportedProviders().includes(provider);
  }

  static sessionExpirySeconds(): number {
    return AUTH_SSO_SESSION.EXPIRY_SECONDS;
  }

  static sessionRefreshWindowSeconds(): number {
    return AUTH_SSO_SESSION.REFRESH_WINDOW_SECONDS;
  }

  static isSingleLogoutEnabled(): boolean {
    return AUTH_SSO_SESSION.SINGLE_LOGOUT;
  }

  static assertSupported(provider: string): void {
    if (!this.isSupported(provider)) {
      throw new BusinessRuleError(
        `Unsupported SSO provider: ${provider}`,
        'SSO_PROVIDER_UNSUPPORTED',
        { provider, allowed: this.supportedProviders() },
      );
    }
  }

  /**
   * Validate SAML assertion structure.
   */
  static assertSamlAssertion(params: {
    readonly hasIssuer: boolean;
    readonly hasSubject: boolean;
    readonly notExpired: boolean;
  }): void {
    if (!params.hasIssuer) {
      throw new BusinessRuleError('SAML assertion missing Issuer', 'SSO_SAML_MISSING_ISSUER');
    }
    if (!params.hasSubject) {
      throw new BusinessRuleError('SAML assertion missing Subject', 'SSO_SAML_MISSING_SUBJECT');
    }
    if (!params.notExpired) {
      throw new BusinessRuleError('SAML assertion expired', 'SSO_SAML_EXPIRED');
    }
  }

  static sessionExpiresAt(nowMs: number = Date.now()): Date {
    return new Date(nowMs + this.sessionExpirySeconds() * 1000);
  }
}
