import { jest } from '@jest/globals';

import { TaxClient } from '../../../../../src/module/infrastructure/services/external/tax.client.js';

function mockFetch(status: number, body: unknown): void {
  (global as unknown as { fetch: jest.Mock }).fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body),
    } as Response),
  ) as jest.Mock;
}

describe('TaxClient', () => {
  let originalFetch: typeof fetch;
  beforeAll(() => { originalFetch = global.fetch; });
  afterAll(() => { (global as unknown as { fetch: typeof fetch }).fetch = originalFetch; });

  it('calculate returns tax calculation', async () => {
    mockFetch(200, { rate: 15, amount: 15, inclusive: false, currency: 'BDT' });
    const client = new TaxClient();
    const r = await client.calculate(100);
    expect(r?.rate).toBe(15);
  });

  it('calculate returns null on error', async () => {
    mockFetch(500, {});
    const client = new TaxClient();
    expect(await client.calculate(100)).toBeNull();
  });

  it('getRate returns rate number', async () => {
    mockFetch(200, { rate: 15 });
    const client = new TaxClient();
    expect(await client.getRate('BD')).toBe(15);
  });

  it('getRate returns 0 on error', async () => {
    mockFetch(500, {});
    const client = new TaxClient();
    expect(await client.getRate('XX')).toBe(0);
  });
});
