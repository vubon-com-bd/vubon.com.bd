/**
 * Entity method branch fills — call every lifecycle method across
 * DeliveryEntity + DispatchEntity to trigger untested if/else paths.
 */
import { describe, it, expect } from '@jest/globals';

import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { DispatchEntity } from '@domain/entities/dispatch.entity.js';

import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo.js';
import { RouteIdVO } from '@domain/value-objects/primitives/route-id.vo.js';
import { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo.js';
import { DeliveryStatusVO } from '@domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo.js';
import { DispatchStatusVO } from '@domain/value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { NotesVO } from '@domain/value-objects/primitives/notes.vo.js';
import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { ProofOfDeliveryVO } from '@domain/value-objects/composites/proof-of-delivery.vo.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const TS = '2026-01-01T00:00:00.000Z';

const mkAddr = () =>
  AddressDetailsVO.create({ address: { line1: '12 Main St', city: 'Dhaka', country: 'BD' } });

function mkDelivery(status = 'scheduled'): DeliveryEntity {
  return DeliveryEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      shipmentId: ShipmentIdVO.reconstitute(UUID),
      orderId: OrderIdVO.reconstitute(UUID),
      status: DeliveryStatusVO.reconstitute(status),
      type: DeliveryTypeVO.reconstitute('standard'),
      deliveryAddress: mkAddr(),
      attempts: [],
      // invariant: delivered status must have deliveredAt
      deliveredAt: status === 'delivered' ? TS : undefined,
    },
  });
}

describe('DeliveryEntity — lifecycle methods (happy path branches)', () => {
  it('schedule from rescheduled → scheduled', () => {
    const e = mkDelivery('rescheduled');
    e.schedule(TS);
    expect(e.scheduledAt).toBe(TS);
  });

  it('pickup / inTransit / outForDelivery / arrived / delivered full chain', () => {
    const e = mkDelivery('assigned');
    e.pickup(TS);
    e.markInTransit(TS);
    e.markOutForDelivery(TS);
    e.markArrived(TS);
    const proof = ProofOfDeliveryVO.create({
      type: 'signature', signatureUrl: 'https://x/s.png', capturedAt: TS,
    });
    e.markDelivered(proof, 'Recipient', TS);
    expect(e.isDelivered()).toBe(true);
    expect(e.deliveredAt).toBe(TS);
    expect(e.proofOfDelivery).toBeDefined();
  });

  it('markDelivered without proof — proof required error', () => {
    const e = mkDelivery('out_for_delivery');
    e.markArrived(TS);
    expect(() => e.markDelivered(undefined, undefined, TS)).toThrow();
  });

  it('markFailed from out_for_delivery', () => {
    const e = mkDelivery('out_for_delivery');
    e.markFailed('no one', TS);
    expect(e.isFailed()).toBe(true);
    expect(e.failedAt).toBe(TS);
  });

  it('reschedule from failed', () => {
    const e = mkDelivery('failed');
    e.reschedule('new attempt', TS);
    expect(e.isRescheduled()).toBe(true);
  });

  it('markRefused from out_for_delivery', () => {
    const e = mkDelivery('out_for_delivery');
    e.markRefused('refused', TS);
    expect(e.isRefused()).toBe(true);
  });

  it('cancel from scheduled', () => {
    const e = mkDelivery('scheduled');
    e.cancel('cancel reason', TS);
    expect(e.isCancelled()).toBe(true);
    expect(e.cancelledAt).toBe(TS);
  });

  it('updateNotes', () => {
    const e = mkDelivery('scheduled');
    e.updateNotes(NotesVO.create('some note'), TS);
    expect(e.notes?.value).toBe('some note');
  });

  it('addAttempt success → auto-mark failed', () => {
    const e = mkDelivery('out_for_delivery');
    const attempt = e.addAttempt({
      id: UUID2, status: 'failed', reason: 'no answer', now: TS,
    });
    expect(attempt).toBeDefined();
    expect(e.attemptCount).toBe(1);
  });

  it('addAttempt on final status throws', () => {
    const e = mkDelivery('delivered');
    expect(() => e.addAttempt({ id: UUID2, status: 'failed', now: TS })).toThrow();
  });

  it('assignDriver with all optional fields', () => {
    const e = mkDelivery('scheduled');
    e.assignDriver(
      DriverIdVO.reconstitute(UUID2),
      VehicleIdVO.reconstitute(UUID2),
      RouteIdVO.reconstitute(UUID2),
      TS,
    );
    expect(e.driverId?.value).toBe(UUID2);
    expect(e.vehicleId?.value).toBe(UUID2);
    expect(e.routeId?.value).toBe(UUID2);
  });

  it('assignDriver with only driver', () => {
    const e = mkDelivery('scheduled');
    e.assignDriver(DriverIdVO.reconstitute(UUID2), undefined, undefined, TS);
    expect(e.driverId?.value).toBe(UUID2);
    expect(e.vehicleId).toBeUndefined();
    expect(e.routeId).toBeUndefined();
  });
});

