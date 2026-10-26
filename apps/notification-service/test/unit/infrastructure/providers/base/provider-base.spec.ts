/**
 * Provider Base — Unit Tests
 * @module notification-service/test/unit/infrastructure/providers/base
 *
 * Covers: BaseProvider abstract + provider errors
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import { BaseProvider } from '@infrastructure/providers/base/provider.abstract.js';
import {
  ProviderNotConfiguredError,
  ProviderNotAvailableError,
  ProviderSendFailedError,
  ProviderAuthError,
  ProviderRateLimitError,
} from '@infrastructure/providers/base/provider.errors.js';

// ═══════════════════════════════════════════════════════════
// 1. BaseProvider — test via concrete subclass
// ═══════════════════════════════════════════════════════════
class TestProvider extends BaseProvider {
  constructor(enabled = true) {
    super({
      name: 'test',
      channel: 'email' as const,
      version: '1.0.0',
      priority: 1,
    });
    this._enabled = enabled;
  }

  private _enabled: boolean;

  isEnabled(): boolean {
    return this._enabled;
  }

  // Expose protected methods for testing
  public _notConfigured() {
    return this.notConfigured();
  }
  public _notEnabled() {
    return this.notEnabled();
  }
  public _notImplemented(op: string) {
    return this.notImplemented(op);
  }
  public _mask(s: string, visible?: number) {
    return this.mask(s, visible);
  }
}

class HealthFailProvider extends BaseProvider {
  constructor() {
    super({
      name: 'failing',
      channel: 'sms' as const,
      version: '1.0.0',
      priority: 2,
    });
  }

  isEnabled(): boolean {
    throw new Error('config-load-failed');
  }
}

// ═══════════════════════════════════════════════════════════
// 2. BaseProvider basics
// ═══════════════════════════════════════════════════════════
describe('BaseProvider', () => {
  it('metadata — set correctly', () => {
    const p = new TestProvider();
    expect(p.metadata.name).toBe('test');
    expect(p.metadata.channel).toBe('email');
    expect(p.metadata.version).toBe('1.0.0');
    expect(p.metadata.priority).toBe(1);
  });

  it('isEnabled — true when enabled', () => {
    const p = new TestProvider(true);
    expect(p.isEnabled()).toBe(true);
  });

  it('isEnabled — false when disabled', () => {
    const p = new TestProvider(false);
    expect(p.isEnabled()).toBe(false);
  });

  it('isAvailable — true when enabled + healthy', async () => {
    const p = new TestProvider(true);
    expect(await p.isAvailable()).toBe(true);
  });

  it('isAvailable — false when disabled', async () => {
    const p = new TestProvider(false);
    expect(await p.isAvailable()).toBe(false);
  });

  it('isAvailable — throws when isEnabled throws (base does not catch isEnabled)', async () => {
    const p = new HealthFailProvider();
    await expect(p.isAvailable()).rejects.toThrow('config-load-failed');
  });

  it('health — healthy when enabled', async () => {
    const p = new TestProvider(true);
    const health = await p.health();
    expect(health.providerName).toBe('test');
    expect(health.state).toBe('healthy');
    expect(health.checkedAt).toBeDefined();
    expect(health.latencyMs).toBeDefined();
  });

  it('health — unavailable when disabled', async () => {
    const p = new TestProvider(false);
    const health = await p.health();
    expect(health.state).toBe('unavailable');
  });

  it('health — unavailable when isEnabled throws', async () => {
    const p = new HealthFailProvider();
    const health = await p.health();
    expect(health.state).toBe('unavailable');
    expect(health.error).toContain('config-load-failed');
  });

  // ═══════════════ Protected helpers ═══════════════
  it('notConfigured — returns proper shape', () => {
    const p = new TestProvider();
    const result = p._notConfigured();
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('NOT_CONFIGURED');
    expect(result.error).toContain('test');
  });

  it('notEnabled — returns proper shape', () => {
    const p = new TestProvider();
    const result = p._notEnabled();
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('DISABLED');
  });

  it('notImplemented — returns proper shape', () => {
    const p = new TestProvider();
    const result = p._notImplemented('verify');
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('NOT_IMPLEMENTED');
    expect(result.error).toContain('verify');
  });

  // ═══════════════ Masking ═══════════════
  it('mask — masks long strings', () => {
    const p = new TestProvider();
    expect(p._mask('1234567890')).toBe('******7890');
  });

  it('mask — returns short strings unchanged', () => {
    const p = new TestProvider();
    expect(p._mask('abc')).toBe('abc');
  });

  it('mask — custom visible length', () => {
    const p = new TestProvider();
    expect(p._mask('1234567890', 2)).toBe('********90');
  });
});

// ═══════════════════════════════════════════════════════════
// 3. ProviderNotConfiguredError
// ═══════════════════════════════════════════════════════════
describe('ProviderNotConfiguredError', () => {
  it('creates error with correct fields', () => {
    const err = new ProviderNotConfiguredError('sendgrid', 'email');
    expect(err.name).toBe('ProviderNotConfiguredError');
    expect(err.httpStatus).toBe(503);
    expect(err.message).toContain('sendgrid');
    expect(err.message).toContain('email');
  });

  it('includes context', () => {
    const err = new ProviderNotConfiguredError('fcm', 'push');
    expect(err.context).toMatchObject({ provider: 'fcm', channel: 'push' });
  });
});

// ═══════════════════════════════════════════════════════════
// 4. ProviderNotAvailableError
// ═══════════════════════════════════════════════════════════
describe('ProviderNotAvailableError', () => {
  it('creates error with reason', () => {
    const err = new ProviderNotAvailableError('twilio', 'network down');
    expect(err.name).toBe('ProviderNotAvailableError');
    expect(err.httpStatus).toBe(503);
    expect(err.message).toContain('twilio');
    expect(err.message).toContain('network down');
  });

  it('creates error without reason', () => {
    const err = new ProviderNotAvailableError('smtp');
    expect(err.message).toContain('smtp');
    expect(err.context).toMatchObject({ provider: 'smtp' });
  });
});

// ═══════════════════════════════════════════════════════════
// 5. ProviderSendFailedError
// ═══════════════════════════════════════════════════════════
describe('ProviderSendFailedError', () => {
  it('creates error with reason', () => {
    const err = new ProviderSendFailedError('mailgun', 'HTTP 500', true);
    expect(err.name).toBe('ProviderSendFailedError');
    expect(err.httpStatus).toBe(502);
    expect(err.message).toContain('mailgun');
    expect(err.message).toContain('HTTP 500');
    expect(err.context).toMatchObject({ retryable: true });
  });

  it('creates non-retryable error', () => {
    const err = new ProviderSendFailedError('ses', 'invalid', false);
    expect(err.context).toMatchObject({ retryable: false });
  });
});

// ═══════════════════════════════════════════════════════════
// 6. ProviderAuthError
// ═══════════════════════════════════════════════════════════
describe('ProviderAuthError', () => {
  it('creates error', () => {
    const err = new ProviderAuthError('sendgrid');
    expect(err.name).toBe('ProviderAuthError');
    expect(err.httpStatus).toBe(401);
    expect(err.message).toContain('sendgrid');
  });
});

// ═══════════════════════════════════════════════════════════
// 7. ProviderRateLimitError
// ═══════════════════════════════════════════════════════════
describe('ProviderRateLimitError', () => {
  it('creates error with retryAfterMs', () => {
    const err = new ProviderRateLimitError('twilio', 5000);
    expect(err.name).toBe('ProviderRateLimitError');
    expect(err.httpStatus).toBe(429);
    expect(err.message).toContain('twilio');
    expect(err.message).toContain('5000');
    expect(err.context).toMatchObject({ retryAfterMs: 5000 });
  });

  it('creates error without retryAfterMs', () => {
    const err = new ProviderRateLimitError('fcm');
    expect(err.message).toContain('fcm');
    expect(err.context).toMatchObject({ provider: 'fcm' });
  });
});
