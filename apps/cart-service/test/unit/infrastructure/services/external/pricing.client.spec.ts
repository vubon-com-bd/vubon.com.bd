import { jest } from '@jest/globals';

import { PricingClient } from '../../../../../src/module/infrastructure/services/external/pricing.client.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function mockFetch(status: number, body: unknown): void {
  (global as unknown as { fetch: jest.Mock }).fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body),
    } as Response),
  ) as jest.Mock;
}

describe('PricingClient', () => {
  let originalFetch: typeof fetch;
  beforeAll(() => { originalFetch = global.fetch; });
  afterAll(() => { (global as unknown as { fetch: typeof fetch }).fetch = originalFetch; });

  it('getPrice returns price snapshot', async () => {
    mockFetch(200, { productId: UUID, price: 100, currency: 'BDT' });
    const client = new PricingClient();
    const r = await client.getPrice(UUID);
    expect(r?.price).toBe(100);
  });

  it('getPrice returns null on error', async () => {
    mockFetch(500, {});
    const client = new PricingClient();
    expect(await client.getPrice(UUID)).toBeNull();
  });

  it('getPrices returns empty for empty input', async () => {
    const client = new PricingClient();
    expect(await client.getPrices([])).toEqual([]);
  });

  it('getPrices returns array on success', async () => {
    mockFetch(200, [{ productId: UUID, price: 100, currency: 'BDT' }]);
    const client = new PricingClient();
    const r = await client.getPrices([{ productId: UUID }]);
    expect(r.length).toBe(1);
  });

  it('getPrices returns [] on error', async () => {
    mockFetch(500, {});
    const client = new PricingClient();
    expect(await client.getPrices([{ productId: UUID }])).toEqual([]);
  });
});
