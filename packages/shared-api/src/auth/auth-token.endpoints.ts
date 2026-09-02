/**
 * Auth Token Endpoints
 * প্রমীকরণ টোকেন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthToken, AuthTokenCreateInput, AuthTokenType } from '@vubon/shared-types';
import { AUTH_TOKEN } from '@vubon/shared-constants';

export interface AuthApiKeyResponse {
  id: string;
  name: string;
  key: string;
  type: AuthTokenType;
  expiresAt: Date;
  createdAt: Date;
}

export interface AuthTokenValidateResponse {
  valid: boolean;
  payload?: Record<string, unknown>;
  type?: AuthTokenType;
  userId?: string;
}

export class AuthTokenEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get token info
   * টোকেন তথ্য পাওয়া
   */
  async getTokenInfo(token: string): Promise<AuthToken> {
    return this.client.post<AuthToken>('/auth/token/info', { token });
  }

  /**
   * Revoke token
   * টোকেন রিভোক করা
   */
  async revokeToken(token: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>('/auth/token/revoke', { token });
  }

  /**
   * Revoke all tokens
   * সব টোকেন রিভোক করা
   */
  async revokeAllTokens(): Promise<{ success: boolean; count: number }> {
    return this.client.delete<{ success: boolean; count: number }>('/auth/token/revoke-all');
  }

  /**
   * Generate API key
   * এপিআই কী তৈরি করা
   */
  async generateApiKey(data: AuthTokenCreateInput): Promise<AuthApiKeyResponse> {
    return this.client.post<AuthApiKeyResponse>('/auth/token/api-key', data);
  }

  /**
   * List API keys
   * এপিআই কী লিস্ট পাওয়া
   */
  async listApiKeys(): Promise<{ keys: AuthApiKeyResponse[] }> {
    return this.client.get<{ keys: AuthApiKeyResponse[] }>('/auth/token/api-keys');
  }

  /**
   * Get API key by ID
   * আইডি দ্বারা এপিআই কী পাওয়া
   */
  async getApiKey(keyId: string): Promise<AuthApiKeyResponse> {
    return this.client.get<AuthApiKeyResponse>(`/auth/token/api-keys/${keyId}`);
  }

  /**
   * Revoke API key
   * এপিআই কী রিভোক করা
   */
  async revokeApiKey(keyId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/token/api-keys/${keyId}`);
  }

  /**
   * Validate token
   * টোকেন ভ্যালিডেট করা
   */
  async validateToken(token: string): Promise<AuthTokenValidateResponse> {
    return this.client.post<AuthTokenValidateResponse>('/auth/token/validate', { token });
  }

  /**
   * Get token expiry time
   * টোকেন এক্সপায়ারি সময় পাওয়া
   */
  async getTokenExpiry(token: string): Promise<{ expiresIn: number; expiresAt: Date }> {
    return this.client.post<{ expiresIn: number; expiresAt: Date }>('/auth/token/expiry', {
      token,
    });
  }

  /**
   * Extend token expiry
   * টোকেন এক্সপায়ারি সময় এক্সটেন্ড করা
   */
  async extendTokenExpiry(
    token: string,
    duration: number = AUTH_TOKEN.EXPIRY.ACCESS
  ): Promise<{ expiresAt: Date }> {
    return this.client.post<{ expiresAt: Date }>('/auth/token/extend', { token, duration });
  }

  /**
   * Check if token is revoked
   * টোকেন রিভোকড কিনা চেক করা
   */
  async isTokenRevoked(
    token: string
  ): Promise<{ revoked: boolean; revokedAt?: Date; revokedReason?: string }> {
    return this.client.post<{ revoked: boolean; revokedAt?: Date; revokedReason?: string }>(
      '/auth/token/revoked',
      { token }
    );
  }

  /**
   * Get token type
   * টোকেন টাইপ পাওয়া
   */
  async getTokenType(token: string): Promise<{ type: AuthTokenType }> {
    return this.client.post<{ type: AuthTokenType }>('/auth/token/type', { token });
  }

  /**
   * Get tokens by user
   * ইউজার দ্বারা টোকেন লিস্ট পাওয়া
   */
  async getTokensByUser(userId: string): Promise<AuthToken[]> {
    return this.client.get<AuthToken[]>(`/auth/token/user/${userId}`);
  }

  /**
   * Get tokens by type
   * টাইপ দ্বারা টোকেন লিস্ট পাওয়া
   */
  async getTokensByType(type: AuthTokenType): Promise<AuthToken[]> {
    return this.client.get<AuthToken[]>(`/auth/token/type/${type}`);
  }
}
