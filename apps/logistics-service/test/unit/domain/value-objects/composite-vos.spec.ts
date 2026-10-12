/**
 * Tests for composite VOs.
 */
import { describe, it, expect } from '@jest/globals';

import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { ShipmentDimensionsVO } from '@domain/value-objects/composites/shipment-dimensions.vo.js';
import { CustomerRefVO } from '@domain/value-objects/composites/customer-ref.vo.js';
import { PackageRefVO } from '@domain/value-objects/composites/package-ref.vo.js';
import { RouteStopVO } from '@domain/value-objects/composites/route-stop.vo.js';
import { DeliveryAttemptVO } from '@domain/value-objects/composites/delivery-attempt.vo.js';
import { ProofOfDeliveryVO } from '@domain/value-objects/composites/proof-of-delivery.vo.js';
import { TimeWindowVO } from '@domain/value-objects/composites/time-window.vo.js';
import { CapacityVO } from '@domain/value-objects/composites/capacity.vo.js';
import { SlaVO } from '@domain/value-objects/composites/sla.vo.js';
import { CourierConfigVO } from '@domain/value-objects/composites/courier-config.vo.js';
import { TrackingEventEntryVO } from '@domain/value-objects/composites/tracking-event-entry.vo.js';

const ADDR = { line1: '12 Main St', city: 'Dhaka', country: 'BD' };

describe('AddressDetailsVO', () => {
  it('create + address', () => {
    const a = AddressDetailsVO.create({ address: ADDR, contactName: 'Rahim' });
    expect(a.contactName).toBe('Rahim');
    expect(a.hasContact()).toBe(true);
    expect(a.toAddress().city).toBe('Dhaka');
  });
  it('lat/lng bounds', () => {
    expect(() => AddressDetailsVO.create({ address: ADDR, latitude: 100 })).toThrow();
    expect(() => AddressDetailsVO.create({ address: ADDR, longitude: 200 })).toThrow();
  });
  it('hasGeoCoordinates', () => {
    const a = AddressDetailsVO.create({ address: ADDR, latitude: 23.8, longitude: 90.4 });
    expect(a.hasGeoCoordinates()).toBe(true);
  });
});

describe('ShipmentDimensionsVO', () => {
  it('chargeableWeightKg = max(actual, volumetric)', () => {
    const d = ShipmentDimensionsVO.create({
      dimensions: { lengthCm: 50, widthCm: 40, heightCm: 30 },
      actualWeightKg: 2,
    });
    // volumetric = 50*40*30/5000 = 12 → chargeable = 12
    expect(d.chargeableWeightKg.value).toBe(12);
    expect(d.isVolumetricDominant()).toBe(true);
  });
  it('actual dominant', () => {
    const d = ShipmentDimensionsVO.create({ actualWeightKg: 20 });
    expect(d.chargeableWeightKg.value).toBe(20);
    expect(d.hasDimensions()).toBe(false);
  });
});

describe('CustomerRefVO', () => {
  it('create + guest detection', () => {
    const c = CustomerRefVO.create({ name: 'Rahim', phone: '+8801712345678' });
    expect(c.isGuest()).toBe(true);
    expect(c.hasEmail()).toBe(false);
  });
  it('registered user', () => {
    const c = CustomerRefVO.create({ userId: 'u1', name: 'Rahim', phone: '+8801712345678' });
    expect(c.isGuest()).toBe(false);
  });
  it('rejects short name', () => { expect(() => CustomerRefVO.create({ name: 'a', phone: '1' })).toThrow(); });
});

describe('PackageRefVO', () => {
  it('create', () => {
    const p = PackageRefVO.create({ orderItemId: 'oi1', quantity: 2 });
    expect(p.quantity).toBe(2);
    expect(p.hasVariant()).toBe(false);
  });
  it('rejects 0 qty', () => { expect(() => PackageRefVO.create({ orderItemId: 'oi1', quantity: 0 })).toThrow(); });
  it('rejects empty id', () => { expect(() => PackageRefVO.create({ orderItemId: '', quantity: 1 })).toThrow(); });
});

