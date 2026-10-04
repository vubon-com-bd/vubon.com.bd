export type MfaMethod = 'totp' | 'sms' | 'email' | 'webauthn' | 'recovery';

export interface MfaSetupResult {
  readonly method: MfaMethod;
  readonly secret?: string;
  readonly qrCodeUrl?: string;
  readonly recoveryCodes?: readonly string[];
}

export interface MfaVerifyResult {
  readonly verified: boolean;
  readonly method: MfaMethod;
  readonly error?: string;
}

export interface MfaServiceContract {
  setup(userId: string, method: MfaMethod): Promise<MfaSetupResult>;
  verify(userId: string, code: string, method: MfaMethod): Promise<MfaVerifyResult>;
  disable(userId: string, method: MfaMethod): Promise<void>;
  getEnabledMethods(userId: string): Promise<readonly MfaMethod[]>;
}
