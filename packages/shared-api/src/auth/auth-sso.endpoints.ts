/**
 * Auth SSO Endpoints
 * প্রমীকরণ SSO এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthSSO, AuthSSOSAMLRequest, AuthSSOSAMLResponse } from '@vubon/shared-types';
import { AuthUserType } from '@vubon/shared-types';

export interface AuthSSOLoginResponse {
  user: AuthUserType;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export class AuthSSOEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get SSO providers
   * SSO প্রোভাইডার লিস্ট পাওয়া
   */
  async getSSOProviders(): Promise<{
    providers: { id: string; name: string; protocol: string }[];
  }> {
    return this.client.get<{ providers: { id: string; name: string; protocol: string }[] }>(
      '/auth/sso/providers'
    );
  }

  /**
   * Get SSO provider config
   * SSO প্রোভাইডার কনফিগ পাওয়া
   */
  async getSSOProviderConfig(providerId: string): Promise<{ config: Record<string, unknown> }> {
    return this.client.get<{ config: Record<string, unknown> }>(
      `/auth/sso/providers/${providerId}/config`
    );
  }

  /**
   * Initiate SSO login
   * SSO লগইন ইনিশিয়েট করা
   */
  async initiateSSOLogin(providerId: string): Promise<{ url: string; requestId: string }> {
    return this.client.post<{ url: string; requestId: string }>(`/auth/sso/login/${providerId}`);
  }

  /**
   * Handle SSO callback
   * SSO কলব্যাক হ্যান্ডেল করা
   */
  async handleSSOCallback(
    providerId: string,
    data: { samlResponse?: string; relayState?: string }
  ): Promise<AuthSSOLoginResponse> {
    return this.client.post<AuthSSOLoginResponse>(`/auth/sso/callback/${providerId}`, data);
  }

  /**
   * Get SSO sessions
   * SSO সেশন লিস্ট পাওয়া
   */
  async getSSOSessions(): Promise<AuthSSO[]> {
    return this.client.get<AuthSSO[]>('/auth/sso/sessions');
  }

  /**
   * Terminate SSO session
   * SSO সেশন টারমিনেট করা
   */
  async terminateSSOSession(sessionId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/sso/sessions/${sessionId}`);
  }

  /**
   * Get SAML metadata
   * SAML মেটাডেটা পাওয়া
   */
  async getSAMLMetadata(providerId: string): Promise<{ metadata: string }> {
    return this.client.get<{ metadata: string }>(`/auth/sso/saml/metadata/${providerId}`);
  }

  /**
   * Send SAML request
   * SAML রিকোয়েস্ট পাঠানো
   */
  async sendSAMLRequest(
    providerId: string,
    data: AuthSSOSAMLRequest
  ): Promise<{ requestId: string }> {
    return this.client.post<{ requestId: string }>(`/auth/sso/saml/request/${providerId}`, data);
  }

  /**
   * Send SAML response
   * SAML রেসপন্স পাঠানো
   */
  async sendSAMLResponse(
    providerId: string,
    data: AuthSSOSAMLResponse
  ): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/auth/sso/saml/response/${providerId}`, data);
  }

  /**
   * Validate SAML response
   * SAML রেসপন্স ভ্যালিডেট করা
   */
  async validateSAMLResponse(
    providerId: string,
    samlResponse: string
  ): Promise<{ valid: boolean; user?: AuthUserType }> {
    return this.client.post<{ valid: boolean; user?: AuthUserType }>(
      `/auth/sso/saml/validate/${providerId}`,
      { samlResponse }
    );
  }

  /**
   * Get SSO provider status
   * SSO প্রোভাইডার স্ট্যাটাস পাওয়া
   */
  async getSSOProviderStatus(providerId: string): Promise<{ enabled: boolean; online: boolean }> {
    return this.client.get<{ enabled: boolean; online: boolean }>(
      `/auth/sso/providers/${providerId}/status`
    );
  }

  /**
   * Get SSO login history
   * SSO লগইন হিস্ট্রি পাওয়া
   */
  async getSSOLoginHistory(providerId?: string): Promise<{
    items: { userId: string; providerId: string; timestamp: Date; success: boolean }[];
  }> {
    const params: Record<string, string> = {};
    if (providerId) params.providerId = providerId;
    return this.client.get<{
      items: { userId: string; providerId: string; timestamp: Date; success: boolean }[];
    }>('/auth/sso/history', { params });
  }
}