describe('RouteStopVO', () => {
  it('create + counts + geo', () => {
    const s = RouteStopVO.create({
      id: 's1', order: 0, location: 'A', address: 'Street', shipmentIds: ['sh1'], completed: false,
      latitude: 23.8, longitude: 90.4,
    });
    expect(s.shipmentCount).toBe(1);
    expect(s.hasGeo()).toBe(true);
    expect(s.isLate()).toBe(false);
  });
  it('rejects empty shipments', () => {
    expect(() => RouteStopVO.create({ id: 's1', order: 0, location: 'A', address: 'LongSt', shipmentIds: [], completed: false })).toThrow();
  });
  it('isLate when actual > estimated', () => {
    const s = RouteStopVO.create({
      id: 's1', order: 0, location: 'A', address: 'LongSt', shipmentIds: ['sh1'], completed: false,
      estimatedArrivalAt: '2026-01-01T10:00:00Z',
      actualArrivalAt: '2026-01-01T12:00:00Z',
    });
    expect(s.isLate()).toBe(true);
  });
});

describe('DeliveryAttemptVO', () => {
  it('create + success + shouldRetry', () => {
    const a = DeliveryAttemptVO.create({ id: 'a1', attemptNumber: 1, status: 'success', attemptedAt: new Date().toISOString() });
    expect(a.wasSuccessful()).toBe(true);
    expect(a.hasProof()).toBe(false);
  });
  it('failed → shouldRetry', () => {
    const a = DeliveryAttemptVO.create({ id: 'a2', attemptNumber: 2, status: 'failed', attemptedAt: new Date().toISOString() });
    expect(a.shouldRetry()).toBe(true);
  });
  it('rejects > 5 images', () => {
    expect(() => DeliveryAttemptVO.create({
      id: 'a1', attemptNumber: 1, status: 'failed', attemptedAt: new Date().toISOString(),
      images: ['1','2','3','4','5','6'],
    })).toThrow();
  });
});

describe('ProofOfDeliveryVO', () => {
  it('signature requires url', () => {
    expect(() => ProofOfDeliveryVO.create({ type: 'signature', capturedAt: new Date().toISOString() })).toThrow();
    expect(ProofOfDeliveryVO.create({ type: 'signature', signatureUrl: 'http://x', capturedAt: new Date().toISOString() }).type).toBe('signature');
  });
  it('photo requires url', () => {
    expect(() => ProofOfDeliveryVO.create({ type: 'photo', capturedAt: new Date().toISOString() })).toThrow();
  });
  it('otp requires 4-8 digits', () => {
    expect(() => ProofOfDeliveryVO.create({ type: 'otp', otp: 'abc', capturedAt: new Date().toISOString() })).toThrow();
    const p = ProofOfDeliveryVO.create({ type: 'otp', otp: '1234', capturedAt: new Date().toISOString() });
    expect(p.wasVerifiedByOtp()).toBe(true);
  });
  it('id_verification requires idNumber', () => {
    expect(() => ProofOfDeliveryVO.create({ type: 'id_verification', capturedAt: new Date().toISOString() })).toThrow();
  });
  it('contactless ok', () => {
    const p = ProofOfDeliveryVO.create({ type: 'contactless', capturedAt: new Date().toISOString() });
    expect(p.isContactless()).toBe(true);
  });
});

describe('TimeWindowVO', () => {
  it('duration + contains', () => {
    const tw = TimeWindowVO.create('2026-01-01T10:00:00Z', '2026-01-01T12:00:00Z');
    expect(tw.durationMinutes).toBe(120);
    expect(tw.contains('2026-01-01T11:00:00Z')).toBe(true);
    expect(tw.contains('2026-01-01T13:00:00Z')).toBe(false);
  });
  it('rejects reversed', () => {
    expect(() => TimeWindowVO.create('2026-01-01T12:00:00Z', '2026-01-01T10:00:00Z')).toThrow();
  });
  it('isInPast + hasStarted', () => {
    const tw = TimeWindowVO.create('2020-01-01T00:00:00Z', '2020-01-01T01:00:00Z');
    expect(tw.isInPast()).toBe(true);
    expect(tw.hasStarted()).toBe(true);
  });
  it('overlaps', () => {
    const a = TimeWindowVO.create('2026-01-01T10:00:00Z', '2026-01-01T12:00:00Z');
    const b = TimeWindowVO.create('2026-01-01T11:00:00Z', '2026-01-01T13:00:00Z');
    const c = TimeWindowVO.create('2026-01-01T13:00:00Z', '2026-01-01T14:00:00Z');
    expect(a.overlaps(b)).toBe(true);
    expect(a.overlaps(c)).toBe(false);
  });
});

