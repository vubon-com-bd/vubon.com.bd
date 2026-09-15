import { randomBytes } from 'node:crypto';
import { createOtp, verifyOtp } from './otp';
import type {
  VerificationRecord,
  VerificationRequest,
  VerificationServiceContract,
} from './verification.service.interface';

function generateVerificationId(): string {
  return `ver_${randomBytes(16).toString('hex')}`;
}

/**
 * Server-side email/phone verification service.
 * ⚠️ SERVER-ONLY. In-memory — replace with Redis.
 */
export class VerificationService implements VerificationServiceContract {
  private readonly store = new Map<string, VerificationRecord>();

  async start(input: VerificationRequest): Promise<{ id: string; expiresAt: number }> {
    const id = generateVerificationId();
    const { code, hash } = await createOtp(6);
    const expiresAt = Date.now() + 10 * 60 * 1000;
    this.store.set(id, {
      id,
      userId: input.userId,
      channel: input.channel,
      target: input.target,
      codeHash: hash,
      expiresAt,
      attempts: 0,
      maxAttempts: 5,
    });
    // `code` must be delivered via email/SMS — do NOT log it.
    void code;
    return { id, expiresAt };
  }

  async confirm(id: string, code: string): Promise<boolean> {
    const rec = this.store.get(id);
    if (!rec) return false;
    if (rec.expiresAt <= Date.now()) {
      this.store.delete(id);
      return false;
    }
    if (rec.attempts >= rec.maxAttempts) return false;
    const ok = await verifyOtp(code, rec.codeHash);
    if (ok) {
      this.store.delete(id);
      return true;
    }
    this.store.set(id, { ...rec, attempts: rec.attempts + 1 });
    return false;
  }
}

export const verificationService = new VerificationService();
