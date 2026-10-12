/**
 * Extra branch tests for composite VOs at 52-59% coverage.
 */
import { describe, it, expect } from '@jest/globals';

import { CourierConfigVO } from '@domain/value-objects/composites/courier-config.vo.js';
import { PackageRefVO } from '@domain/value-objects/composites/package-ref.vo.js';
import { RouteStopVO } from '@domain/value-objects/composites/route-stop.vo.js';
import { DistanceSurchargeVO } from '@domain/value-objects/primitives/distance-surcharge.vo.js';

// ═══ CourierConfig extra branches (52%) ═══
describe('CourierConfigVO — extra branches', () => {
  const base = {
    baseUrl: 'https://api.example.com',
    apiKeyName: 'K',
    timeoutMs: 30000,
    retryAttempts: 3,
    isEnabled: true,
  };
  it('no webhook → hasWebhook false', () => {
    expect(CourierConfigVO.create(base).hasWebhook()).toBe(false);
  });
  it('webhook present → true', () => {
    expect(CourierConfigVO.create({ ...base, webhookSecretName: 'W' }).hasWebhook()).toBe(true);
  });
  it('canRetry boundaries', () => {
    const c = CourierConfigVO.create({ ...base, retryAttempts: 3 });
    expect(c.canRetry(0)).toBe(true);
    expect(c.canRetry(2)).toBe(true);
    expect(c.canRetry(3)).toBe(false);
  });
  it('disabled → canRetry false', () => {
    const c = CourierConfigVO.create({ ...base, isEnabled: false });
    expect(c.canRetry(0)).toBe(false);
  });
  it('http url accepted', () => {
    expect(CourierConfigVO.create({ ...base, baseUrl: 'http://localhost:3000' }).baseUrl).toBe('http://localhost:3000');
  });
  it('rejects empty apiKeyName', () => {
    expect(() => CourierConfigVO.create({ ...base, apiKeyName: '' })).toThrow();
  });
  it('rejects retryAttempts > 10', () => {
    expect(() => CourierConfigVO.create({ ...base, retryAttempts: 11 })).toThrow();
  });
  it('rejects retryAttempts < 0', () => {
    expect(() => CourierConfigVO.create({ ...base, retryAttempts: -1 })).toThrow();
  });
  it('reconstitute works', () => {
    const c = CourierConfigVO.reconstitute(base as never);
    expect(c.baseUrl).toBe('https://api.example.com');
  });
});

// ═══ PackageRef extra (57%) ═══
describe('PackageRefVO — extra branches', () => {
  it('hasVariant true', () => {
    const p = PackageRefVO.create({ orderItemId: 'oi', quantity: 1, variantId: 'v1' });
    expect(p.hasVariant()).toBe(true);
  });
  it('all fields set', () => {
    const p = PackageRefVO.create({
      orderItemId: 'oi', quantity: 3, productId: 'p', variantId: 'v', sku: 'SKU', name: 'Item',
    });
    expect(p.sku).toBe('SKU');
    expect(p.name).toBe('Item');
    expect(p.productId).toBe('p');
  });
  it('reconstitute', () => {
    const p = PackageRefVO.reconstitute({ orderItemId: 'oi', quantity: 1 });
    expect(p.quantity).toBe(1);
  });
  it('rejects negative qty', () => {
    expect(() => PackageRefVO.create({ orderItemId: 'oi', quantity: -1 })).toThrow();
  });
});

// ═══ RouteStop extra (59%) ═══
describe('RouteStopVO — extra branches', () => {
  const validBase = {
    id: 's1', order: 0, location: 'A', address: 'Some Street', shipmentIds: ['sh1'], completed: false,
  };
  it('no geo → hasGeo false', () => {
    expect(RouteStopVO.create(validBase).hasGeo()).toBe(false);
  });
  it('isLate false when no actual arrival', () => {
    const s = RouteStopVO.create({ ...validBase, estimatedArrivalAt: '2026-01-01T10:00:00Z' });
    expect(s.isLate()).toBe(false);
  });
  it('rejects empty address', () => {
    expect(() => RouteStopVO.create({ ...validBase, address: 'ab' })).toThrow();
  });
  it('rejects negative order', () => {
    expect(() => RouteStopVO.create({ ...validBase, order: -1 })).toThrow();
  });
  it('rejects empty id', () => {
    expect(() => RouteStopVO.create({ ...validBase, id: '' })).toThrow();
  });
  it('shipmentCount returns length', () => {
    const s = RouteStopVO.create({ ...validBase, shipmentIds: ['a', 'b', 'c'] });
    expect(s.shipmentCount).toBe(3);
  });
  it('notes accessor', () => {
    const s = RouteStopVO.create({ ...validBase, notes: 'note' });
    expect(s.notes).toBe('note');
  });
  it('reconstitute', () => {
    const s = RouteStopVO.reconstitute(validBase as never);
    expect(s.id).toBe('s1');
  });
});

// ═══ DistanceSurcharge extra (55%) ═══
describe('DistanceSurchargeVO — extra branches', () => {
  it('create', () => {
    const d = DistanceSurchargeVO.create(100, 'BDT');
    expect(d.amount).toBe(100);
  });
  it('reconstitute', () => {
    const d = DistanceSurchargeVO.reconstitute(50, 'BDT');
    expect(d.amount).toBe(50);
  });
  it('zero', () => {
    const d = DistanceSurchargeVO.zero('BDT');
    expect(d.isZero()).toBe(true);
    expect(d.amount).toBe(0);
  });
  it('rejects negative', () => {
    expect(() => DistanceSurchargeVO.create(-1, 'BDT')).toThrow();
  });
  it('currency accessor', () => {
    expect(DistanceSurchargeVO.create(1, 'BDT').currency).toBe('BDT');
  });
});
