/**
 * Social Auth Client - OAuth and social login client
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/client/social.client
 *
 * RULES:
 * ✅ ONLY social auth orchestration - NO business logic
 * ✅ NO OAuth implementation, token exchange
 * ✅ Singleton pattern for consistent state
 * ✅ TypeScript strict
 */

// ==================== Types ====================

export type SocialProvider = 
  | 'google'
  | 'github'
  | 'facebook'
  | 'apple'
  | 'linkedin'
  | 'whatsapp'
  | 'imo'
  | 'telegram'
  | 'viber'
  | 'bkash'
  | 'nagad'
  | 'rocket';

export interface SocialClientConfig {
  apiClient: {
    getAuthUrl: (provider: SocialProvider, redirectUri?: string, scopes?: string[]) => Promise<{ url: string; state: string }>;
    handleCallback: (provider: SocialProvider, code: string, state: string, codeVerifier?: string) => Promise<{
      success: boolean;
      isNewUser: boolean;
      accessToken?: string;
      refreshToken?: string;
      user?: unknown;
    }>;
    connectAccount: (provider: SocialProvider, code: string, state: string, makePrimary?: boolean) => Promise<unknown>;
    disconnectAccount: (provider: SocialProvider, reason?: string) => Promise<{ success: boolean; message: string }>;
    getConnectedAccounts: () => Promise<{ accounts: unknown[] }>;
    setPrimaryAccount: (accountId: string) => Promise<{ success: boolean }>;
    sendSocialOTP: (phoneNumber: string, provider: 'whatsapp' | 'imo' | 'phone_otp', method: 'sms' | 'whatsapp' | 'imo', locale?: 'en' | 'bn') => Promise<{
      success: boolean;
      otpSent: boolean;
      maskedPhone: string;
      expiresInSeconds: number;
      sessionId: string;
      messageBn?: string;
    }>;
    verifySocialOTP: (phoneNumber: string, provider: 'whatsapp' | 'imo' | 'phone_otp', otpCode: string, sessionId?: string) => Promise<{
      success: boolean;
      verified: boolean;
      userId?: string;
      accessToken?: string;
      refreshToken?: string;
      isNewUser: boolean;
      messageBn?: string;
    }>;
    mfsAuth: (provider: 'bkash' | 'nagad' | 'rocket', accountNumber: string, pin?: string, otpCode?: string) => Promise<{
      success: boolean;
      authenticated: boolean;
      requiresOTP: boolean;
      requiresPin: boolean;
      sessionId?: string;
      userInfo?: unknown;
      messageBn?: string;
    }>;
  };
  onSocialLoginStart?: (provider: SocialProvider) => void;
  onSocialLoginSuccess?: (provider: SocialProvider, isNewUser: boolean) => void;
  onSocialLoginError?: (provider: SocialProvider, error: string) => void;
  onAccountConnected?: (provider: SocialProvider) => void;
  onAccountDisconnected?: (provider: SocialProvider) => void;
  tokenStorage?: {
    setTokens: (accessToken: string, refreshToken: string) => void;
  };
}

export interface SocialAccount {
  id: string;
  provider: SocialProvider;
  providerUserId: string;
  email: string;
  phoneNumber?: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar: string | null;
  isPrimary: boolean;
  isVerified: boolean;
  connectedAt: string;
  lastUsedAt: string | null;
}

export interface SocialState {
  isLoading: boolean;
  connectedAccounts: SocialAccount[];
  pendingOTP: {
    phoneNumber: string;
    provider: 'whatsapp' | 'imo' | 'phone_otp';
    sessionId: string;
    expiresAt: number;
  } | null;
  pendingMFS: {
    provider: 'bkash' | 'nagad' | 'rocket';
    accountNumber: string;
    sessionId?: string;
  } | null;
  error: string | null;
}

// ==================== Social Auth Client ====================

export class SocialAuthClient {
  private config: SocialClientConfig;
  private state: SocialState = {
    isLoading: false,
    connectedAccounts: [],
    pendingOTP: null,
    pendingMFS: null,
    error: null,
  };
  private listeners: Set<(state: SocialState) => void> = new Set();
  private popupWindow: Window | null = null;
  private popupCheckInterval: ReturnType<typeof setInterval> | null = null;

  constructor(config: SocialClientConfig) {
    this.config = config;
  }

  /**
   * Initialize social auth client
   */
  async initialize(): Promise<void> {
    await this.loadConnectedAccounts();
  }

