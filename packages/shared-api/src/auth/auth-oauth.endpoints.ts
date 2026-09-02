/**
 * Auth OAuth Endpoints
 * প্রমীকরণ OAuth এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthOAuth, AuthOAuthTokenResponse } from '@vubon/shared-types';

export class AuthOAuthEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get OAuth clients
   * OAuth ক্লায়েন্ট লিস্ট পাওয়া
   */
  async getOAuthClients(): Promise<{
    clients: { id: string; name: string; redirectUris: string[] }[];
  }> {
    return this.client.get<{ clients: { id: string; name: string; redirectUris: string[] }[] }>(
      '/auth/oauth/clients'
    );
  }

  /**
   * Create OAuth client
   * OAuth ক্লায়েন্ট তৈরি করা
   */
  async createOAuthClient(data: {
    name: string;
    redirectUris: string[];
    grants: string[];
  }): Promise<{ id: string; secret: string; name: string; redirectUris: string[] }> {
    return this.client.post<{ id: string; secret: string; name: string; redirectUris: string[] }>(
      '/auth/oauth/clients',
      data
    );
  }

  /**
   * Delete OAuth client
   * OAuth ক্লায়েন্ট ডিলিট করা
   */
  async deleteOAuthClient(clientId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/oauth/clients/${clientId}`);
  }

  /**
   * Get OAuth tokens
   * OAuth টোকেন লিস্ট পাওয়া
   */
  async getOAuthTokens(): Promise<AuthOAuth[]> {
    return this.client.get<AuthOAuth[]>('/auth/oauth/tokens');
  }

  /**
   * Revoke OAuth token
   * OAuth টোকেন রিভোক করা
   */
  async revokeOAuthToken(tokenId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/oauth/tokens/${tokenId}`);
  }

  /**
   * Exchange code for token
   * কোড থেকে টোকেন বিনিময় করা
   */
  async exchangeCodeForToken(code: string, redirectUri: string): Promise<AuthOAuthTokenResponse> {
    return this.client.post<AuthOAuthTokenResponse>('/auth/oauth/token', { code, redirectUri });
  }

  /**
   * Refresh OAuth token
   * OAuth টোকেন রিফ্রেশ করা
   */
  async refreshOAuthToken(refreshToken: string): Promise<AuthOAuthTokenResponse> {
    return this.client.post<AuthOAuthTokenResponse>('/auth/oauth/refresh', { refreshToken });
  }
}