function mkDispatch(status = 'pending'): DispatchEntity {
  return DispatchEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      dispatchNumber: DispatchNumberVO.reconstitute('DSP-20260101-0001'),
      status: DispatchStatusVO.reconstitute(status),
      type: DispatchTypeVO.reconstitute('single'),
      shipmentIds: [UUID],
      itemCount: 1,
    },
  });
}

describe('DispatchEntity — lifecycle methods', () => {
  it('addShipment pending + duplicate + max items', () => {
    const e = mkDispatch('pending');
    e.addShipment(UUID2, 1, 5, TS);
    expect(e.shipmentCount).toBe(2);
    expect(() => e.addShipment(UUID2, 1, 5, TS)).toThrow();
  });

  it('addShipment on final status throws', () => {
    const e = mkDispatch('delivered');
    expect(() => e.addShipment(UUID2, 1, 5, TS)).toThrow();
  });

  it('removeShipment success + not found throws', () => {
    const e = mkDispatch('pending');
    e.addShipment(UUID2, 1, 5, TS);
    e.removeShipment(UUID2, 1, TS);
    expect(e.shipmentCount).toBe(1);
    expect(() => e.removeShipment('unknown', 1, TS)).toThrow();
  });

  it('assign with all fields', () => {
    const e = mkDispatch('pending');
    e.assign(
      CourierIdVO.reconstitute(UUID2),
      VehicleIdVO.reconstitute(UUID2),
      DriverIdVO.reconstitute(UUID2),
      undefined,
      TS,
    );
    expect(e.hasCourier).toBe(true);
    expect(e.hasVehicle).toBe(true);
    expect(e.hasDriver).toBe(true);
  });

  it('assign with only courier', () => {
    const e = mkDispatch('pending');
    e.assign(CourierIdVO.reconstitute(UUID2), undefined, undefined, undefined, TS);
    expect(e.hasCourier).toBe(true);
    expect(e.hasVehicle).toBe(false);
    expect(e.hasDriver).toBe(false);
  });

  it('generateManifest + updateEta', () => {
    const e = mkDispatch('pending');
    e.generateManifest('https://x/manifest.pdf', TS);
    expect(e.hasManifest).toBe(true);
    e.updateEta('2026-02-01T00:00:00.000Z', TS);
    expect(e.estimatedArrivalAt).toBe('2026-02-01T00:00:00.000Z');
  });

  it('start → inTransit → delivered', () => {
    const e = mkDispatch('pending');
    e.assign(CourierIdVO.reconstitute(UUID2), undefined, undefined, undefined, TS);
    e.start(TS);
    expect(e.isDispatched()).toBe(true);
    e.markInTransit(TS);
    expect(e.isInTransit()).toBe(true);
    e.markDelivered(TS);
    expect(e.isDelivered()).toBe(true);
  });

  it('start already started throws', () => {
    const e = mkDispatch('dispatched');
    expect(() => e.start(TS)).toThrow();
  });

  it('fail / markReturned / cancel each in valid status', () => {
    const e1 = mkDispatch('dispatched');
    e1.fail('failed', TS);
    expect(e1.isFailed()).toBe(true);
    const e2 = mkDispatch('in_transit');
    e2.markReturned('returned', TS);
    expect(e2.isReturned()).toBe(true);
    const e3 = mkDispatch('pending');
    e3.cancel('cancelled', TS);
    expect(e3.isCancelled()).toBe(true);
  });
});
