import { jest } from '@jest/globals';

import { ShippingClient } from '../../../../../src/module/infrastructure/services/external/shipping.client.js';

function mockFetch(status: number, body: unknown): void {
  (global as unknown as { fetch: jest.Mock }).fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body),
    } as Response),
  ) as jest.Mock;
}

describe('ShippingClient', () => {
  let originalFetch: typeof fetch;
  beforeAll(() => { originalFetch = global.fetch; });
  afterAll(() => { (global as unknown as { fetch: typeof fetch }).fetch = originalFetch; });

  it('quote returns shipping quote', async () => {
    mockFetch(200, { method: 'standard', cost: 100, currency: 'BDT', estimatedDaysMin: 3, estimatedDaysMax: 7 });
    const client = new ShippingClient();
    const r = await client.quote({ method: 'standard', subtotal: 500 });
    expect(r?.cost).toBe(100);
  });

  it('quote returns null on error', async () => {
    mockFetch(500, {});
    const client = new ShippingClient();
    expect(await client.quote({ method: 'standard', subtotal: 500 })).toBeNull();
  });

  it('listMethods returns array', async () => {
    mockFetch(200, [{ method: 'standard', cost: 100, currency: 'BDT', estimatedDaysMin: 3, estimatedDaysMax: 7 }]);
    const client = new ShippingClient();
    const r = await client.listMethods();
    expect(r.length).toBe(1);
  });

  it('listMethods returns [] on error', async () => {
    mockFetch(500, {});
    const client = new ShippingClient();
    expect(await client.listMethods()).toEqual([]);
  });
});
