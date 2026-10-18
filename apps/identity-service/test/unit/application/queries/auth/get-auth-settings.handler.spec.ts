import { describe, it, expect, beforeEach } from '@jest/globals';
import { GetAuthSettingsHandler } from '@application/queries/auth/get-auth-settings.handler.js';
import { GetAuthSettingsQuery } from '@application/queries/auth/get-auth-settings.query.js';
import { makeAuthSettingsServiceMock } from '@fixtures/index.js';

describe('GetAuthSettingsHandler', () => {
  let handler: GetAuthSettingsHandler;
  let service: ReturnType<typeof makeAuthSettingsServiceMock>;

  beforeEach(() => {
    service = makeAuthSettingsServiceMock();
    handler = new GetAuthSettingsHandler(service as never);
  });

  it('queryType = auth.get-settings', () => {
    expect(handler.queryType).toBe('auth.get-settings');
  });

  it('should return settings', async () => {
    service.get.mockResolvedValue({ twoFactorRequired: false } as never);
    const result = await handler.execute(new GetAuthSettingsQuery());
    expect(result.twoFactorRequired).toBe(false);
  });
});
