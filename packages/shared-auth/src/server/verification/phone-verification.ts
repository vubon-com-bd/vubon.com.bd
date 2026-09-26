import { generateNumericOtp } from '../../common/token/token.generator';

export interface PhoneVerificationRecord {
  readonly userId: string;
  readonly phone: string;
  readonly code: string;
  readonly expiresAt: number;
  readonly attempts: number;
  readonly maxAttempts: number;
}

export interface PhoneVerificationSender {
  send(input: { phone: string; code: string; expiresAt: number }): Promise<void>;
}

export class InMemoryPhoneVerificationStore {
  private readonly map = new Map<string, PhoneVerificationRecord>();

  async set(record: PhoneVerificationRecord): Promise<void> {
    this.map.set(record.userId, record);
  }
  async get(userId: string): Promise<PhoneVerificationRecord | null> {
    return this.map.get(userId) ?? null;
  }
  async delete(userId: string): Promise<void> {
    this.map.delete(userId);
  }
}

export function createPhoneVerification(
  userId: string,
  phone: string,
  ttlSeconds = 600
): PhoneVerificationRecord {
  return {
    userId,
    phone,
    code: generateNumericOtp(6),
    expiresAt: Date.now() + ttlSeconds * 1000,
    attempts: 0,
    maxAttempts: 5,
  };
}
