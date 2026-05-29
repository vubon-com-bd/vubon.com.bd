/**
 * MFA Client - Multi-Factor Authentication client
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/client/mfa.client
 *
 * RULES:
 * ✅ ONLY MFA orchestration - NO business logic
 * ✅ NO UI rendering, toast, redirect
 * ✅ Singleton pattern for consistent state
 * ✅ TypeScript strict
 */

import type { 
  MFAVerifyResponse, 
  MFASetupResponse,
  MFAMethod,
  MFAChallengeResponse 
} from '@vubon/shared-api';

// ==================== Types ====================

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

export interface MFAClientConfig {
  apiClient: {
    getMFAMethods: () => Promise<{ methods: MFAMethod[] }>;
    setupMFA: (provider: MFAProvider, identifier?: string, label?: string) => Promise<MFASetupResponse>;
    verifyMFA: (code: string, methodId?: string, trustDevice?: boolean, challengeId?: string) => Promise<MFAVerifyResponse>;
    disableMFA: (methodId?: string, reason?: string) => Promise<{ success: boolean; message: string }>;
    getBackupCodes: () => Promise<{ backupCodes: string[]; remainingCount: number; totalCount: number }>;
    regenerateBackupCodes: () => Promise<{ backupCodes: string[] }>;
    verifyWithBackupCode: (backupCode: string) => Promise<{ success: boolean; recovered: boolean }>;
    createChallenge: (verificationType: string, metadata?: { amount?: number; orderId?: string }) => Promise<MFAChallengeResponse>;
    getChallengeStatus: (challengeId: string) => Promise<MFAChallengeResponse>;
    setPrimaryMethod: (methodId: string) => Promise<{ success: boolean }>;
  };
  onMFAEnabled?: () => void;
  onMFADisabled?: () => void;
  onBackupCodesRegenerated?: () => void;
}

export interface MFAState {
  isEnabled: boolean;
  methods: MFAMethod[];
  defaultMethod: MFAMethod | null;
  recoveryCodesRemaining: number;
  recoveryCodesTotal: number;
  pendingSetup: {
    provider: MFAProvider | null;
    secret?: string;
    qrCodeUrl?: string;
    backupCodes?: string[];
  } | null;
}

// ==================== MFA Client ====================

export class MFAClient {
  private config: MFAClientConfig;
  private state: MFAState = {
    isEnabled: false,
    methods: [],
    defaultMethod: null,
    recoveryCodesRemaining: 0,
    recoveryCodesTotal: 0,
    pendingSetup: null,
  };
  private listeners: Set<(state: MFAState) => void> = new Set();

  constructor(config: MFAClientConfig) {
    this.config = config;
  }

  /**
   * Initialize MFA client - load methods
   */
  async initialize(): Promise<void> {
    await this.loadMethods();
  }

  /**
   * Load MFA methods from server
   */
  async loadMethods(): Promise<MFAMethod[]> {
    try {
      const response = await this.config.apiClient.getMFAMethods();
      this.state.methods = response.methods;
      this.state.isEnabled = response.methods.some(m => m.isVerified);
      this.state.defaultMethod = response.methods.find(m => m.isPrimary) || null;
      this.notifyListeners();
      return this.state.methods;
    } catch {
      return [];
    }
  }

  /**
   * Load backup codes info
   */
  async loadBackupCodesInfo(): Promise<void> {
    try {
      const response = await this.config.apiClient.getBackupCodes();
      this.state.recoveryCodesRemaining = response.remainingCount;
      this.state.recoveryCodesTotal = response.totalCount;
      this.notifyListeners();
    } catch {
      // Silently fail
    }
  }

  /**
   * Setup MFA for a provider
   */
  async setupMFA(provider: MFAProvider, identifier?: string, label?: string): Promise<MFASetupResponse> {
    const response = await this.config.apiClient.setupMFA(provider, identifier, label);
    
    this.state.pendingSetup = {
      provider,
      secret: response.secret,
      qrCodeUrl: response.qrCodeUrl,
      backupCodes: response.backupCodes,
    };
    
    if (response.backupCodes) {
      this.state.recoveryCodesRemaining = response.backupCodes.length;
      this.state.recoveryCodesTotal = response.backupCodes.length;
    }
    
    this.notifyListeners();
    return response;
  }

