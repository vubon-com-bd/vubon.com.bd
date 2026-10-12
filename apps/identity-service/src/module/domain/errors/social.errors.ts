/**
 * Social / OAuth / SSO Domain Errors
 * @module identity-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ConflictError } from '@vubon/shared-kernel/domain/errors/conflict.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class SocialAccountNotFoundError extends NotFoundError {
  constructor(provider: string, userId: string) {
    super('SocialAccount', `${provider}:${userId}`);
    this.name = 'SocialAccountNotFoundError';
  }
}

export class OAuthClientNotFoundError extends NotFoundError {
  constructor(clientId: string) {
    super('OAuthClient', clientId);
    this.name = 'OAuthClientNotFoundError';
  }
}

export class SsoConfigNotFoundError extends NotFoundError {
  constructor(configId: string) {
    super('SsoConfig', configId);
    this.name = 'SsoConfigNotFoundError';
  }
}

// ─── Conflict (409) ────────────────────────
export class SocialAccountAlreadyLinkedError extends ConflictError {
  constructor(provider: string, userId: string) {
    super(`Social account "${provider}" already linked to user "${userId}"`, 'provider');
    this.name = 'SocialAccountAlreadyLinkedError';
  }
}

// ─── Business Rule (400) ───────────────────
export class SocialAccountNotLinkedError extends BusinessRuleError {
  constructor(provider: string, userId: string) {
    super(
      `Social account "${provider}" not linked to user "${userId}"`,
      'SOCIAL_ACCOUNT_NOT_LINKED',
      { provider, userId },
    );
    this.name = 'SocialAccountNotLinkedError';
  }
}

export class OAuthInvalidGrantError extends BusinessRuleError {
  constructor(grantType: string, reason: string) {
    super(
      `OAuth invalid grant "${grantType}": ${reason}`,
      'OAUTH_INVALID_GRANT',
      { grantType, reason },
    );
    this.name = 'OAuthInvalidGrantError';
  }
}

export class OAuthInvalidClientError extends BusinessRuleError {
  constructor(clientId: string) {
    super(
      `OAuth invalid client "${clientId}"`,
      'OAUTH_INVALID_CLIENT',
      { clientId },
    );
    this.name = 'OAuthInvalidClientError';
  }
}

export class OAuthInvalidRedirectUriError extends BusinessRuleError {
  constructor(redirectUri: string, clientId: string) {
    super(
      `Redirect URI "${redirectUri}" not allowed for client "${clientId}"`,
      'OAUTH_INVALID_REDIRECT_URI',
      { redirectUri, clientId },
    );
    this.name = 'OAuthInvalidRedirectUriError';
  }
}

export class OAuthPkceVerificationError extends BusinessRuleError {
  constructor() {
    super('PKCE code verifier verification failed', 'OAUTH_PKCE_VERIFICATION_FAILED');
    this.name = 'OAuthPkceVerificationError';
  }
}

export class SsoConfigurationError extends BusinessRuleError {
  constructor(configId: string, reason: string) {
    super(
      `SSO configuration "${configId}" error: ${reason}`,
      'SSO_CONFIGURATION_ERROR',
      { configId, reason },
    );
    this.name = 'SsoConfigurationError';
  }
}

export class SsoAssertionInvalidError extends BusinessRuleError {
  constructor(reason: string) {
    super(
      `SSO assertion invalid: ${reason}`,
      'SSO_ASSERTION_INVALID',
      { reason },
    );
    this.name = 'SsoAssertionInvalidError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidSocialProviderError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid social provider "${value}". Allowed: ${allowed.join(', ')}`, 'provider');
    this.name = 'InvalidSocialProviderError';
  }
}

export class InvalidOAuthGrantTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid OAuth grant type "${value}". Allowed: ${allowed.join(', ')}`, 'grantType');
    this.name = 'InvalidOAuthGrantTypeError';
  }
}
