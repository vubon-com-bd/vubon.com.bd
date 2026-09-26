export interface MfaSetupRequest {
  readonly method: 'totp' | 'sms' | 'email';
  readonly phone?: string;
}

export interface MfaSetupResponse {
  readonly secret?: string;
  readonly qrCode?: string;
  readonly backupCodes?: readonly string[];
}

export interface MfaVerifyRequest {
  readonly code: string;
  readonly method: 'totp' | 'sms' | 'email';
}

export interface MfaVerifyResponse {
  readonly verified: boolean;
  readonly accessToken?: string;
  readonly refreshToken?: string;
}
