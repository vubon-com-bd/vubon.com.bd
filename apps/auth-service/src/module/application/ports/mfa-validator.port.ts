/**
 * MFA Validator Port
 * Application-layer contract for MFA secret generation & TOTP verification.
 * Implementation lives in infrastructure layer (otplib/speakeasy).
 */
export interface MfaSetupResult {
  readonly secret: string;
  readonly otpauthUrl: string;
  readonly qrCodeDataUrl: string;
}

export interface MfaValidatorPort {
  generateSecret(): Promise<MfaSetupResult>;
  verify(secret: string, code: string): Promise<boolean>;
}