describe('CapacityVO', () => {
  it('create + available + utilization', () => {
    const c = CapacityVO.create({ capacityM3: 100, usedM3: 30, capacityKg: 1000, usedKg: 300 });
    expect(c.availableM3).toBe(70);
    expect(c.availableKg).toBe(700);
    expect(c.volumeUtilization.value).toBe(30);
    expect(c.weightUtilization.value).toBe(30);
  });
  it('canFit + isFull', () => {
    const c = CapacityVO.create({ capacityM3: 100, usedM3: 99.5, capacityKg: 1000, usedKg: 999 });
    expect(c.canFit(0.4, 0.5)).toBe(true);
    expect(c.canFit(1, 2)).toBe(false);
    expect(c.isFull()).toBe(true);
  });
  it('rejects used > capacity', () => {
    expect(() => CapacityVO.create({ capacityM3: 100, usedM3: 200, capacityKg: 1, usedKg: 0 })).toThrow();
  });
  it('withAdded', () => {
    const c = CapacityVO.create({ capacityM3: 100, usedM3: 30, capacityKg: 1000, usedKg: 300 });
    expect(c.withAdded(10, 100).usedM3).toBe(40);
    expect(c.withAdded(10, 100).usedKg).toBe(400);
  });
});

describe('SlaVO', () => {
  it('create + due + remaining', () => {
    const s = SlaVO.create(new Date().toISOString(), 48);
    expect(s.isBreached()).toBe(false);
    expect(s.remainingMinutes()).toBeGreaterThan(0);
    expect(s.elapsedPercent()).toBeLessThan(10);
  });
  it('breach when past due', () => {
    const past = new Date(Date.now() - 100 * 60 * 60 * 1000).toISOString();
    const s = SlaVO.reconstitute({ startedAt: past, dueAt: past });
    expect(s.isBreached()).toBe(true);
  });
  it('withBreach marks recorded', () => {
    const s = SlaVO.create(new Date().toISOString(), 1);
    expect(s.withBreach().isBreachedRecorded()).toBe(true);
  });
  it('rejects non-positive hours', () => {
    expect(() => SlaVO.create(new Date().toISOString(), 0)).toThrow();
  });
});

describe('CourierConfigVO', () => {
  it('create + hasWebhook + canRetry', () => {
    const c = CourierConfigVO.create({
      baseUrl: 'https://api.example.com',
      apiKeyName: 'MY_KEY',
      timeoutMs: 30000,
      retryAttempts: 3,
      isEnabled: true,
      webhookSecretName: 'WH',
    });
    expect(c.hasWebhook()).toBe(true);
    expect(c.canRetry(0)).toBe(true);
    expect(c.canRetry(3)).toBe(false);
  });
  it('rejects bad url', () => {
    expect(() => CourierConfigVO.create({ baseUrl: 'not-url', apiKeyName: 'K', timeoutMs: 30000, retryAttempts: 3, isEnabled: true })).toThrow();
  });
  it('rejects timeout < 1000', () => {
    expect(() => CourierConfigVO.create({ baseUrl: 'http://x.com', apiKeyName: 'K', timeoutMs: 100, retryAttempts: 3, isEnabled: true })).toThrow();
  });
});

describe('TrackingEventEntryVO', () => {
  it('create + hasGeo + isTerminal', () => {
    const e = TrackingEventEntryVO.create({
      id: 'e1', event: 'picked_up', status: 'active', source: 'internal',
      message: 'Picked up', occurredAt: new Date().toISOString(),
      receivedAt: new Date().toISOString(),
      latitude: 23.8, longitude: 90.4,
    });
    expect(e.hasGeo()).toBe(true);
    expect(e.isTerminal()).toBe(false);
  });
  it('rejects empty message', () => {
    expect(() => TrackingEventEntryVO.create({
      id: 'e1', event: 'picked_up', status: 'active', source: 'internal',
      message: '', occurredAt: new Date().toISOString(), receivedAt: new Date().toISOString(),
    })).toThrow();
  });
});
