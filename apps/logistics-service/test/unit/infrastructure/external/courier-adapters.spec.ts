/**
 * Courier adapters — behavior when disabled + name contract + inheritance.
 */
import { describe, it, expect } from '@jest/globals';

import { PathaoCourierAdapter } from '@infrastructure/external/couriers/pathao.courier.adapter.js';
import { RedxCourierAdapter } from '@infrastructure/external/couriers/redx.courier.adapter.js';
import { SteadfastCourierAdapter } from '@infrastructure/external/couriers/steadfast.courier.adapter.js';
import { SaParibahanCourierAdapter } from '@infrastructure/external/couriers/sa-paribahan.courier.adapter.js';

const input = {
  orderId: 'ord-1',
  recipientName: 'R',
  recipientPhone: '+8801712345678',
  recipientAddress: 'Street',
  weightKg: 1,
};

describe.each([
  ['PathaoCourierAdapter', new PathaoCourierAdapter(), 'pathao'],
  ['RedxCourierAdapter', new RedxCourierAdapter(), 'redx'],
  ['SteadfastCourierAdapter', new SteadfastCourierAdapter(), 'steadfast'],
  ['SaParibahanCourierAdapter', new SaParibahanCourierAdapter(), 'sa-paribahan'],
])('%s', (name, adapter, expectedName) => {
  it('has correct name', () => {
    expect(adapter.name).toBe(expectedName);
  });

  it('createShipment returns { success, error } when disabled', async () => {
    const r = await adapter.createShipment(input);
    // Because config.enabled = false in test env
    expect(r.success).toBe(false);
    expect(r.error).toBeDefined();
  });

  it('track returns { success, error } when disabled', async () => {
    const r = await adapter.track('TRK123');
    expect(r.success).toBe(false);
    expect(r.error).toBeDefined();
  });

  it('cancel returns { success, error } when disabled', async () => {
    const r = await adapter.cancel('TRK123');
    expect(r.success).toBe(false);
    expect(r.error).toBeDefined();
  });
});

// Sa Paribahan cancel not supported → false without error path going to HTTP
describe('SaParibahanCourierAdapter — cancel not supported', () => {
  it('cancel returns success false with specific message', async () => {
    const a = new SaParibahanCourierAdapter();
    const r = await a.cancel('TRK');
    expect(r.success).toBe(false);
    expect(r.error).toMatch(/not supported|disabled/i);
  });
});
