import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { UserClient } from '@infrastructure/services/external/user.client';

describe('UserClient', () => {
  let client: UserClient;
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    client = new UserClient();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('getById returns user DTO', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'user-1', name: 'John' }),
    } as Response);

    const result = await client.getById('user-1');
    expect(result?.id).toBe('user-1');
    expect(result?.name).toBe('John');
  });

  it('getById returns null on 404', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    expect(await client.getById('missing')).toBeNull();
  });

  it('getById returns null on network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('timeout'));
    expect(await client.getById('user-1')).toBeNull();
  });

  it('isHealthy returns true on 200', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true } as Response);
    expect(await client.isHealthy()).toBe(true);
  });

  it('isHealthy returns false on error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('down'));
    expect(await client.isHealthy()).toBe(false);
  });
});
