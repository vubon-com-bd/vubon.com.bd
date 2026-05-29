/**
 * Verification Client - Email/Phone verification client
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/src/client/verification.client
 *
 * RULES:
 * ✅ ONLY verification orchestration - NO business logic
 * ✅ NO UI rendering, toast, redirect
 * ✅ Singleton pattern for consistent state
 * ✅ TypeScript strict
 */

import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export type VerificationType = 'email' | 'phone' | 'whatsapp' | 'imo' | 'voice';
export type VerificationMethod = 'sms' | 'whatsapp' | 'imo' | 'voice' | 'email';

export interface VerificationClientConfig {
  apiClient: {
    sendVerification: (type: VerificationType, target: string, method?: VerificationMethod, locale?: 'en' | 'bn') => Promise<{
      success: boolean;
      message: string;
      messageBn?: string;
      expiresInSeconds: number;
      resendCooldownSeconds: number;
      sessionId?: string;
    }>;
    verify: (type: VerificationType, code: string, sessionId?: string) => Promise<{
      success: boolean;
      verified: boolean;
      message?: string;
      messageBn?: string;
      remainingAttempts?: number;
    }>;
    getVerificationStatus: () => Promise<{
      emailVerified: boolean;
      phoneVerified: boolean;
      whatsappVerified?: boolean;
      fullyVerified: boolean;
    }>;
    resendVerification: (type: VerificationType, sessionId?: string) => Promise<{
      success: boolean;
      expiresInSeconds: number;
      resendCooldownSeconds: number;
    }>;
  };
  onVerificationSent?: (type: VerificationType, target: string) => void;
  onVerificationSuccess?: (type: VerificationType) => void;
  onVerificationFailed?: (type: VerificationType, error: string) => void;
}

export interface VerificationState {
  isSending: boolean;
  isVerifying: boolean;
  lastSentAt: Record<string, number>;
  cooldownRemaining: Record<string, number>;
  status: {
    emailVerified: boolean;
    phoneVerified: boolean;
    whatsappVerified: boolean;
    fullyVerified: boolean;
  } | null;
}

// ==================== Verification Client ====================

export class VerificationClient {
  private config: VerificationClientConfig;
  private state: VerificationState = {
    isSending: false,
    isVerifying: false,
    lastSentAt: {},
    cooldownRemaining: {},
    status: null,
  };
  private listeners: Set<(state: VerificationState) => void> = new Set();
  private cooldownIntervals: Map<string, ReturnType<typeof setInterval>> = new Map();

  constructor(config: VerificationClientConfig) {
    this.config = config;
  }

  /**
   * Initialize verification client
   */
  async initialize(): Promise<void> {
    await this.loadVerificationStatus();
  }

  /**
   * Load verification status
   */
  async loadVerificationStatus(): Promise<void> {
    try {
      const status = await this.config.apiClient.getVerificationStatus();
      this.state.status = {
        emailVerified: status.emailVerified,
        phoneVerified: status.phoneVerified,
        whatsappVerified: status.whatsappVerified || false,
        fullyVerified: status.fullyVerified,
      };
      this.notifyListeners();
    } catch {
      // Silently fail
    }
  }

  /**
   * Send verification code
   */
  async sendVerification(
    type: VerificationType,
    target: string,
    method?: VerificationMethod,
    locale: 'en' | 'bn' = 'bn'
  ): Promise<boolean> {
    const key = `${type}:${target}`;
    const now = Date.now();
    const lastSent = this.state.lastSentAt[key] || 0;
    
    // Check cooldown (30 seconds default)
    if (now - lastSent < 30000) {
      const remaining = Math.ceil((30000 - (now - lastSent)) / 1000);
      throw new Error(`Please wait ${remaining} seconds before resending`);
    }

    this.state.isSending = true;
    this.notifyListeners();

    try {
      const response = await this.config.apiClient.sendVerification(type, target, method, locale);
      
      this.state.lastSentAt[key] = Date.now();
      this.startCooldown(key, response.resendCooldownSeconds);
      
      this.config.onVerificationSent?.(type, target);
      this.notifyListeners();
      return response.success;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send verification';
      this.config.onVerificationFailed?.(type, message);
      return false;
    } finally {
      this.state.isSending = false;
      this.notifyListeners();
    }
  }

