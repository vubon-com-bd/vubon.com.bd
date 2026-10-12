/**
 * Courier adapters — enabled-path tests.
 * Override `config` + `post`/`get` at runtime to simulate enabled adapter.
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

import { PathaoCourierAdapter } from '@infrastructure/external/couriers/pathao.courier.adapter.js';
import { RedxCourierAdapter } from '@infrastructure/external/couriers/redx.courier.adapter.js';
import { SteadfastCourierAdapter } from '@infrastructure/external/couriers/steadfast.courier.adapter.js';
import { SaParibahanCourierAdapter } from '@infrastructure/external/couriers/sa-paribahan.courier.adapter.js';

const INPUT = {
  orderId: 'ord-1',
  recipientName: 'Rahim',
  recipientPhone: '+8801712345678',
  recipientAddress: '12 Main St, Dhaka',
  weightKg: 1.5,
  declaredValue: 500,
};

interface AdapterInternals {
  config: { enabled: boolean; baseUrl: string; timeoutMs: number };
  retry: { attempts: number; baseDelayMs: number };
  post: jest.Mock;
  get: jest.Mock;
}

function forceEnable(adapter: unknown): AdapterInternals {
  const a = adapter as AdapterInternals;
  a.config = { enabled: true, baseUrl: 'http://test.local', timeoutMs: 200 };
  a.retry = { attempts: 1, baseDelayMs: 1 };  // no retry delay in tests
  a.post = jest.fn();
  a.get = jest.fn();
  return a;
}

// ═══ PATHAO ═══
describe('PathaoCourierAdapter — enabled', () => {
  let adapter: PathaoCourierAdapter;
  let a: AdapterInternals;

  beforeEach(() => {
    adapter = new PathaoCourierAdapter();
    a = forceEnable(adapter);
  });

  it('createShipment success (auth → create)', async () => {
    a.post
      .mockResolvedValueOnce({ access_token: 'tok', expires_in: 3600 })
      .mockResolvedValueOnce({ consignment_id: 'C1', tracking_code: 'PT-TRK-1' });
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(true);
    expect(r.consignmentId).toBe('C1');
    expect(r.trackingNumber).toBe('PT-TRK-1');
    expect(a.post).toHaveBeenCalledTimes(2);
  });

  it('createShipment auth failure', async () => {
    a.post.mockRejectedValueOnce(new Error('auth failed'));
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(false);
    expect(r.error).toContain('auth failed');
  });

  it('createShipment create API failure', async () => {
    a.post
      .mockResolvedValueOnce({ access_token: 'tok' })
      .mockRejectedValueOnce(new Error('create 500'));
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(false);
    expect(r.error).toContain('500');
  });

  it('track success', async () => {
    a.get.mockResolvedValueOnce({ order_status: 'Delivered', updated_at: '2026-05-01T10:00:00Z' });
    const r = await adapter.track('PT-TRK-1');
    expect(r.success).toBe(true);
    expect(r.status).toBe('Delivered');
    expect(r.events?.length).toBe(1);
    expect(r.events?.[0].status).toBe('Delivered');
  });

  it('track error', async () => {
    a.get.mockRejectedValueOnce(new Error('404'));
    const r = await adapter.track('PT-TRK-1');
    expect(r.success).toBe(false);
    expect(r.error).toBeDefined();
  });

  it('cancel success', async () => {
    a.post.mockResolvedValueOnce({});
    const r = await adapter.cancel('PT-TRK-1');
    expect(r.success).toBe(true);
  });

  it('cancel error', async () => {
    a.post.mockRejectedValueOnce(new Error('cancel fail'));
    const r = await adapter.cancel('PT-TRK-1');
    expect(r.success).toBe(false);
  });
});

// ═══ REDX ═══
describe('RedxCourierAdapter — enabled', () => {
  let adapter: RedxCourierAdapter;
  let a: AdapterInternals;

  beforeEach(() => {
    adapter = new RedxCourierAdapter();
    a = forceEnable(adapter);
  });

  it('createShipment success', async () => {
    a.post.mockResolvedValueOnce({ tracking_id: 'RX-1' });
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(true);
    expect(r.trackingNumber).toBe('RX-1');
  });

  it('createShipment error', async () => {
    a.post.mockRejectedValueOnce(new Error('redx 401'));
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(false);
    expect(r.error).toContain('401');
  });

  it('track success', async () => {
    a.get.mockResolvedValueOnce({ tracking_id: 'RX-1', status: 'delivered', updated_at: '2026-05-01T10:00:00Z' });
    const r = await adapter.track('RX-1');
    expect(r.success).toBe(true);
    expect(r.status).toBe('delivered');
  });

  it('track error', async () => {
    a.get.mockRejectedValueOnce(new Error('network'));
    const r = await adapter.track('RX-1');
    expect(r.success).toBe(false);
  });

  it('cancel success', async () => {
    a.post.mockResolvedValueOnce({});
    const r = await adapter.cancel('RX-1');
    expect(r.success).toBe(true);
  });

  it('cancel error', async () => {
    a.post.mockRejectedValueOnce(new Error('x'));
    const r = await adapter.cancel('RX-1');
    expect(r.success).toBe(false);
  });
});

// ═══ STEADFAST ═══
describe('SteadfastCourierAdapter — enabled', () => {
  let adapter: SteadfastCourierAdapter;
  let a: AdapterInternals;

  beforeEach(() => {
    adapter = new SteadfastCourierAdapter();
    a = forceEnable(adapter);
  });

  it('createShipment success', async () => {
    a.post.mockResolvedValueOnce({
      consignment: { tracking_code: 'SF-TRK-1', consignment_id: 42 },
    });
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(true);
    expect(r.consignmentId).toBe('42');
    expect(r.trackingNumber).toBe('SF-TRK-1');
  });

  it('createShipment error', async () => {
    a.post.mockRejectedValueOnce(new Error('429 rate limit'));
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(false);
    expect(r.error).toContain('429');
  });

  it('track success (updated_at undefined branch)', async () => {
    a.get.mockResolvedValueOnce({ delivery_status: 'delivered', tracking_code: 'SF-TRK-1' });
    const r = await adapter.track('SF-TRK-1');
    expect(r.success).toBe(true);
    expect(r.status).toBe('delivered');
  });

  it('track success (updated_at provided)', async () => {
    a.get.mockResolvedValueOnce({
      delivery_status: 'in_review', tracking_code: 'SF-TRK-1',
      updated_at: '2026-05-01T10:00:00Z',
    });
    const r = await adapter.track('SF-TRK-1');
    expect(r.success).toBe(true);
    expect(r.events?.[0].timestamp).toBe('2026-05-01T10:00:00Z');
  });

  it('track error', async () => {
    a.get.mockRejectedValueOnce(new Error('x'));
    const r = await adapter.track('SF-TRK-1');
    expect(r.success).toBe(false);
  });

  it('cancel success', async () => {
    a.post.mockResolvedValueOnce({});
    const r = await adapter.cancel('SF-TRK-1');
    expect(r.success).toBe(true);
  });

  it('cancel error', async () => {
    a.post.mockRejectedValueOnce(new Error('x'));
    const r = await adapter.cancel('SF-TRK-1');
    expect(r.success).toBe(false);
  });
});

// ═══ SA PARIBAHAN ═══
describe('SaParibahanCourierAdapter — enabled', () => {
  let adapter: SaParibahanCourierAdapter;
  let a: AdapterInternals;

  beforeEach(() => {
    adapter = new SaParibahanCourierAdapter();
    a = forceEnable(adapter);
  });

  it('createShipment success (both fields)', async () => {
    a.post.mockResolvedValueOnce({ tracking_number: 'SP-1', consignment_id: 'C9' });
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(true);
    expect(r.trackingNumber).toBe('SP-1');
    expect(r.consignmentId).toBe('C9');
  });

  it('createShipment success (partial fields)', async () => {
    a.post.mockResolvedValueOnce({});
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(true);
    expect(r.trackingNumber).toBeUndefined();
  });

  it('createShipment error', async () => {
    a.post.mockRejectedValueOnce(new Error('URL parse failed'));
    const r = await adapter.createShipment(INPUT);
    expect(r.success).toBe(false);
  });

  it('track success', async () => {
    a.get.mockResolvedValueOnce({ status: 'in_transit', updated_at: '2026-05-01T10:00:00Z' });
    const r = await adapter.track('SP-1');
    expect(r.success).toBe(true);
    expect(r.status).toBe('in_transit');
  });

  it('track error', async () => {
    a.get.mockRejectedValueOnce(new Error('x'));
    const r = await adapter.track('SP-1');
    expect(r.success).toBe(false);
  });

  it('cancel always returns not supported', async () => {
    const r = await adapter.cancel('SP-1');
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/not supported|disabled/i);
  });
});
