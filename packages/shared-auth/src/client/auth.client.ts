/**
 * Auth Client - Authentication infrastructure abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/client/auth.client
 *
 * RULES:
 * ✅ ONLY authentication orchestration - NO business logic
 * ✅ NO UI rendering, toast, redirect, business authorization
 * ✅ No JWT verification (only decode for UI)
 * ✅ Singleton pattern for consistent state
 * ✅ TypeScript strict
 */

import { decodeJwt } from 'jose';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
  LogoutRequest,
  UserInfo,
} from '@vubon/shared-api';
import type { MFAVerifyResponse, MFASetupResponse } from '@vubon/shared-api';

// ==================== Types ====================

// বাংলাদেশ স্পেসিফিক MFA প্রোভাইডার টাইপ
export type MFAProvider = 
  | 'totp' 
  | 'sms' 
  | 'email' 
  | 'backup_code' 
  | 'webauthn'
  | 'whatsapp_otp'
  | 'imo_otp'
  | 'bkash_pin'
  | 'nagad_pin'
  | 'rocket_pin'
  | 'voice_call_otp';

export interface AuthClientConfig {
  apiClient: {
    // Core auth
    login: (data: LoginRequest) => Promise<LoginResponse>;
    phoneLogin?: (data: { phoneNumber: string; password: string; rememberMe?: boolean; deviceId?: string; mobileOperator?: string }) => Promise<LoginResponse>;
    otpLogin?: (data: { phoneNumber: string; otpCode: string; rememberMe?: boolean; deviceId?: string }) => Promise<LoginResponse>;
    register: (data: RegisterRequest) => Promise<RegisterResponse>;
    refreshToken: (refreshToken: string) => Promise<RefreshTokenResponse>;
    logout: (data?: LogoutRequest) => Promise<{ success: boolean }>;
    getSession?: () => Promise<{ user: UserInfo; expiresAt: string }>;
    // MFA
    verifyMFA?: (data: { mfaCode: string; methodId?: string; trustDevice?: boolean; challengeId?: string }) => Promise<MFAVerifyResponse>;
    setupMFA?: (provider: MFAProvider) => Promise<MFASetupResponse>;
    getMFAMethods?: () => Promise<{ methods: Array<{ id: string; provider: MFAProvider; isPrimary: boolean }> }>;
    // Account lock
    getAccountLockStatus?: () => Promise<{ isLocked: boolean; remainingLockTimeSeconds?: number; remainingAttemptsBeforeLock?: number }>;
    // Unlock account
    unlockAccount?: (data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }) => Promise<{ success: boolean; message: string }>;
    // Verification
    sendVerification?: (type: 'email' | 'phone', target: string) => Promise<{ success: boolean; expiresInSeconds: number }>;
    verifyCode?: (type: 'email' | 'phone', code: string) => Promise<{ success: boolean; verified: boolean }>;
  };
  tokenStorage: {
    setTokens: (accessToken: string, refreshToken: string) => void;
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
    clearTokens: () => void;
    hasTokens: () => boolean;
  };
  onUnauthorized?: () => void;
  onSessionExpired?: () => void;
  onTokenRefreshFailed?: () => void;
  refreshTokenBufferSeconds?: number;  // Refresh token X seconds before expiry (default: 60)
  autoRefreshIntervalSeconds?: number; // Auto-check interval (default: 60)
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  requiresMfa: boolean;
  mfaSessionId?: string;
  mfaMethods?: Array<{ id: string; provider: MFAProvider; isPrimary: boolean }>;
  accountLocked: boolean;
  remainingLockTimeSeconds?: number;
  remainingAttemptsBeforeLock?: number;
}

export interface User {
  id: string;
  email: string;
  phoneNumber?: string | null;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar?: string | null;
  role: string;
  userTier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  emailVerified: boolean;
  phoneVerified: boolean;
  permissions?: string[];
  district?: string;
  upazila?: string;
}

// ==================== Auth Client ====================

