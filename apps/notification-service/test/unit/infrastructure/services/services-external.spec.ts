/**
 * External Service Clients — Unit Tests
 * @module notification-service/test/unit/infrastructure/services
 *
 * Covers: 6 external HTTP clients (user, order, product, vendor, payment, analytics)
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import { UserClient } from '@infrastructure/services/external/user.client.js';
import { OrderClient } from '@infrastructure/services/external/order.client.js';
import { ProductClient } from '@infrastructure/services/external/product.client.js';
import { VendorClient } from '@infrastructure/services/external/vendor.client.js';
import { PaymentClient } from '@infrastructure/services/external/payment.client.js';
import { AnalyticsClient } from '@infrastructure/services/external/analytics.client.js';

// ═══════════════════════════════════════════════════════════
// Shared fetch mock helper
// ═══════════════════════════════════════════════════════════
const originalFetch = global.fetch;

function mockFetchOnce(
  status: number,
  body: unknown,
  ok = status >= 200 && status < 300,
): void {
  global.fetch = jest.fn(async () => ({
    ok,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  })) as never;
}

function mockFetchReject(error: Error): void {
  global.fetch = jest.fn(async () => {
    throw error;
  }) as never;
}

afterEach(() => {
  global.fetch = originalFetch;
});

// ═══════════════════════════════════════════════════════════
// 1. UserClient
// ═══════════════════════════════════════════════════════════
describe('UserClient', () => {
  let client: UserClient;

  beforeEach(() => {
    client = new UserClient();
  });

  it('getById — success', async () => {
    const profile = { id: 'u-1', email: 'a@b.com', isActive: true };
    mockFetchOnce(200, profile);
    const result = await client.getById('u-1');
    expect(result?.id).toBe('u-1');
  });

  it('getById — 404 returns null', async () => {
    mockFetchOnce(404, {}, false);
    expect(await client.getById('u-1')).toBeNull();
  });

  it('getById — 500 returns null (graceful)', async () => {
    mockFetchOnce(500, {}, false);
    expect(await client.getById('u-1')).toBeNull();
  });

  it('getById — network error returns null', async () => {
    mockFetchReject(new Error('network down'));
    expect(await client.getById('u-1')).toBeNull();
  });

  it('getByIds — empty array returns []', async () => {
    expect(await client.getByIds([])).toEqual([]);
  });

  it('getByIds — success', async () => {
    mockFetchOnce(200, [{ id: 'u-1', isActive: true }]);
    const result = await client.getByIds(['u-1']);
    expect(result.length).toBe(1);
  });

  it('getByIds — non-ok returns []', async () => {
    mockFetchOnce(500, {}, false);
    expect(await client.getByIds(['u-1'])).toEqual([]);
  });

  it('getByIds — network error returns []', async () => {
    mockFetchReject(new Error('down'));
    expect(await client.getByIds(['u-1'])).toEqual([]);
  });

  it('isHealthy — true', async () => {
    mockFetchOnce(200, {});
    expect(await client.isHealthy()).toBe(true);
  });

  it('isHealthy — false on error', async () => {
    mockFetchReject(new Error('down'));
    expect(await client.isHealthy()).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// 2. OrderClient
// ═══════════════════════════════════════════════════════════
describe('OrderClient', () => {
  let client: OrderClient;

  beforeEach(() => {
    client = new OrderClient();
  });

  it('getById — success', async () => {
    mockFetchOnce(200, { id: 'o-1', userId: 'u-1', total: 100 });
    expect((await client.getById('o-1'))?.id).toBe('o-1');
  });

  it('getById — 404 returns null', async () => {
    mockFetchOnce(404, {}, false);
    expect(await client.getById('o-1')).toBeNull();
  });

  it('getById — network error returns null', async () => {
    mockFetchReject(new Error('down'));
    expect(await client.getById('o-1')).toBeNull();
  });

  it('isHealthy — true', async () => {
    mockFetchOnce(200, {});
    expect(await client.isHealthy()).toBe(true);
  });

  it('isHealthy — false on error', async () => {
    mockFetchReject(new Error('down'));
    expect(await client.isHealthy()).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// 3. ProductClient
// ═══════════════════════════════════════════════════════════
describe('ProductClient', () => {
  let client: ProductClient;

  beforeEach(() => {
    client = new ProductClient();
  });

  it('getById — success', async () => {
    mockFetchOnce(200, { id: 'p-1', name: 'Product' });
    expect((await client.getById('p-1'))?.id).toBe('p-1');
  });

  it('getById — 404 returns null', async () => {
    mockFetchOnce(404, {}, false);
    expect(await client.getById('p-1')).toBeNull();
  });

  it('getById — network error returns null', async () => {
    mockFetchReject(new Error('down'));
    expect(await client.getById('p-1')).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════
// 4. VendorClient
// ═══════════════════════════════════════════════════════════
describe('VendorClient', () => {
  let client: VendorClient;

  beforeEach(() => {
    client = new VendorClient();
  });

  it('getById — success', async () => {
    mockFetchOnce(200, { id: 'v-1', name: 'Vendor' });
    expect((await client.getById('v-1'))?.id).toBe('v-1');
  });

  it('getById — 404 returns null', async () => {
    mockFetchOnce(404, {}, false);
    expect(await client.getById('v-1')).toBeNull();
  });

  it('getById — network error returns null', async () => {
    mockFetchReject(new Error('down'));
    expect(await client.getById('v-1')).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════
// 5. PaymentClient
// ═══════════════════════════════════════════════════════════
describe('PaymentClient', () => {
  let client: PaymentClient;

  beforeEach(() => {
    client = new PaymentClient();
  });

  it('getById — success', async () => {
    mockFetchOnce(200, { id: 'pay-1', amount: 500, currency: 'BDT' });
    expect((await client.getById('pay-1'))?.id).toBe('pay-1');
  });

  it('getById — 404 returns null', async () => {
    mockFetchOnce(404, {}, false);
    expect(await client.getById('pay-1')).toBeNull();
  });

  it('getById — network error returns null', async () => {
    mockFetchReject(new Error('down'));
    expect(await client.getById('pay-1')).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════
// 6. AnalyticsClient
// ═══════════════════════════════════════════════════════════
describe('AnalyticsClient', () => {
  let client: AnalyticsClient;

  beforeEach(() => {
    client = new AnalyticsClient();
  });

  it('track — success (fire-and-forget)', async () => {
    mockFetchOnce(200, {});
    await expect(
      client.track({
        name: 'notification.sent',
        entityId: 'n-1',
        occurredAt: '2026-01-15T00:00:00.000Z',
      }),
    ).resolves.not.toThrow();
  });

  it('track — network error swallowed', async () => {
    mockFetchReject(new Error('down'));
    await expect(
      client.track({
        name: 'notification.sent',
        entityId: 'n-1',
        occurredAt: '2026-01-15T00:00:00.000Z',
      }),
    ).resolves.not.toThrow();
  });

  it('trackBatch — empty events no-op', async () => {
    await expect(client.trackBatch([])).resolves.not.toThrow();
  });

  it('trackBatch — success', async () => {
    mockFetchOnce(200, {});
    await expect(
      client.trackBatch([
        { name: 'a', entityId: 'e-1', occurredAt: '2026-01-01T00:00:00.000Z' },
      ]),
    ).resolves.not.toThrow();
  });

  it('trackBatch — network error swallowed', async () => {
    mockFetchReject(new Error('down'));
    await expect(
      client.trackBatch([
        { name: 'a', entityId: 'e-1', occurredAt: '2026-01-01T00:00:00.000Z' },
      ]),
    ).resolves.not.toThrow();
  });
});

// ═══════════════════════════════════════════════════════════
// BRANCH BOOST — Additional paths
// ═══════════════════════════════════════════════════════════
describe('External Clients — extra branch paths', () => {
  it('UserClient.getByIds — multi-user success', async () => {
    const client = new UserClient();
    mockFetchOnce(200, [
      { id: 'u-1', isActive: true },
      { id: 'u-2', isActive: false },
    ]);
    const result = await client.getByIds(['u-1', 'u-2']);
    expect(result.length).toBe(2);
  });

  it('UserClient.getById — text response error handled', async () => {
    const client = new UserClient();
    global.fetch = jest.fn(async () => ({
      ok: false,
      status: 500,
      json: async () => ({}),
      text: async () => 'error text',
    })) as never;
    expect(await client.getById('u-1')).toBeNull();
  });

  it('AnalyticsClient.track — success with properties', async () => {
    const client = new AnalyticsClient();
    mockFetchOnce(200, {});
    await client.track({
      name: 'test.event',
      userId: 'u-1',
      entityId: 'e-1',
      properties: { foo: 'bar' },
      occurredAt: '2026-01-01T00:00:00.000Z',
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('AnalyticsClient.trackBatch — multiple events', async () => {
    const client = new AnalyticsClient();
    mockFetchOnce(200, {});
    await client.trackBatch([
      { name: 'a', entityId: 'e-1', occurredAt: '2026-01-01T00:00:00.000Z' },
      { name: 'b', entityId: 'e-2', occurredAt: '2026-01-01T00:00:00.000Z' },
    ]);
    expect(global.fetch).toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════
// BRANCH — Extra external service paths
// ═══════════════════════════════════════════════════════════
describe('External clients — extra branches', () => {
  it('OrderClient.isHealthy — non-200', async () => {
    const client = new OrderClient();
    mockFetchOnce(500, {}, false);
    expect(await client.isHealthy()).toBe(false);
  });

  it('ProductClient.getById — 500', async () => {
    const client = new ProductClient();
    mockFetchOnce(500, {}, false);
    expect(await client.getById('p')).toBeNull();
  });

  it('VendorClient.getById — network error', async () => {
    const client = new VendorClient();
    mockFetchReject(new Error('down'));
    expect(await client.getById('v')).toBeNull();
  });

  it('PaymentClient.getById — 404', async () => {
    const client = new PaymentClient();
    mockFetchOnce(404, {}, false);
    expect(await client.getById('pay')).toBeNull();
  });

  it('AnalyticsClient — track multiple', async () => {
    const client = new AnalyticsClient();
    mockFetchOnce(200, {});
    await client.track({ name: 'a', entityId: 'e', occurredAt: '2026-01-01' });
    await client.track({ name: 'b', entityId: 'e', occurredAt: '2026-01-01' });
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
