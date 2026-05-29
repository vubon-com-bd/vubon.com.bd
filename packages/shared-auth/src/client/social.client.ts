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
    }>;
    verifySocialOTP: (phoneNumber: string, provider: 'whatsapp' | 'imo' | 'phone_otp', otpCode: string, sessionId?: string) => Promise<{
      success: boolean;
      verified: boolean;
      userId?: string;
      accessToken?: string;
      refreshToken?: string;
      isNewUser: boolean;
    }>;
    mfsAuth: (provider: 'bkash' | 'nagad' | 'rocket', accountNumber: string, pin?: string, otpCode?: string) => Promise<{
      success: boolean;
      authenticated: boolean;
      requiresOTP: boolean;
      requiresPin: boolean;
      sessionId?: string;
      userInfo?: unknown;
    }>;
  };
  onSocialLoginStart?: (provider: SocialProvider) => void;
  onSocialLoginSuccess?: (provider: SocialProvider, isNewUser: boolean) => void;
  onSocialLoginError?: (provider: SocialProvider, error: string) => void;
  onAccountConnected?: (provider: SocialProvider) => void;
  onAccountDisconnected?: (provider: SocialProvider) => void;
}

export interface SocialState {
  isLoading: boolean;
  connectedAccounts: unknown[];
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
}

// ==================== Social Auth Client ====================

export class SocialAuthClient {
  private config: SocialClientConfig;
  private state: SocialState = {
    isLoading: false,
    connectedAccounts: [],
    pendingOTP: null,
    pendingMFS: null,
  };
  private listeners: Set<(state: SocialState) => void> = new Set();
  private popupWindow: Window | null = null;

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
      this.state.connectedAccounts = response.accounts;
      this.notifyListeners();
    } catch {
      // Silently fail
    }
  }

  /**
   * Login with social provider (popup)
   */
  async loginWithPopup(provider: SocialProvider, redirectUri?: string, scopes?: string[]): Promise<void> {
    this.state.isLoading = true;
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
      
      // Wait for popup callback (handled via message event)
      const result = await this.waitForPopupCallback(provider, state);
      
      if (result.success) {
        this.config.onSocialLoginSuccess?.(provider, result.isNewUser);
        await this.loadConnectedAccounts();
      } else {
        this.config.onSocialLoginError?.(provider, 'Login failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      this.config.onSocialLoginError?.(provider, message);
    } finally {
      this.state.isLoading = false;
      this.notifyListeners();
    }
  }

  /**
   * Handle OAuth callback (called from popup or redirect)
   */
  async handleCallback(provider: SocialProvider, code: string, state: string, codeVerifier?: string): Promise<{ success: boolean; isNewUser: boolean }> {
    try {
      const response = await this.config.apiClient.handleCallback(provider, code, state, codeVerifier);
      
      if (response.success && response.accessToken) {
        // Store tokens (delegate to auth client)
        this.notifyListeners();
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
    try {
      await this.config.apiClient.connectAccount(provider, code, state, makePrimary);
      await this.loadConnectedAccounts();
      this.config.onAccountConnected?.(provider);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Disconnect social account
   */
  async disconnectAccount(provider: SocialProvider, reason?: string): Promise<boolean> {
    try {
      const response = await this.config.apiClient.disconnectAccount(provider, reason);
      
      if (response.success) {
        await this.loadConnectedAccounts();
        this.config.onAccountDisconnected?.(provider);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Set primary social account
   */
  async setPrimaryAccount(accountId: string): Promise<boolean> {
    try {
      await this.config.apiClient.setPrimaryAccount(accountId);
      await this.loadConnectedAccounts();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Send OTP for social login (Bangladesh specific)
   */
  async sendOTP(phoneNumber: string, provider: 'whatsapp' | 'imo' | 'phone_otp', method: 'sms' | 'whatsapp' | 'imo', locale: 'en' | 'bn' = 'bn'): Promise<string> {
    const response = await this.config.apiClient.sendSocialOTP(phoneNumber, provider, method, locale);
    
    this.state.pendingOTP = {
      phoneNumber,
      provider,
      sessionId: response.sessionId,
      expiresAt: Date.now() + response.expiresInSeconds * 1000,
    };
    this.notifyListeners();
    
    return response.sessionId;
  }

  /**
   * Verify OTP for social login
   */
  async verifyOTP(phoneNumber: string, provider: 'whatsapp' | 'imo' | 'phone_otp', otpCode: string): Promise<{ success: boolean; isNewUser: boolean }> {
    const sessionId = this.state.pendingOTP?.sessionId;
    
    const response = await this.config.apiClient.verifySocialOTP(phoneNumber, provider, otpCode, sessionId);
    
    this.state.pendingOTP = null;
    this.notifyListeners();
    
    if (response.success && response.accessToken) {
      // Store tokens
      this.notifyListeners();
    }
    
    return { success: response.success, isNewUser: response.isNewUser };
  }

  /**
   * Authenticate with MFS (bKash/Nagad/Rocket - Bangladesh specific)
   */
  async mfsAuth(provider: 'bkash' | 'nagad' | 'rocket', accountNumber: string, pin?: string, otpCode?: string): Promise<{
    authenticated: boolean;
    requiresOTP: boolean;
    requiresPin: boolean;
  }> {
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
    
    const { provider, accountNumber, sessionId } = this.state.pendingMFS;
    const response = await this.config.apiClient.mfsAuth(provider, accountNumber, undefined, otpCode);
    
    this.state.pendingMFS = null;
    this.notifyListeners();
    
    return response.authenticated;
  }

  /**
   * Cancel pending MFS auth
   */
  cancelMFS(): void {
    this.state.pendingMFS = null;
    this.notifyListeners();
  }

  /**
   * Get connected accounts
   */
  getConnectedAccounts(): unknown[] {
    return [...this.state.connectedAccounts];
  }

  /**
   * Check if loading
   */
  isLoading(): boolean {
    return this.state.isLoading;
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
   * Wait for popup callback
   */
  private waitForPopupCallback(provider: SocialProvider, state: string): Promise<{ success: boolean; isNewUser: boolean }> {
    return new Promise((resolve) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'social-login-callback' && event.data?.provider === provider) {
          window.removeEventListener('message', handleMessage);
          resolve({ success: event.data.success, isNewUser: event.data.isNewUser });
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Timeout after 5 minutes
      setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        resolve({ success: false, isNewUser: false });
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
   * Destroy client
   */
  destroy(): void {
    this.closePopup();
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

export type { SocialState };
