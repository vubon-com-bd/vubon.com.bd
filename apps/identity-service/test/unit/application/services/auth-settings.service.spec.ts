import { describe, it, expect } from '@jest/globals';
import { AuthSettingsService } from '@application/services/impl/auth-settings.service.js';

describe('AuthSettingsService', () => {
  it('name', () => {
    const service = new AuthSettingsService();
    expect(service.name).toBe('AuthSettingsService');
  });

  it('get() should return defaults', async () => {
    const service = new AuthSettingsService();
    const settings = await service.get();
    expect(settings.maxLoginAttempts).toBe(5);
    expect(settings.sessionTimeoutSeconds).toBe(86400);
    expect(settings.passwordExpiryDays).toBe(90);
  });

  it('update() should merge settings', async () => {
    const service = new AuthSettingsService();
    const result = await service.update({ maxLoginAttempts: 10 } as never);
    expect(result.maxLoginAttempts).toBe(10);
  });

  it('update() should persist across calls', async () => {
    const service = new AuthSettingsService();
    await service.update({ twoFactorRequired: true } as never);
    const fetched = await service.get();
    expect(fetched.twoFactorRequired).toBe(true);
  });
});
