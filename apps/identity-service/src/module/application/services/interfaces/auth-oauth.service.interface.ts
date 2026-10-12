/**
 * Auth OAuth Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { OAuthClientEntity } from '../../../domain/entities/oauth-client.entity.js';

export const AUTH_OAUTH_SERVICE = Symbol('AUTH_OAUTH_SERVICE');

export interface IssueOAuthTokenInput {
  readonly clientId: string;
  readonly clientSecret?: string;
  readonly grantType: string;
  readonly code?: string;
  readonly redirectUri?: string;
  readonly refreshToken?: string;
  readonly codeVerifier?: string;
}

export interface OAuthTokenResponse {
  readonly accessToken: string;
  readonly tokenType: 'Bearer';
  readonly expiresIn: number;
  readonly refreshToken?: string;
  readonly scope?: string;
  readonly idToken?: string;
}

export interface AuthOAuthServiceInterface extends BaseServiceInterface<OAuthClientEntity, string> {
  authorize(input: {
    responseType: string;
    clientId: string;
    redirectUri: string;
    scope: readonly string[];
    state: string;
    codeChallenge?: string;
  }): Promise<{ code: string; state: string }>;
  issueToken(input: IssueOAuthTokenInput): Promise<OAuthTokenResponse>;
  revokeToken(token: string): Promise<void>;
}
