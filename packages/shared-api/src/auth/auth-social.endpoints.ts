/**
 * Auth Social Endpoints
 * প্রমীকরণ সোশ্যাল এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthSocial, AuthSocialProfile } from '@vubon/shared-types';
import { AuthUserType } from '@vubon/shared-types';

export interface AuthSocialLoginResponse {
  user: AuthUserType;
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export class AuthSocialEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get social accounts
   * সোশ্যাল অ্যাকাউন্ট পাওয়া
   */
  async getSocialAccounts(): Promise<AuthSocial[]> {
    return this.client.get<AuthSocial[]>('/auth/social/accounts');
  }

  /**
   * Get social account by provider
   * প্রোভাইডার দ্বারা সোশ্যাল অ্যাকাউন্ট পাওয়া
   */
  async getSocialAccount(provider: string): Promise<AuthSocial> {
    return this.client.get<AuthSocial>(`/auth/social/accounts/${provider}`);
  }

  /**
   * Link social account
   * সোশ্যাল অ্যাকাউন্ট লিংক করা
   */
  async linkSocialAccount(provider: string, data: AuthSocialProfile): Promise<AuthSocial> {
    return this.client.post<AuthSocial>(`/auth/social/link/${provider}`, data);
  }

  /**
   * Unlink social account
   * সোশ্যাল অ্যাকাউন্ট আনলিংক করা
   */
  async unlinkSocialAccount(provider: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/auth/social/unlink/${provider}`);
  }

  /**
   * Login with social provider
   * সোশ্যাল প্রোভাইডার দিয়ে লগইন করা
   */
  async loginWithSocial(provider: string, token: string): Promise<AuthSocialLoginResponse> {
    return this.client.post<AuthSocialLoginResponse>(`/auth/social/login/${provider}`, { token });
  }

  /**
   * Get social login URL
   * সোশ্যাল লগইন ইউআরএল পাওয়া
   */
  async getSocialLoginUrl(provider: string): Promise<{ url: string }> {
    return this.client.get<{ url: string }>(`/auth/social/login-url/${provider}`);
  }

  /**
   * Handle social callback
   * সোশ্যাল কলব্যাক হ্যান্ডেল করা
   */
  async handleSocialCallback(provider: string, code: string): Promise<AuthSocialLoginResponse> {
    return this.client.post<AuthSocialLoginResponse>(`/auth/social/callback/${provider}`, { code });
  }

  /**
   * Get social provider list
   * সোশ্যাল প্রোভাইডার লিস্ট পাওয়া
   */
  async getSocialProviders(): Promise<{ providers: string[] }> {
    return this.client.get<{ providers: string[] }>('/auth/social/providers');
  }

  /**
   * Check if social account is linked
   * সোশ্যাল অ্যাকাউন্ট লিংকড কিনা চেক করা
   */
  async isSocialAccountLinked(provider: string): Promise<{ linked: boolean }> {
    return this.client.get<{ linked: boolean }>(`/auth/social/linked/${provider}`);
  }
}
