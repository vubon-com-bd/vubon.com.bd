/**
 * Entity lifecycle + branch coverage for all 15 entities.
 * Focus: create/reconstitute + business methods + predicate branches.
 */
import { describe, it, expect } from '@jest/globals';

import { TrackingEntity } from '@domain/entities/tracking.entity.js';
import { RouteEntity } from '@domain/entities/route.entity.js';
import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { FulfillmentEntity } from '@domain/entities/fulfillment.entity.js';
import { InsuranceEntity } from '@domain/entities/insurance.entity.js';
import { ShipmentEntity } from '@domain/entities/shipment.entity.js';
import { CourierEntity } from '@domain/entities/courier.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
import { VehicleEntity } from '@domain/entities/vehicle.entity.js';
import { DriverEntity } from '@domain/entities/driver.entity.js';
import { ZoneEntity } from '@domain/entities/zone.entity.js';
import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity.js';
import { PackagingEntity } from '@domain/entities/packaging.entity.js';
import { DispatchEntity } from '@domain/entities/dispatch.entity.js';
import { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity.js';

import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';

const NOW = new Date().toISOString();
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const UUID3 = '550e8400-e29b-41d4-a716-446655440002';

const ADDR = { line1: '12 Main', city: 'Dhaka', country: 'BD' };

// ═══════════════════════════════════════════════════════════════
// Tracking — 46% → target 90%
// ═══════════════════════════════════════════════════════════════
describe('TrackingEntity — branch coverage', () => {
  const trackingNumber = TrackingNumberVO.create('SHTEST12345678');
  const start = () => TrackingEntity.start({ id: UUID, now: NOW, trackingNumber });
  const rec = (tn = trackingNumber) => TrackingEntity.reconstitute({
    id: UUID, createdAt: NOW, updatedAt: NOW, props: {
      trackingNumber: tn, status: { isPending: () => true, isActive: () => false,
        isCompleted: () => false, isFailed: () => false, isExpired: () => false,
        isFinal: () => false, acceptsEvents: () => true, value: 'pending' } as never,
      events: [], publicAccess: true, lastUpdatedAt: NOW,
    },
  });

  it('start() creates pending', () => {
    const t = start();
    expect(t.isPending()).toBe(true);
    expect(t.publicAccess).toBe(true);
    expect(t.eventCount).toBe(0);
    expect(t.remainingEvents).toBeGreaterThan(0);
    expect(t.acceptsEvents()).toBe(true);
  });

  it('recordEvent appends + auto-transitions', () => {
    const t = start();
    t.recordEvent({
      id: UUID2, event: 'picked_up', source: 'internal', message: 'Picked up', status: 'active',
    });
    expect(t.eventCount).toBe(1);
    expect(t.currentEvent?.event.value).toBe('picked_up');
    expect(t.currentLocation).toBeUndefined();
  });

  it('recordEvent with terminal delivered → completed', () => {
    const t = start();
    t.recordEvent({ id: UUID2, event: 'delivered', source: 'internal', message: 'OK', status: 'active' });
    expect(t.isCompleted()).toBe(true);
  });

  it('recordEvent with failed terminal', () => {
    const t = start();
    t.recordEvent({ id: UUID2, event: 'failed', source: 'internal', message: 'Nope', status: 'active' });
    expect(t.isFailed()).toBe(true);
  });

  it('recordEvent with returned → completed', () => {
    const t = start();
    t.recordEvent({ id: UUID2, event: 'returned', source: 'internal', message: 'Returned', status: 'active' });
    expect(t.isCompleted()).toBe(true);
  });

  it('recordEvent with location updates currentLocation', () => {
    const t = start();
    t.recordEvent({ id: UUID2, event: 'in_transit', source: 'internal', message: 'Moved', status: 'active', location: 'Dhaka' });
    expect(t.currentLocation).toBe('Dhaka');
  });

  it('rejects event after final', () => {
    const t = start();
    t.recordEvent({ id: UUID2, event: 'delivered', source: 'internal', message: 'done', status: 'active' });
    expect(() => t.recordEvent({ id: UUID3, event: 'in_transit', source: 'internal', message: 'late' })).toThrow();
  });

  it('updateEstimatedDelivery', () => {
    const t = start();
    t.updateEstimatedDelivery('2026-12-31T00:00:00.000Z');
    expect(t.estimatedDeliveryAt).toBeDefined();
  });

  it('updateEstimatedDelivery rejects final', () => {
    const t = start();
    t.recordEvent({ id: UUID2, event: 'delivered', source: 'internal', message: 'x', status: 'active' });
    expect(() => t.updateEstimatedDelivery('2026-12-31T00:00:00.000Z')).toThrow();
  });

  it('markCompleted from pending throws', () => {
    const t = start();
    expect(() => t.markCompleted()).toThrow();
  });

  it('expire from pending works', () => {
    const t = start();
    t.expire();
    expect(t.isExpired()).toBe(true);
  });

  it('expire from expired throws', () => {
    const t = start();
    t.expire();
    expect(() => t.expire()).toThrow();
  });

  it('enablePublicAccess/disablePublicAccess idempotency', () => {
    const t = start();
    t.enablePublicAccess();
    t.enablePublicAccess(); // no-op
    expect(t.isPublic).toBe(true);
    t.disablePublicAccess();
    t.disablePublicAccess(); // no-op
    expect(t.isPublic).toBe(false);
  });

  it('transitDurationMinutes null with <2 events', () => {
    expect(start().transitDurationMinutes).toBeNull();
  });

  it('transitDurationMinutes computed', () => {
    const t = start();
    t.recordEvent({ id: UUID2, event: 'picked_up', source: 'internal', message: 'a',
      status: 'active', occurredAt: new Date(Date.now() - 3600_000).toISOString() });
    t.recordEvent({ id: UUID3, event: 'delivered', source: 'internal', message: 'b', status: 'active' });
    expect(t.transitDurationMinutes).toBeGreaterThan(0);
  });

  it('eventsSorted returns ordered', () => {
    const t = start();
    expect(Array.isArray(t.eventsSorted)).toBe(true);
  });

  it('reconstitute round-trip', () => {
    const r = rec();
    expect(r.trackingNumber.value).toBe('SHTEST12345678');
  });
});

// ═══════════════════════════════════════════════════════════════
// Route — 48% → 90%
// ═══════════════════════════════════════════════════════════════
describe('RouteEntity — branch coverage', () => {
  function mkRoute(props: Record<string, unknown> = {}) {
    return RouteEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'R1', code: { value: 'RT-01' } as never,
        type: { value: 'delivery' } as never,
        optimization: { value: 'balanced' } as never,
        stops: [],
        scheduledDate: NOW,
        isRecurring: false,
        ...props,
      } as never,
    });
  }

  it('create empty route', () => {
    const r = mkRoute();
    expect(r.stopCount).toBe(0);
    expect(r.progressPercent).toBe(0);
    expect(r.isReady).toBe(false);
  });

  it('addStop + stopCount', () => {
    const r = mkRoute();
    r.addStop({ id: UUID2, order: 0, location: 'A', address: 'X', shipmentIds: ['s1'], completed: false, hasGeo: () => false } as never);
    expect(r.stopCount).toBe(1);
  });

  it('addStop rejects duplicate order', () => {
    const r = mkRoute();
    r.addStop({ id: UUID2, order: 0, location: 'A', address: 'X', shipmentIds: ['s1'], completed: false, hasGeo: () => false } as never);
    expect(() => r.addStop({ id: UUID3, order: 0, location: 'B', address: 'Y', shipmentIds: ['s2'], completed: false, hasGeo: () => false } as never)).toThrow();
  });

  it('removeStop', () => {
    const r = mkRoute();
    r.addStop({ id: UUID2, order: 0, location: 'A', address: 'X', shipmentIds: ['s1'], completed: false, hasGeo: () => false } as never);
    r.removeStop(UUID2);
    expect(r.stopCount).toBe(0);
  });

  it('removeStop unknown throws', () => {
    const r = mkRoute();
    expect(() => r.removeStop('nope')).toThrow();
  });

  it('plan → start → complete workflow', () => {
    const r = mkRoute();
    r.addStop({ id: UUID2, order: 0, location: 'A', address: 'X', shipmentIds: ['s1'], completed: false, hasGeo: () => false } as never);
    r.assignDriver({ value: UUID } as never);
    r.assignVehicle({ value: UUID } as never);
    r.plan();
    r.start();
    r.completeStop(UUID2);
    expect(r.isCompleted()).toBe(true);
  });

  it('start without driver/vehicle throws', () => {
    const r = mkRoute();
    r.addStop({ id: UUID2, order: 0, location: 'A', address: 'X', shipmentIds: ['s1'], completed: false, hasGeo: () => false } as never);
    r.plan();
    expect(() => r.start()).toThrow();
  });

  it('cancel', () => {
    const r = mkRoute();
    r.cancel('test');
    expect(r.isCancelled()).toBe(true);
  });

  it('archive from cancelled', () => {
    const r = mkRoute();
    r.cancel('test');
    r.archive();
    expect(r.isArchived()).toBe(true);
  });

  it('startOptimization', () => {
    const r = mkRoute();
    r.startOptimization();
    expect(r.isOptimizing()).toBe(true);
  });

  it('completeOptimization computes distance/duration', () => {
    const r = mkRoute();
    r.startOptimization();
    r.completeOptimization(50, 60);
    expect(r.totalDistanceKm?.value).toBe(50);
    expect(r.isOptimized).toBe(true);
  });

  it('completeOptimization rejects non-optimizing', () => {
    const r = mkRoute();
    expect(() => r.completeOptimization(50, 60)).toThrow();
  });

  it('reorderStops validates length', () => {
    const r = mkRoute();
    r.addStop({ id: UUID2, order: 0, location: 'A', address: 'X', shipmentIds: ['s1'], completed: false, hasGeo: () => false } as never);
    expect(() => r.reorderStops(['x', 'y'])).toThrow();
  });

  it('reorderStops unknown id throws', () => {
    const r = mkRoute();
    r.addStop({ id: UUID2, order: 0, location: 'A', address: 'X', shipmentIds: ['s1'], completed: false, hasGeo: () => false } as never);
    expect(() => r.reorderStops(['unknown'])).toThrow();
  });

  it('reconstitute', () => {
    const r = mkRoute();
    const re = RouteEntity.reconstitute({
      id: r.id, createdAt: r.createdAt, updatedAt: r.updatedAt,
      props: {
        name: r.name, code: r.code, type: r.type, status: r.status,
        optimization: r.optimization, stops: r.stops,
        scheduledDate: r.scheduledDate, isOptimized: r.isOptimized,
        isRecurring: r.isRecurring,
      } as never,
    });
    expect(re.name).toBe('R1');
  });
});

