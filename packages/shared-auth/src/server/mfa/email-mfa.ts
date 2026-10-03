import { generateNumericOtp } from '../../common/token/token.generator';

export interface EmailOtpRecord {
  readonly userId: string;
  readonly email: string;
  readonly code: string;
  readonly expiresAt: number;
  readonly attempts: number;
  readonly maxAttempts: number;
}

export interface EmailMfaStore {
  set(record: EmailOtpRecord): Promise<void>;
  get(userId: string): Promise<EmailOtpRecord | null>;
  delete(userId: string): Promise<void>;
}

export class InMemoryEmailMfaStore implements EmailMfaStore {
  private readonly map = new Map<string, EmailOtpRecord>();

  async set(record: EmailOtpRecord): Promise<void> {
    this.map.set(record.userId, record);
  }
  async get(userId: string): Promise<EmailOtpRecord | null> {
    return this.map.get(userId) ?? null;
  }
  async delete(userId: string): Promise<void> {
    this.map.delete(userId);
  }
}

export function createEmailOtp(
  userId: string,
  email: string,
  ttlSeconds = 600,
  maxAttempts = 5
): EmailOtpRecord {
  return {
    userId,
    email,
    code: generateNumericOtp(6),
    expiresAt: Date.now() + ttlSeconds * 1000,
    attempts: 0,
    maxAttempts,
  };
}