export class AuthClient {
  private config: AuthClientConfig;
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    accessToken: null,
    refreshToken: null,
    requiresMfa: false,
    accountLocked: false,
  };
  private listeners: Set<(state: AuthState) => void> = new Set();
  private refreshPromise: Promise<boolean> | null = null;
  private autoRefreshInterval: ReturnType<typeof setInterval> | null = null;
  private refreshTokenBufferSeconds: number;
  private autoRefreshIntervalSeconds: number;

  constructor(config: AuthClientConfig) {
    this.config = config;
    this.refreshTokenBufferSeconds = config.refreshTokenBufferSeconds ?? 60;
    this.autoRefreshIntervalSeconds = config.autoRefreshIntervalSeconds ?? 60;
    this.startAutoRefresh();
  }

  /**
   * Start auto-refresh timer
   */
  private startAutoRefresh(): void {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
    }

    this.autoRefreshInterval = setInterval(() => {
      this.checkAndRefreshToken();
    }, this.autoRefreshIntervalSeconds * 1000);
  }

  /**
   * Check token expiry and refresh if needed
   */
  private async checkAndRefreshToken(): Promise<void> {
    const token = this.state.accessToken;
    if (!token || !this.state.isAuthenticated) return;

    const expiresIn = this.getTokenExpirySeconds(token);
    if (expiresIn !== null && expiresIn <= this.refreshTokenBufferSeconds) {
      await this.refreshSession();
    }
  }

  /**
   * Initialize auth client - restore session from storage
   */
  async initialize(): Promise<void> {
    const accessToken = this.config.tokenStorage.getAccessToken();
    const refreshToken = this.config.tokenStorage.getRefreshToken();

    if (accessToken && refreshToken && !this.isTokenExpired(accessToken)) {
      try {
        const user = this.decodeToken(accessToken);
        if (user) {
          this.setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            accessToken,
            refreshToken,
            requiresMfa: false,
            accountLocked: false,
          });

          // Check account lock status in background
          this.checkAccountLockStatus();
          return;
        }
      } catch {
        // Token invalid, try refresh
      }
    }

    if (refreshToken) {
      await this.refreshSession();
    } else {
      this.setState({ ...this.state, isLoading: false });
    }
  }

  /**
   * Check account lock status in background
   */
  private async checkAccountLockStatus(): Promise<void> {
    if (!this.config.apiClient.getAccountLockStatus) return;

    try {
      const status = await this.config.apiClient.getAccountLockStatus();
      if (status.isLocked) {
        this.setState({
          ...this.state,
          accountLocked: true,
          remainingLockTimeSeconds: status.remainingLockTimeSeconds,
          remainingAttemptsBeforeLock: status.remainingAttemptsBeforeLock,
        });
      }
    } catch {
      // Silently fail - non-critical
    }
  }

  /**
   * Unlock account (self-service)
   */
  async unlockAccount(data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }): Promise<{ success: boolean; message: string }> {
    if (!this.config.apiClient.unlockAccount) {
      throw new Error('Account unlock not configured');
    }

    const response = await this.config.apiClient.unlockAccount(data);
    
    if (response.success) {
      this.setState({
        ...this.state,
        accountLocked: false,
        remainingLockTimeSeconds: undefined,
        remainingAttemptsBeforeLock: undefined,
      });
    }
    
    return response;
  }

  /**
   * Login with email and password
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await this.config.apiClient.login(data);

    if (response.requiresMfa) {
      // Fetch available MFA methods
      let mfaMethods;
      if (this.config.apiClient.getMFAMethods) {
        const methodsRes = await this.config.apiClient.getMFAMethods();
        mfaMethods = methodsRes.methods;
      }

      this.setState({
        ...this.state,
        requiresMfa: true,
        mfaSessionId: response.sessionId,
        mfaMethods,
        isLoading: false,
        accountLocked: false,
      });
      return response;
    }

    this.handleLoginSuccess(response);
    return response;
  }

  /**
   * Login with phone number (Bangladesh specific)
   */
  async phoneLogin(
    phoneNumber: string,
    password: string,
    rememberMe?: boolean,
    deviceId?: string,
    mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk'
  ): Promise<LoginResponse> {
    if (!this.config.apiClient.phoneLogin) {
      throw new Error('Phone login not configured');
    }

    const response = await this.config.apiClient.phoneLogin({
      phoneNumber,
      password,
      rememberMe,
      deviceId,
      mobileOperator,
    });

    if (response.requiresMfa) {
      let mfaMethods;
      if (this.config.apiClient.getMFAMethods) {
        const methodsRes = await this.config.apiClient.getMFAMethods();
        mfaMethods = methodsRes.methods;
      }

      this.setState({
        ...this.state,
        requiresMfa: true,
        mfaSessionId: response.sessionId,
        mfaMethods,
        isLoading: false,
        accountLocked: false,
      });
      return response;
    }

    this.handleLoginSuccess(response);
    return response;
  }

  /**
   * Login with OTP (passwordless - Bangladesh specific)
   */
  async otpLogin(phoneNumber: string, otpCode: string, rememberMe?: boolean, deviceId?: string): Promise<LoginResponse> {
    if (!this.config.apiClient.otpLogin) {
      throw new Error('OTP login not configured');
    }

    const response = await this.config.apiClient.otpLogin({ phoneNumber, otpCode, rememberMe, deviceId });
    this.handleLoginSuccess(response);
    return response;
  }

  /**
   * Verify MFA and complete login
   */
  async verifyMfa(mfaCode: string, methodId?: string, trustDevice?: boolean, challengeId?: string): Promise<LoginResponse> {
    if (!this.config.apiClient.verifyMFA) {
      throw new Error('MFA verification not configured');
    }

    const response = await this.config.apiClient.verifyMFA({ mfaCode, methodId, trustDevice, challengeId });

    if (response.verified) {
      // After MFA verification, we need to complete login
      // This assumes the verify endpoint returns tokens
      if (response.accessToken && response.refreshToken) {
        this.handleLoginSuccess(response as unknown as LoginResponse);
      }
    }

    return response as unknown as LoginResponse;
  }

  /**
   * Setup MFA for current user
   */
  async setupMFA(provider: MFAProvider): Promise<MFASetupResponse> {
    if (!this.config.apiClient.setupMFA) {
      throw new Error('MFA setup not configured');
    }
    return this.config.apiClient.setupMFA(provider);
  }

  /**
   * Get MFA methods for current user
   */
  async getMFAMethods(): Promise<Array<{ id: string; provider: MFAProvider; isPrimary: boolean }>> {
    if (!this.config.apiClient.getMFAMethods) {
      return [];
    }
    const response = await this.config.apiClient.getMFAMethods();
    return response.methods;
  }

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    return this.config.apiClient.register(data);
  }

  /**
   * Logout user
   */
  async logout(allDevices?: boolean): Promise<void> {
    const refreshToken = this.config.tokenStorage.getRefreshToken();
    if (refreshToken) {
      await this.config.apiClient.logout({ refreshToken, allDevices }).catch(() => {});
    }

    this.clearSession();
  }

  /**
   * Refresh session with race-safe queue
   */
  async refreshSession(): Promise<boolean> {
    // If refresh already in progress, return that promise
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.doRefresh();

    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Actual refresh implementation
   */
  private async doRefresh(): Promise<boolean> {
    const refreshToken = this.config.tokenStorage.getRefreshToken();
    if (!refreshToken) {
      this.clearSession();
      return false;
    }

    try {
      const response = await this.config.apiClient.refreshToken(refreshToken);
      this.config.tokenStorage.setTokens(response.accessToken, response.refreshToken);

      const user = this.decodeToken(response.accessToken);
      if (user) {
        this.setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          requiresMfa: false,
          accountLocked: false,
        });
        return true;
      }

      this.clearSession();
      return false;
    } catch (error) {
      this.clearSession();
      this.config.onTokenRefreshFailed?.();
      this.config.onSessionExpired?.();
      return false;
    }
  }

  /**
   * Handle successful login
   */
  private handleLoginSuccess(response: LoginResponse): void {
    this.config.tokenStorage.setTokens(response.accessToken, response.refreshToken);

    const user = this.decodeToken(response.accessToken);
    if (user) {
      this.setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        requiresMfa: false,
        accountLocked: false,
      });
    }
  }

  /**
   * Clear session and reset state
   */
  private clearSession(): void {
    this.config.tokenStorage.clearTokens();
    this.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      accessToken: null,
      refreshToken: null,
      requiresMfa: false,
      accountLocked: false,
    });
    this.config.onUnauthorized?.();
  }

  /**
   * Check if token is expired
   */
  private isTokenExpired(token: string): boolean {
    try {
      const payload = this.decodeTokenPayload(token);
      if (!payload?.exp) return true;
      return Date.now() >= (payload.exp as number) * 1000;
    } catch {
      return true;
    }
  }

  /**
   * Get token expiry seconds from now
   */
  private getTokenExpirySeconds(token: string): number | null {
    try {
      const payload = this.decodeTokenPayload(token);
      if (!payload?.exp) return null;
      const expiryMs = (payload.exp as number) * 1000;
      const remainingMs = expiryMs - Date.now();
      return Math.max(0, Math.floor(remainingMs / 1000));
    } catch {
      return null;
    }
  }

  /**
   * Decode JWT payload using jose (cross-platform: Node.js + Browser)
   */
  private decodeTokenPayload(token: string): Record<string, unknown> | null {
    try {
      return decodeJwt(token);
    } catch {
      return null;
    }
  }

  /**
   * Decode JWT token to extract user info (no verification)
   */
  private decodeToken(token: string): User | null {
    const payload = this.decodeTokenPayload(token);
    if (!payload) return null;

    return {
      id: (payload.sub || payload.userId || payload.id) as string,
      email: payload.email as string,
      phoneNumber: payload.phoneNumber as string | null,
      firstName: (payload.firstName || payload.given_name) as string || '',
      lastName: (payload.lastName || payload.family_name) as string || '',
      displayName: (payload.displayName || payload.name) as string || '',
      avatar: payload.avatar as string | null,
      role: (payload.role || (payload.roles as string[])?.[0] || 'customer') as string,
      userTier: payload.userTier as 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond',
      emailVerified: payload.emailVerified as boolean || false,
      phoneVerified: payload.phoneVerified as boolean || false,
      permissions: payload.permissions as string[],
      district: payload.district as string,
      upazila: payload.upazila as string,
    };
  }

  /**
   * Get current auth state
   */
  getState(): AuthState {
    return { ...this.state };
  }

  /**
   * Subscribe to auth state changes
   */
  subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());

    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.state.user;
  }

  /**
   * Check if authenticated
   */
  isAuthenticated(): boolean {
    return this.state.isAuthenticated && !this.isTokenExpired(this.state.accessToken || '');
  }

  /**
   * Check if MFA is required
   */
  isMfaRequired(): boolean {
    return this.state.requiresMfa;
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    const token = this.state.accessToken;
    if (token && !this.isTokenExpired(token)) {
      return token;
    }
    return null;
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return this.state.refreshToken;
  }

  /**
   * Check if account is locked
   */
  isAccountLocked(): boolean {
    return this.state.accountLocked;
  }

  /**
   * Get remaining lock time (seconds)
   */
  getRemainingLockTime(): number | undefined {
    return this.state.remainingLockTimeSeconds;
  }

  /**
   * Get remaining attempts before lock
   */
  getRemainingAttemptsBeforeLock(): number | undefined {
    return this.state.remainingAttemptsBeforeLock;
  }

  /**
   * Update state and notify listeners
   */
  private setState(newState: AuthState): void {
    this.state = newState;
    this.listeners.forEach((listener) => listener(this.state));
  }

  /**
   * Destroy auth client (clean up intervals)
   */
  destroy(): void {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
      this.autoRefreshInterval = null;
    }
  }
}

// ==================== Singleton Instance ====================

let authClientInstance: AuthClient | null = null;

export const createAuthClient = (config: AuthClientConfig): AuthClient => {
  if (authClientInstance) {
    authClientInstance.destroy();
  }
  authClientInstance = new AuthClient(config);
  return authClientInstance;
};

export const getAuthClient = (): AuthClient | null => {
  return authClientInstance;
};

export const resetAuthClient = (): void => {
  if (authClientInstance) {
    authClientInstance.destroy();
    authClientInstance.clearSession();
    authClientInstance = null;
  }
};

// ==================== Type Exports ====================

export type { AuthClientConfig, AuthState, User, MFAProvider };
