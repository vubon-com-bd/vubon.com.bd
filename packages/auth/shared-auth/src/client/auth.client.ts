/**
 * Auth Client
 * Client for interacting with the auth service
 * Wraps API endpoints with authentication logic
 */

import {
  register as registerApi,
  login as loginApi,
  logout as logoutApi,
  refreshToken as refreshTokenApi,
  verifyEmail as verifyEmailApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
  getProfile as getProfileApi,
  type RegisterRequest,
  type RegisterResponse,
  type LoginRequest,
  type LoginResponse,
} from '@vubon/auth-shared-api';

import type { User } from '@vubon/auth-shared-types';
import type { UserRole, UserStatus } from '@vubon/auth-shared-constants';

export interface AuthClientConfig {
  onUnauthorized?: () => void;
  onError?: (error: unknown) => void;
}

export interface SessionData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export class AuthClient {
  private _user: User | null = null;
  private _token: string | null = null;
  private _refreshToken: string | null = null;

  constructor(private readonly config?: AuthClientConfig) {}

  get user(): User | null {
    return this._user;
  }

  get token(): string | null {
    return this._token;
  }

  get refreshToken(): string | null {
    return this._refreshToken;
  }

  get isAuthenticated(): boolean {
    return !!this._user && !!this._token;
  }

  async register(data: RegisterRequest): Promise<SessionData> {
    try {
      const response = await registerApi(data);
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Registration failed');
      }
      const session = this.mapToSession(response.data);
      this.setSession(session);
      return session;
    } catch (error) {
      this.config?.onError?.(error);
      throw error;
    }
  }

  async login(data: LoginRequest): Promise<SessionData> {
    try {
      const response = await loginApi(data);
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Login failed');
      }
      const session = this.mapToSession(response.data);
      this.setSession(session);
      return session;
    } catch (error) {
      this.config?.onError?.(error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      if (this._refreshToken) {
        await logoutApi(this._refreshToken);
      }
    } finally {
      this.clearSession();
    }
  }

  async refresh(): Promise<string> {
    if (!this._refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await refreshTokenApi(this._refreshToken);
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to refresh token');
      }
      this._token = response.data.accessToken || null;
      this._refreshToken = response.data.refreshToken || null;
      return this._token || '';
    } catch (error) {
      this.clearSession();
      this.config?.onUnauthorized?.();
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<void> {
    const response = await verifyEmailApi(token);
    if (!response.success) {
      throw new Error(response.message || 'Email verification failed');
    }
  }

  async forgotPassword(email: string): Promise<void> {
    const response = await forgotPasswordApi(email);
    if (!response.success) {
      throw new Error(response.message || 'Password reset request failed');
    }
  }

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await resetPasswordApi(token, password);
    if (!response.success) {
      throw new Error(response.message || 'Password reset failed');
    }
  }

  async getProfile(): Promise<User> {
    try {
      const response = await getProfileApi();
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Failed to get profile');
      }
      const user = this.mapToUser(response.data);
      this._user = user;
      return user;
    } catch (error) {
      this.config?.onError?.(error);
      throw error;
    }
  }

  setSession(data: SessionData): void {
    this._user = data.user;
    this._token = data.accessToken;
    this._refreshToken = data.refreshToken;

    try {
      localStorage.setItem('auth_token', data.accessToken);
      localStorage.setItem('auth_refresh_token', data.refreshToken);
      localStorage.setItem('auth_user', JSON.stringify(data.user));
    } catch {
      // localStorage not available
    }
  }

  clearSession(): void {
    this._user = null;
    this._token = null;
    this._refreshToken = null;

    try {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_refresh_token');
      localStorage.removeItem('auth_user');
    } catch {
      // localStorage not available
    }
  }

  restoreSession(): boolean {
    try {
      const token = localStorage.getItem('auth_token');
      const refreshToken = localStorage.getItem('auth_refresh_token');
      const userStr = localStorage.getItem('auth_user');

      if (token && refreshToken && userStr) {
        this._token = token;
        this._refreshToken = refreshToken;
        this._user = JSON.parse(userStr);
        return true;
      }
    } catch {
      // localStorage not available or corrupt
    }
    return false;
  }

  private mapToSession(data: RegisterResponse | LoginResponse): SessionData {
    return {
      user: this.mapToUser(data),
      accessToken: data.accessToken || '',
      refreshToken: data.refreshToken || '',
    };
  }

  private mapToUser(data: RegisterResponse | LoginResponse): User {
    return {
      id: data.id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role as UserRole,
      status: data.status as UserStatus,
      isEmailVerified: data.isEmailVerified || false,
      isPhoneVerified: data.isPhoneVerified || false,
      phone: data.phone || null,
      passwordHash: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: null,
    };
  }
}

export function createAuthClient(config?: AuthClientConfig): AuthClient {
  return new AuthClient(config);
}
