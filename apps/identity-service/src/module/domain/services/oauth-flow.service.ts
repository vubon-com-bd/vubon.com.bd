/**
 * OAuthFlowService
 * @module identity-service/domain/services
 */
import { AUTH_OAUTH, AUTH_OAUTH_ENDPOINT } from '@vubon/shared-constants/auth';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export class OAuthFlowService {
  static stateLength(): number {
    return AUTH_OAUTH.STATE_LENGTH;
  }

  static codeVerifierLength(): number {
    return AUTH_OAUTH.CODE_VERIFIER_LENGTH;
  }

  static pkceMethod(): string {
    return AUTH_OAUTH.PKCE_METHOD_S256;
  }

  static authorizationEndpoint(): string {
    return AUTH_OAUTH_ENDPOINT.AUTHORIZE;
  }

  static tokenEndpoint(): string {
    return AUTH_OAUTH_ENDPOINT.TOKEN;
  }

  static revokeEndpoint(): string {
    return AUTH_OAUTH_ENDPOINT.REVOKE;
  }

  static introspectEndpoint(): string {
    return AUTH_OAUTH_ENDPOINT.INTROSPECT;
  }

  static userInfoEndpoint(): string {
    return AUTH_OAUTH_ENDPOINT.USERINFO;
  }

  /**
   * Validate OAuth authorize request.
   */
  static assertAuthorizeRequest(params: {
    readonly responseType: string;
    readonly clientId: string;
    readonly redirectUri: string;
    readonly state: string;
  }): void {
    if (
      params.responseType !== AUTH_OAUTH.RESPONSE_TYPE_CODE &&
      params.responseType !== AUTH_OAUTH.RESPONSE_TYPE_TOKEN
    ) {
      throw new BusinessRuleError(
        `Unsupported response_type: ${params.responseType}`,
        'OAUTH_UNSUPPORTED_RESPONSE_TYPE',
        { responseType: params.responseType },
      );
    }
    if (!params.clientId) {
      throw new BusinessRuleError('clientId is required', 'OAUTH_CLIENT_ID_MISSING');
    }
    if (!params.redirectUri) {
      throw new BusinessRuleError('redirectUri is required', 'OAUTH_REDIRECT_URI_MISSING');
    }
    if (!params.state || params.state.length < 8) {
      throw new BusinessRuleError(
        'state must be at least 8 chars (CSRF protection)',
        'OAUTH_STATE_INVALID',
        { stateLength: params.state?.length ?? 0 },
      );
    }
  }

  /**
   * Whether PKCE is required for this client.
   */
  static requiresPkce(isPublicClient: boolean): boolean {
    return isPublicClient;
  }

  /**
   * Validate PKCE code verifier format.
   */
  static assertPkceVerifier(verifier: string): void {
    if (verifier.length < 43 || verifier.length > 128) {
      throw new BusinessRuleError(
        'PKCE code_verifier must be 43-128 chars',
        'OAUTH_PKCE_VERIFIER_INVALID',
        { length: verifier.length },
      );
    }
    if (!/^[A-Za-z0-9\-._~]+$/.test(verifier)) {
      throw new BusinessRuleError(
        'PKCE code_verifier contains invalid chars',
        'OAUTH_PKCE_VERIFIER_INVALID_CHARS',
      );
    }
  }
}
