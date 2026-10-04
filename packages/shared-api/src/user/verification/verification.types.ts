export type VerificationChannel = 'email' | 'sms' | 'whatsapp';

export interface StartVerificationRequest {
  readonly channel: VerificationChannel;
  readonly target: string;
}

export interface StartVerificationResponse {
  readonly verificationId: string;
  readonly expiresAt: string;
}

export interface ConfirmVerificationRequest {
  readonly verificationId: string;
  readonly code: string;
}

export interface ConfirmVerificationResponse {
  readonly verified: boolean;
}
