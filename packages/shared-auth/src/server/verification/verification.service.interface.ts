export type VerificationChannel = 'email' | 'sms';

export interface VerificationRequest {
  readonly userId: string;
  readonly channel: VerificationChannel;
  readonly target: string;
}

export interface VerificationRecord {
  readonly id: string;
  readonly userId: string;
  readonly channel: VerificationChannel;
  readonly target: string;
  readonly codeHash: string;
  readonly expiresAt: number;
  readonly attempts: number;
  readonly maxAttempts: number;
}

export interface VerificationServiceContract {
  start(input: VerificationRequest): Promise<{ id: string; expiresAt: number }>;
  confirm(id: string, code: string): Promise<boolean>;
}