  /**
   * Verify code
   */
  async verifyCode(type: VerificationType, code: string, sessionId?: string): Promise<boolean> {
    this.state.isVerifying = true;
    this.notifyListeners();

    try {
      const response = await this.config.apiClient.verify(type, code, sessionId);
      
      if (response.verified) {
        await this.loadVerificationStatus();
        this.config.onVerificationSuccess?.(type);
        return true;
      } else {
        this.config.onVerificationFailed?.(type, response.message || 'Verification failed');
        return false;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Verification failed';
      this.config.onVerificationFailed?.(type, message);
      return false;
    } finally {
      this.state.isVerifying = false;
      this.notifyListeners();
    }
  }

  /**
   * Resend verification code
   */
  async resendVerification(type: VerificationType, sessionId?: string): Promise<boolean> {
    try {
      const response = await this.config.apiClient.resendVerification(type, sessionId);
      this.startCooldown(type, response.resendCooldownSeconds);
      return response.success;
    } catch {
      return false;
    }
  }

  /**
   * Start cooldown timer for resend
   */
  private startCooldown(key: string, seconds: number): void {
    // Clear existing interval
    const existing = this.cooldownIntervals.get(key);
    if (existing) {
      clearInterval(existing);
    }

    this.state.cooldownRemaining[key] = seconds;
    
    const interval = setInterval(() => {
      const current = this.state.cooldownRemaining[key];
      if (current <= 1) {
        clearInterval(interval);
        this.cooldownIntervals.delete(key);
        delete this.state.cooldownRemaining[key];
      } else {
        this.state.cooldownRemaining[key] = current - 1;
      }
      this.notifyListeners();
    }, 1000);
    
    this.cooldownIntervals.set(key, interval);
    this.notifyListeners();
  }

  /**
   * Get cooldown remaining seconds for a target
   */
  getCooldownRemaining(type: VerificationType, target: string): number {
    const key = `${type}:${target}`;
    return this.state.cooldownRemaining[key] || 0;
  }

  /**
   * Check if email is verified
   */
  isEmailVerified(): boolean {
    return this.state.status?.emailVerified ?? false;
  }

  /**
   * Check if phone is verified
   */
  isPhoneVerified(): boolean {
    return this.state.status?.phoneVerified ?? false;
  }

  /**
   * Check if WhatsApp is verified
   */
  isWhatsAppVerified(): boolean {
    return this.state.status?.whatsappVerified ?? false;
  }

  /**
   * Check if user is fully verified (email + phone)
   */
  isFullyVerified(): boolean {
    return this.state.status?.fullyVerified ?? false;
  }

  /**
   * Get verification status
   */
  getVerificationStatus() {
    return this.state.status ? { ...this.state.status } : null;
  }

  /**
   * Check if currently sending
   */
  isSending(): boolean {
    return this.state.isSending;
  }

  /**
   * Check if currently verifying
   */
  isVerifying(): boolean {
    return this.state.isVerifying;
  }

  /**
   * Get current state
   */
  getState(): VerificationState {
    return {
      ...this.state,
      cooldownRemaining: { ...this.state.cooldownRemaining },
    };
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: VerificationState) => void): () => void {
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
   * Clear all cooldowns
   */
  clearCooldowns(): void {
    this.cooldownIntervals.forEach(interval => clearInterval(interval));
    this.cooldownIntervals.clear();
    this.state.cooldownRemaining = {};
    this.state.lastSentAt = {};
    this.notifyListeners();
  }

  /**
   * Destroy client
   */
  destroy(): void {
    this.clearCooldowns();
    this.listeners.clear();
  }
}

// ==================== Singleton ====================

let verificationClientInstance: VerificationClient | null = null;

export const createVerificationClient = (config: VerificationClientConfig): VerificationClient => {
  if (verificationClientInstance) {
    verificationClientInstance.destroy();
  }
  verificationClientInstance = new VerificationClient(config);
  return verificationClientInstance;
};

export const getVerificationClient = (): VerificationClient | null => {
  return verificationClientInstance;
};

export const resetVerificationClient = (): void => {
  if (verificationClientInstance) {
    verificationClientInstance.destroy();
    verificationClientInstance = null;
  }
};