  /**
   * Verify and enable MFA
   */
  async verifyMFA(code: string, methodId?: string, trustDevice?: boolean, challengeId?: string): Promise<MFAVerifyResponse> {
    const response = await this.config.apiClient.verifyMFA(code, methodId, trustDevice, challengeId);
    
    if (response.verified && response.methodUsed) {
      await this.loadMethods();
      await this.loadBackupCodesInfo();
      this.state.pendingSetup = null;
      this.config.onMFAEnabled?.();
      this.notifyListeners();
    }
    
    return response;
  }

  /**
   * Disable MFA for a method or all methods
   */
  async disableMFA(methodId?: string, reason?: string): Promise<boolean> {
    try {
      const response = await this.config.apiClient.disableMFA(methodId, reason);
      
      if (response.success) {
        await this.loadMethods();
        await this.loadBackupCodesInfo();
        this.config.onMFADisabled?.();
        this.notifyListeners();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Get backup codes
   */
  async getBackupCodes(): Promise<string[]> {
    const response = await this.config.apiClient.getBackupCodes();
    this.state.recoveryCodesRemaining = response.remainingCount;
    this.notifyListeners();
    return response.backupCodes;
  }

  /**
   * Regenerate backup codes
   */
  async regenerateBackupCodes(): Promise<string[]> {
    const response = await this.config.apiClient.regenerateBackupCodes();
    this.state.recoveryCodesRemaining = response.backupCodes.length;
    this.state.recoveryCodesTotal = response.backupCodes.length;
    this.config.onBackupCodesRegenerated?.();
    this.notifyListeners();
    return response.backupCodes;
  }

  /**
   * Verify with backup code (recovery)
   */
  async verifyWithBackupCode(backupCode: string): Promise<boolean> {
    const response = await this.config.apiClient.verifyWithBackupCode(backupCode);
    
    if (response.success) {
      await this.loadBackupCodesInfo();
      this.notifyListeners();
    }
    
    return response.success;
  }

  /**
   * Create MFA challenge (step-up authentication)
   */
  async createChallenge(verificationType: string, amount?: number, orderId?: string): Promise<MFAChallengeResponse> {
    return this.config.apiClient.createChallenge(verificationType, { amount, orderId });
  }

  /**
   * Get challenge status
   */
  async getChallengeStatus(challengeId: string): Promise<MFAChallengeResponse> {
    return this.config.apiClient.getChallengeStatus(challengeId);
  }

  /**
   * Set primary MFA method
   */
  async setPrimaryMethod(methodId: string): Promise<boolean> {
    try {
      const response = await this.config.apiClient.setPrimaryMethod(methodId);
      
      if (response.success) {
        await this.loadMethods();
        this.notifyListeners();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
   * Cancel pending MFA setup
   */
  cancelSetup(): void {
    this.state.pendingSetup = null;
    this.notifyListeners();
  }

  /**
   * Get current MFA state
   */
  getState(): MFAState {
    return { ...this.state };
  }

  /**
   * Check if user has MFA enabled
   */
  isMFAEnabled(): boolean {
    return this.state.isEnabled;
  }

  /**
   * Get MFA methods
   */
  getMethods(): MFAMethod[] {
    return [...this.state.methods];
  }

  /**
   * Get default MFA method
   */
  getDefaultMethod(): MFAMethod | null {
    return this.state.defaultMethod;
  }

  /**
   * Get pending setup
   */
  getPendingSetup(): MFAState['pendingSetup'] {
    return this.state.pendingSetup ? { ...this.state.pendingSetup } : null;
  }

  /**
   * Get remaining backup codes count
   */
  getRemainingBackupCodes(): number {
    return this.state.recoveryCodesRemaining;
  }

  /**
   * Subscribe to MFA state changes
   */
  subscribe(listener: (state: MFAState) => void): () => void {
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
   * Destroy MFA client
   */
  destroy(): void {
    this.listeners.clear();
  }
}

// ==================== Singleton ====================

let mfaClientInstance: MFAClient | null = null;

export const createMFAClient = (config: MFAClientConfig): MFAClient => {
  if (mfaClientInstance) {
    mfaClientInstance.destroy();
  }
  mfaClientInstance = new MFAClient(config);
  return mfaClientInstance;
};

export const getMFAClient = (): MFAClient | null => {
  return mfaClientInstance;
};

export const resetMFAClient = (): void => {
  if (mfaClientInstance) {
    mfaClientInstance.destroy();
    mfaClientInstance = null;
  }
};

export type { MFAMethod, MFAVerifyResponse, MFASetupResponse, MFAChallengeResponse };