  /**
   * Load connected social accounts
   */
  async loadConnectedAccounts(): Promise<void> {
    try {
      const response = await this.config.apiClient.getConnectedAccounts();
      this.state.connectedAccounts = response.accounts as SocialAccount[];
      this.state.error = null;
      this.notifyListeners();
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to load connected accounts';
      this.notifyListeners();
    }
  }

  /**
   * Login with social provider (popup)
   */
  async loginWithPopup(provider: SocialProvider, redirectUri?: string, scopes?: string[]): Promise<void> {
    this.state.isLoading = true;
    this.state.error = null;
    this.config.onSocialLoginStart?.(provider);
    this.notifyListeners();

    try {
      const { url, state } = await this.config.apiClient.getAuthUrl(provider, redirectUri, scopes);

      // Open popup
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      this.popupWindow = window.open(url, 'social-login', `width=${width},height=${height},left=${left},top=${top}`);

      // Monitor popup close
      this.startPopupMonitoring();

      // Wait for popup callback (handled via message event)
      const result = await this.waitForPopupCallback(provider, state);

      if (result.success) {
        this.config.onSocialLoginSuccess?.(provider, result.isNewUser);
        await this.loadConnectedAccounts();
      } else {
        const errorMsg = result.error || 'Login failed';
        this.state.error = errorMsg;
        this.config.onSocialLoginError?.(provider, errorMsg);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      this.state.error = message;
      this.config.onSocialLoginError?.(provider, message);
    } finally {
      this.state.isLoading = false;
      this.stopPopupMonitoring();
      this.closePopup();
      this.notifyListeners();
    }
  }

  /**
   * Start monitoring popup window close
   */
  private startPopupMonitoring(): void {
    this.popupCheckInterval = setInterval(() => {
      if (this.popupWindow && this.popupWindow.closed) {
        this.stopPopupMonitoring();
        if (this.state.isLoading) {
          this.state.isLoading = false;
          this.state.error = 'Login popup was closed';
          this.config.onSocialLoginError?.('unknown' as SocialProvider, 'Login popup was closed');
          this.notifyListeners();
        }
      }
    }, 500);
  }

  /**
   * Stop monitoring popup window
   */
  private stopPopupMonitoring(): void {
    if (this.popupCheckInterval) {
      clearInterval(this.popupCheckInterval);
      this.popupCheckInterval = null;
    }
  }

  /**
   * Handle OAuth callback (called from popup or redirect)
   */
  async handleCallback(provider: SocialProvider, code: string, state: string, codeVerifier?: string): Promise<{ success: boolean; isNewUser: boolean }> {
    try {
      const response = await this.config.apiClient.handleCallback(provider, code, state, codeVerifier);

      if (response.success && response.accessToken && response.refreshToken && this.config.tokenStorage) {
        // Store tokens using token storage
        this.config.tokenStorage.setTokens(response.accessToken, response.refreshToken);
      }

      return { success: response.success, isNewUser: response.isNewUser };
    } catch (error) {
      return { success: false, isNewUser: false };
    }
  }

  /**
   * Connect social account to existing user
   */
  async connectAccount(provider: SocialProvider, code: string, state: string, makePrimary?: boolean): Promise<boolean> {
    this.state.isLoading = true;
    this.state.error = null;
    this.notifyListeners();

    try {
      await this.config.apiClient.connectAccount(provider, code, state, makePrimary);
      await this.loadConnectedAccounts();
      this.config.onAccountConnected?.(provider);
      return true;
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to connect account';
      return false;
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Disconnect social account
   */
  async disconnectAccount(provider: SocialProvider, reason?: string): Promise<boolean> {
    this.state.isLoading = true;
    this.state.error = null;
    this.notifyListeners();

    try {
      const response = await this.config.apiClient.disconnectAccount(provider, reason);

      if (response.success) {
        await this.loadConnectedAccounts();
        this.config.onAccountDisconnected?.(provider);
        return true;
      }
      this.state.error = response.message || 'Failed to disconnect account';
      return false;
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to disconnect account';
      return false;
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Set primary social account
   */
  async setPrimaryAccount(accountId: string): Promise<boolean> {
    this.state.isLoading = true;
    this.state.error = null;
    this.notifyListeners();

    try {
      await this.config.apiClient.setPrimaryAccount(accountId);
      await this.loadConnectedAccounts();
      return true;
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'Failed to set primary account';
      return false;
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Send OTP for social login (Bangladesh specific)
   */
  async sendOTP(
    phoneNumber: string, 
    provider: 'whatsapp' | 'imo' | 'phone_otp', 
    method: 'sms' | 'whatsapp' | 'imo', 
    locale: 'en' | 'bn' = 'bn'
  ): Promise<{ sessionId: string; maskedPhone: string; expiresInSeconds: number }> {
    this.state.error = null;
    this.notifyListeners();

    const response = await this.config.apiClient.sendSocialOTP(phoneNumber, provider, method, locale);

    this.state.pendingOTP = {
      phoneNumber,
      provider,
      sessionId: response.sessionId,
      expiresAt: Date.now() + response.expiresInSeconds * 1000,
    };
    this.notifyListeners();

    return {
      sessionId: response.sessionId,
      maskedPhone: response.maskedPhone,
      expiresInSeconds: response.expiresInSeconds,
    };
  }

  /**
   * Verify OTP for social login
   */
  async verifyOTP(
    phoneNumber: string, 
    provider: 'whatsapp' | 'imo' | 'phone_otp', 
    otpCode: string
  ): Promise<{ success: boolean; isNewUser: boolean; verified: boolean; accessToken?: string; refreshToken?: string }> {
    this.state.isLoading = true;
    this.state.error = null;
    this.notifyListeners();

    try {
      const sessionId = this.state.pendingOTP?.sessionId;
      const response = await this.config.apiClient.verifySocialOTP(phoneNumber, provider, otpCode, sessionId);

      this.state.pendingOTP = null;

      if (response.success && response.accessToken && response.refreshToken && this.config.tokenStorage) {
        this.config.tokenStorage.setTokens(response.accessToken, response.refreshToken);
      }

      if (response.success) {
        await this.loadConnectedAccounts();
      }

      return {
        success: response.success,
        verified: response.verified,
        isNewUser: response.isNewUser,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      };
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'OTP verification failed';
      return { success: false, verified: false, isNewUser: false };
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Authenticate with MFS (bKash/Nagad/Rocket - Bangladesh specific)
   */
  async mfsAuth(
    provider: 'bkash' | 'nagad' | 'rocket', 
    accountNumber: string, 
    pin?: string, 
    otpCode?: string
  ): Promise<{
    authenticated: boolean;
    requiresOTP: boolean;
    requiresPin: boolean;
  }> {
    this.state.error = null;
    this.notifyListeners();

    const response = await this.config.apiClient.mfsAuth(provider, accountNumber, pin, otpCode);

    if (response.requiresOTP || response.requiresPin) {
      this.state.pendingMFS = {
        provider,
        accountNumber,
        sessionId: response.sessionId,
      };
      this.notifyListeners();
    } else if (response.authenticated && response.userInfo) {
      this.state.pendingMFS = null;
      if (this.config.tokenStorage) {
        // MFS auth typically doesn't return tokens directly, but may return user info
      }
      await this.loadConnectedAccounts();
      this.notifyListeners();
    }

    return {
      authenticated: response.authenticated,
      requiresOTP: response.requiresOTP,
      requiresPin: response.requiresPin,
    };
  }

  /**
   * Complete MFS auth with OTP
   */
  async completeMFSWithOTP(otpCode: string): Promise<boolean> {
    if (!this.state.pendingMFS) return false;

    this.state.isLoading = true;
    this.state.error = null;
    this.notifyListeners();

    try {
      const { provider, accountNumber, sessionId } = this.state.pendingMFS;
      const response = await this.config.apiClient.mfsAuth(provider, accountNumber, undefined, otpCode);

      this.state.pendingMFS = null;

      if (response.authenticated) {
        await this.loadConnectedAccounts();
      }

      return response.authenticated;
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'MFS verification failed';
      return false;
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Complete MFS auth with PIN (if PIN was required)
   */
  async completeMFSWithPIN(pin: string): Promise<boolean> {
    if (!this.state.pendingMFS) return false;

    this.state.isLoading = true;
    this.state.error = null;
    this.notifyListeners();

    try {
      const { provider, accountNumber, sessionId } = this.state.pendingMFS;
      const response = await this.config.apiClient.mfsAuth(provider, accountNumber, pin, undefined);

      this.state.pendingMFS = null;

      if (response.authenticated) {
        await this.loadConnectedAccounts();
      }

      return response.authenticated;
    } catch (error) {
      this.state.error = error instanceof Error ? error.message : 'MFS PIN verification failed';
      return false;
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Cancel pending MFS auth
   */
  cancelMFS(): void {
    this.state.pendingMFS = null;
    this.state.error = null;
    this.notifyListeners();
  }

  /**
   * Cancel pending OTP
   */
  cancelOTP(): void {
    this.state.pendingOTP = null;
    this.state.error = null;
    this.notifyListeners();
  }

  /**
   * Get connected accounts
   */
  getConnectedAccounts(): SocialAccount[] {
    return [...this.state.connectedAccounts];
  }

  /**
   * Get primary account
   */
  getPrimaryAccount(): SocialAccount | null {
    return this.state.connectedAccounts.find(acc => acc.isPrimary) || null;
  }

  /**
   * Get account by provider
   */
  getAccountByProvider(provider: SocialProvider): SocialAccount | null {
    return this.state.connectedAccounts.find(acc => acc.provider === provider) || null;
  }

  /**
   * Check if provider is connected
   */
  isProviderConnected(provider: SocialProvider): boolean {
    return this.state.connectedAccounts.some(acc => acc.provider === provider);
  }

  /**
   * Check if loading
   */
  isLoading(): boolean {
    return this.state.isLoading;
  }

  /**
   * Get error
   */
  getError(): string | null {
    return this.state.error;
  }

  /**
   * Get pending OTP info
   */
  getPendingOTP() {
    return this.state.pendingOTP ? { ...this.state.pendingOTP } : null;
  }

  /**
   * Get pending MFS info
   */
  getPendingMFS() {
    return this.state.pendingMFS ? { ...this.state.pendingMFS } : null;
  }

  /**
   * Check if OTP is expired
   */
  isOTPExpired(): boolean {
    if (!this.state.pendingOTP) return true;
    return Date.now() >= this.state.pendingOTP.expiresAt;
  }

  /**
   * Get remaining OTP time (seconds)
   */
  getRemainingOTPTime(): number {
    if (!this.state.pendingOTP) return 0;
    const remaining = Math.max(0, this.state.pendingOTP.expiresAt - Date.now());
    return Math.ceil(remaining / 1000);
  }

  /**
   * Wait for popup callback
   */
  private waitForPopupCallback(provider: SocialProvider, state: string): Promise<{ success: boolean; isNewUser: boolean; error?: string }> {
    return new Promise((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        // Validate origin for security
        const allowedOrigins = [window.location.origin, 'https://vubon.com.bd', 'https://api.vubon.com.bd'];
        if (!allowedOrigins.includes(event.origin)) {
          return;
        }

        if (event.data?.type === 'social-login-callback' && event.data?.provider === provider) {
          window.removeEventListener('message', handleMessage);
          resolve({ 
            success: event.data.success, 
            isNewUser: event.data.isNewUser, 
            error: event.data.error 
          });
        }
      };

      window.addEventListener('message', handleMessage);

      // Timeout after 5 minutes
      setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        resolve({ success: false, isNewUser: false, error: 'Login timeout' });
      }, 300000);
    });
  }

  /**
   * Close popup window
   */
  closePopup(): void {
    if (this.popupWindow && !this.popupWindow.closed) {
      this.popupWindow.close();
      this.popupWindow = null;
    }
  }

  /**
   * Clear error
   */
  clearError(): void {
    this.state.error = null;
    this.notifyListeners();
  }

  /**
   * Get current state
   */
  getState(): SocialState {
    return {
      ...this.state,
      connectedAccounts: [...this.state.connectedAccounts],
    };
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: SocialState) => void): () => void {
    this.listeners.add(listener);
    listener(this.getState());

    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify listeners
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  /**
   * Reset state
   */
  reset(): void {
    this.state = {
      isLoading: false,
      connectedAccounts: [],
      pendingOTP: null,
      pendingMFS: null,
      error: null,
    };
    this.closePopup();
    this.stopPopupMonitoring();
    this.notifyListeners();
  }

  /**
   * Destroy client
   */
  destroy(): void {
    this.closePopup();
    this.stopPopupMonitoring();
    this.listeners.clear();
  }
}

// ==================== Singleton ====================

let socialAuthClientInstance: SocialAuthClient | null = null;

export const createSocialAuthClient = (config: SocialClientConfig): SocialAuthClient => {
  if (socialAuthClientInstance) {
    socialAuthClientInstance.destroy();
  }
  socialAuthClientInstance = new SocialAuthClient(config);
  return socialAuthClientInstance;
};

export const getSocialAuthClient = (): SocialAuthClient | null => {
  return socialAuthClientInstance;
};

export const resetSocialAuthClient = (): void => {
  if (socialAuthClientInstance) {
    socialAuthClientInstance.destroy();
    socialAuthClientInstance = null;
  }
};

// ==================== Type Exports ====================

export type { SocialState, SocialAccount };
