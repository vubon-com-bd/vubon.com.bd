import { generateOpaqueToken, generateNumericOtp } from '../../common/token/token.generator';

export interface EmailVerificationRecord {
  readonly userId: string;
  readonly email: string;
  readonly token: string;
  readonly code: string;
  readonly expiresAt: number;
  readonly attempts: number;
  readonly maxAttempts: number;
}

export interface EmailVerificationSender {
  send(input: { email: string; token: string; code: string; expiresAt: number }): Promise<void>;
}

export class InMemoryEmailVerificationStore {
  private readonly map = new Map<string, EmailVerificationRecord>();

  async set(record: EmailVerificationRecord): Promise<void> {
    this.map.set(record.userId, record);
  }
  async get(userId: string): Promise<EmailVerificationRecord | null> {
    return this.map.get(userId) ?? null;
  }
  async delete(userId: string): Promise<void> {
    this.map.delete(userId);
  }
}

export function createEmailVerification(
  userId: string,
  email: string,
  ttlSeconds = 24 * 3600
): EmailVerificationRecord {
  return {
    userId,
    email,
    token: generateOpaqueToken(32),
    code: generateNumericOtp(6),
    expiresAt: Date.now() + ttlSeconds * 1000,
    attempts: 0,
    maxAttempts: 5,
  };
}
