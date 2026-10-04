import { jest } from '@jest/globals';

import { CouponClient } from '../../../../../src/module/infrastructure/services/external/coupon.client.js';

function mockFetch(status: number, body: unknown): void {
  (global as unknown as { fetch: jest.Mock }).fetch = jest.fn(() =>
    Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      json: () => Promise.resolve(body),
    } as Response),
  ) as jest.Mock;
}

describe('CouponClient', () => {
  let originalFetch: typeof fetch;
  beforeAll(() => { originalFetch = global.fetch; });
  afterAll(() => { (global as unknown as { fetch: typeof fetch }).fetch = originalFetch; });

  it('validate returns validation response', async () => {
    mockFetch(200, { valid: true, code: 'SAVE10', discountType: 'cart_percentage', discountValue: 10 });
    const client = new CouponClient();
    const r = await client.validate({ code: 'SAVE10', subtotal: 500 });
    expect(r?.valid).toBe(true);
  });

  it('validate returns null on error', async () => {
    mockFetch(500, {});
    const client = new CouponClient();
    expect(await client.validate({ code: 'SAVE10', subtotal: 500 })).toBeNull();
  });

  it('redeem returns true on success', async () => {
    mockFetch(200, { success: true });
    const client = new CouponClient();
    expect(await client.redeem('SAVE10', 'u1', 'o1')).toBe(true);
  });

  it('redeem returns false on error', async () => {
    mockFetch(500, {});
    const client = new CouponClient();
    expect(await client.redeem('X', 'u1', 'o1')).toBe(false);
  });
});
