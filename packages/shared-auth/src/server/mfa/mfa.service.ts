import { InMemoryEmailMfaStore, createEmailOtp, type EmailMfaStore } from './email-mfa';
import { generateRecoveryCodes } from './recovery-code';
import { InMemorySmsMfaStore, createSmsOtp, type SmsMfaStore } from './sms-mfa';
import { buildTotpUri, generateTotpSecret, verifyTotp } from './totp';
import type {
  MfaMethod,
  MfaServiceContract,
  MfaSetupResult,
  MfaVerifyResult,
} from './service.interface';

/**
 * Server-side MFA service.
 * ⚠️ SERVER-ONLY.
 * Backed by in-memory stores for SMS/email — replace with Redis.
 */
export class MfaService implements MfaServiceContract {
  private readonly totpSecrets = new Map<string, string>();
  private readonly enabled = new Map<string, Set<MfaMethod>>();
  private readonly smsStore: SmsMfaStore;
  private readonly emailStore: EmailMfaStore;

  constructor(
    options: {
      smsStore?: SmsMfaStore;
      emailStore?: EmailMfaStore;
    } = {}
  ) {
    this.smsStore = options.smsStore ?? new InMemorySmsMfaStore();
    this.emailStore = options.emailStore ?? new InMemoryEmailMfaStore();
  }

  async setup(userId: string, method: MfaMethod): Promise<MfaSetupResult> {
    if (method === 'totp') {
      const secret = generateTotpSecret();
      this.totpSecrets.set(userId, secret);
      return {
        method,
        secret,
        qrCodeUrl: buildTotpUri(secret, userId, 'Vubon'),
        recoveryCodes: generateRecoveryCodes(8),
      };
    }
    if (method === 'sms') {
      const rec = createSmsOtp(userId, '');
      await this.smsStore.set(rec);
      return { method };
    }
    if (method === 'email') {
      const rec = createEmailOtp(userId, '');
      await this.emailStore.set(rec);
      return { method };
    }
    if (method === 'recovery') {
      return { method, recoveryCodes: generateRecoveryCodes(8) };
    }
    return { method };
  }

  async verify(userId: string, code: string, method: MfaMethod): Promise<MfaVerifyResult> {
    if (method === 'totp') {
      const secret = this.totpSecrets.get(userId);
      if (!secret) return { verified: false, method, error: 'no-secret' };
      const ok = verifyTotp(secret, code);
      if (ok) this.markEnabled(userId, 'totp');
      return { verified: ok, method };
    }
    if (method === 'sms') {
      const rec = await this.smsStore.get(userId);
      if (!rec) return { verified: false, method, error: 'not-found' };
      if (rec.expiresAt <= Date.now()) {
        await this.smsStore.delete(userId);
        return { verified: false, method, error: 'expired' };
      }
      if (rec.attempts >= rec.maxAttempts) {
        return { verified: false, method, error: 'too-many-attempts' };
      }
      if (rec.code === code) {
        await this.smsStore.delete(userId);
        this.markEnabled(userId, 'sms');
        return { verified: true, method };
      }
      await this.smsStore.set({ ...rec, attempts: rec.attempts + 1 });
      return { verified: false, method, error: 'invalid' };
    }
    if (method === 'email') {
      const rec = await this.emailStore.get(userId);
      if (!rec) return { verified: false, method, error: 'not-found' };
      if (rec.expiresAt <= Date.now()) {
        await this.emailStore.delete(userId);
        return { verified: false, method, error: 'expired' };
      }
      if (rec.code === code) {
        await this.emailStore.delete(userId);
        this.markEnabled(userId, 'email');
        return { verified: true, method };
      }
      await this.emailStore.set({ ...rec, attempts: rec.attempts + 1 });
      return { verified: false, method, error: 'invalid' };
    }
    return { verified: false, method, error: 'unsupported' };
  }

  async disable(userId: string, method: MfaMethod): Promise<void> {
    this.enabled.get(userId)?.delete(method);
    if (method === 'totp') this.totpSecrets.delete(userId);
    if (method === 'sms') await this.smsStore.delete(userId);
    if (method === 'email') await this.emailStore.delete(userId);
  }

  async getEnabledMethods(userId: string): Promise<readonly MfaMethod[]> {
    return [...(this.enabled.get(userId) ?? [])];
  }

  private markEnabled(userId: string, method: MfaMethod): void {
    const set = this.enabled.get(userId) ?? new Set<MfaMethod>();
    set.add(method);
    this.enabled.set(userId, set);
  }
}

export const mfaService = new MfaService();
