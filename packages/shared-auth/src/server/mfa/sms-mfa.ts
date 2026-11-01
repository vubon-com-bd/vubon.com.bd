import { generateNumericOtp } from '../../common/token/token.generator';

export interface SmsOtpRecord {
  readonly userId: string;
  readonly phone: string;
  readonly code: string;
  readonly expiresAt: number;
  readonly attempts: number;
  readonly maxAttempts: number;
}

export interface SmsMfaStore {
  set(record: SmsOtpRecord): Promise<void>;
  get(userId: string): Promise<SmsOtpRecord | null>;
  delete(userId: string): Promise<void>;
}

export class InMemorySmsMfaStore implements SmsMfaStore {
  private readonly map = new Map<string, SmsOtpRecord>();

  async set(record: SmsOtpRecord): Promise<void> {
    this.map.set(record.userId, record);
  }
  async get(userId: string): Promise<SmsOtpRecord | null> {
    return this.map.get(userId) ?? null;
  }
  async delete(userId: string): Promise<void> {
    this.map.delete(userId);
  }
}

export function createSmsOtp(
  userId: string,
  phone: string,
  ttlSeconds = 300,
  maxAttempts = 5
): SmsOtpRecord {
  return {
    userId,
    phone,
    code: generateNumericOtp(6),
    expiresAt: Date.now() + ttlSeconds * 1000,
    attempts: 0,
    maxAttempts,
  };
}
