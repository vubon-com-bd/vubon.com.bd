/**
 * E2E shared fixtures + helpers
 * @module identity-service/test/e2e/setup
 */
export const E2E_IDS = {
  AUTH: '11111111-1111-4111-8111-111111111111',
  AUTH_2: '11111111-1111-4111-8111-222222222222',
  SESSION: '22222222-2222-4222-8222-222222222222',
  SESSION_2: '22222222-2222-4222-8222-333333333333',
  TOKEN: '33333333-3333-4333-8333-333333333333',
  TOKEN_2: '33333333-3333-4333-8333-444444444444',
  DEVICE: '44444444-4444-4444-8444-444444444444',
  DEVICE_2: '44444444-4444-4444-8444-555555555555',
  MFA: '55555555-5555-4555-8555-555555555555',
  VERIFICATION: '66666666-6666-4666-8666-666666666666',
  USER: '77777777-7777-4777-8777-777777777777',
  ROLE: '88888888-8888-4888-8888-888888888888',
  LOCK: '99999999-9999-4999-8999-999999999999',
} as const;

export const E2E_CONSTANTS = {
  EMAIL: 'e2e.test@vubon.com.bd',
  EMAIL_2: 'e2e.other@vubon.com.bd',
  PHONE: '+8801712345678',
  PASSWORD: 'TestPass@1234',
  PASSWORD_HASH: '$2b$12$' + 'a'.repeat(53),
  PASSWORD_HASH_2: '$2b$12$' + 'b'.repeat(53),
  MFA_SECRET: 'JBSWY3DPEHPK3PXP',
  OTP: '123456',
  BACKUP_CODE: 'ABCD1234EF',
  IP: '192.168.1.100',
  USER_AGENT: 'Mozilla/5.0 (E2E Test)',
  FINGERPRINT: 'fp-e2e-fingerprint-abcdef123456',
  ACCESS_TOKEN: 'e2e-access-token-' + 'x'.repeat(50),
  REFRESH_TOKEN: 'e2e-refresh-token-' + 'y'.repeat(50),
  JTI: 'jti-e2e-1234567890abcdef',
} as const;

const NOW = Date.now();
export const E2E_DATES = {
  NOW: new Date(NOW).toISOString(),
  NOW_MS: NOW,
  PAST: new Date(NOW - 86400000).toISOString(),
  PAST_EPOCH: Math.floor((NOW - 86400000) / 1000),
  FUTURE: new Date(NOW + 3600000).toISOString(),
  FUTURE_EPOCH: Math.floor((NOW + 3600000) / 1000),
  FAR_FUTURE: new Date(NOW + 7 * 86400000).toISOString(),
  FAR_FUTURE_EPOCH: Math.floor((NOW + 7 * 86400000) / 1000),
} as const;

/**
 * In-memory map (simulates event bus across aggregates)
 */
export class E2EEventCollector {
  private events: Array<{ type: string; aggregateId: string; payload: unknown }> = [];

  record(type: string, aggregateId: string, payload: unknown): void {
    this.events.push({ type, aggregateId, payload });
  }

  getAll(): readonly { type: string; aggregateId: string; payload: unknown }[] {
    return [...this.events];
  }

  getByType(type: string): readonly { type: string; aggregateId: string; payload: unknown }[] {
    return this.events.filter((e) => e.type === type);
  }

  countByType(type: string): number {
    return this.getByType(type).length;
  }

  clear(): void {
    this.events = [];
  }
}
