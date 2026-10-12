/**
 * Entity branch fills — targets remaining uncovered branches across
 * DeliveryEntity, DispatchEntity, ShipmentEntity, WarehouseEntity,
 * PackagingEntity, and ZoneEntity.
 */
import { describe, it, expect } from '@jest/globals';

import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { DispatchEntity } from '@domain/entities/dispatch.entity.js';
import { ShipmentEntity } from '@domain/entities/shipment.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
import { PackagingEntity } from '@domain/entities/packaging.entity.js';
import { ZoneEntity } from '@domain/entities/zone.entity.js';

import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo.js';
import { RouteIdVO } from '@domain/value-objects/primitives/route-id.vo.js';
import { WarehouseIdVO } from '@domain/value-objects/primitives/warehouse-id.vo.js';
import { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo.js';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { DeliveryStatusVO } from '@domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo.js';
import { DispatchStatusVO } from '@domain/value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { ShipmentStatusVO } from '@domain/value-objects/primitives/shipment-status.vo.js';
import { ShipmentTypeVO } from '@domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '@domain/value-objects/primitives/shipment-priority.vo.js';
import { WarehouseStatusVO } from '@domain/value-objects/primitives/warehouse-status.vo.js';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '@domain/value-objects/primitives/warehouse-type.vo.js';
import { PackagingStatusVO } from '@domain/value-objects/primitives/packaging-status.vo.js';
import { PackagingTypeVO } from '@domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '@domain/value-objects/primitives/packaging-material.vo.js';
import { DimensionCmVO } from '@domain/value-objects/primitives/dimension-cm.vo.js';
import { WeightKgVO } from '@domain/value-objects/primitives/weight-kg.vo.js';
import { ShippingCostVO } from '@domain/value-objects/primitives/shipping-cost.vo.js';
import { ZoneStatusVO } from '@domain/value-objects/primitives/zone-status.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo.js';
import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { DeliveryAttemptVO } from '@domain/value-objects/composites/delivery-attempt.vo.js';
import { CapacityVO } from '@domain/value-objects/composites/capacity.vo.js';
import { PackageRefVO } from '@domain/value-objects/composites/package-ref.vo.js';
import { ShipmentDimensionsVO } from '@domain/value-objects/composites/shipment-dimensions.vo.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const TS = '2026-01-01T00:00:00.000Z';

const mkAddr = () =>
  AddressDetailsVO.create({ address: { line1: '12 Main St', city: 'Dhaka', country: 'BD' } });

// ═══════════════════════════════════════════════════════════════
// DeliveryEntity — full predicate + attempt coverage
// ═══════════════════════════════════════════════════════════════
const DELIVERY_STATUSES = [
  'scheduled','assigned','picked_up','in_transit','out_for_delivery',
  'arrived','delivered','failed','rescheduled','cancelled','refused',
] as const;

const DELIVERY_PREDICATES: Record<string, string> = {
  scheduled: 'isScheduled', assigned: 'isAssigned', picked_up: 'isPickedUp',
  in_transit: 'isInTransit', out_for_delivery: 'isOutForDelivery', arrived: 'isArrived',
  delivered: 'isDelivered', failed: 'isFailed', rescheduled: 'isRescheduled',
  cancelled: 'isCancelled', refused: 'isRefused',
};

function mkDelivery(status: string, attempts: readonly DeliveryAttemptVO[] = [], extra: Record<string, unknown> = {}): DeliveryEntity {
  // Invariant: delivered status requires deliveredAt
  const baseExtra = status === 'delivered' && !('deliveredAt' in extra) ? { deliveredAt: TS } : {};
  return DeliveryEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      shipmentId: ShipmentIdVO.reconstitute(UUID),
      orderId: OrderIdVO.reconstitute(UUID),
      status: DeliveryStatusVO.reconstitute(status),
      type: DeliveryTypeVO.reconstitute('standard'),
      deliveryAddress: mkAddr(),
      attempts,
      ...baseExtra,
      ...extra,
    },
  });
}

describe('DeliveryEntity — predicate branches (all statuses)', () => {
  it.each(DELIVERY_STATUSES)('status=%s → predicates + isFinal', (status) => {
    const e = mkDelivery(status);
    for (const [s, pred] of Object.entries(DELIVERY_PREDICATES)) {
      expect((e as unknown as Record<string, () => boolean>)[pred]()).toBe(s === status);
    }
    expect(e.isFinal()).toBe(['delivered', 'cancelled'].includes(status));
  });

  it('hasDriver false vs true', () => {
    expect(mkDelivery('scheduled').hasDriver).toBe(false);
    expect(mkDelivery('assigned', [], { driverId: DriverIdVO.reconstitute(UUID2) }).hasDriver).toBe(true);
  });

  it('hasProof false only', () => {
    expect(mkDelivery('scheduled').hasProof).toBe(false);
  });

  it('lastAttempt empty vs present', () => {
    expect(mkDelivery('scheduled').lastAttempt).toBeUndefined();
    const att = DeliveryAttemptVO.create({ id: UUID, attemptNumber: 1, status: 'failed', attemptedAt: TS });
    expect(mkDelivery('failed', [att]).lastAttempt).toBeDefined();
  });

  it('attemptSummary aggregates success/failed/pending', () => {
    const a1 = DeliveryAttemptVO.create({ id: UUID, attemptNumber: 1, status: 'failed', attemptedAt: TS });
    const a2 = DeliveryAttemptVO.create({ id: UUID2, attemptNumber: 2, status: 'success', attemptedAt: TS });
    const s = mkDelivery('delivered', [a1, a2]).attemptSummary;
    expect(s.success).toBe(1);
    expect(s.failed).toBe(1);
  });

  it('canAddAttempt — final=true → false; scheduled → false; out_for_delivery with room → true; maxed → false', () => {
    expect(mkDelivery('delivered').canAddAttempt()).toBe(false);
    expect(mkDelivery('scheduled').canAddAttempt()).toBe(false);
    expect(mkDelivery('out_for_delivery').canAddAttempt()).toBe(true);
    const attempts = [
      DeliveryAttemptVO.create({ id: UUID, attemptNumber: 1, status: 'failed', attemptedAt: TS }),
      DeliveryAttemptVO.create({ id: UUID2, attemptNumber: 2, status: 'failed', attemptedAt: TS }),
      DeliveryAttemptVO.create({ id: '550e8400-e29b-41d4-a716-446655440002', attemptNumber: 3, status: 'failed', attemptedAt: TS }),
    ];
    expect(mkDelivery('out_for_delivery', attempts).canAddAttempt()).toBe(false);
  });

  it('canBeRescheduled — scheduled true; recoverable true; in_transit false', () => {
    expect(mkDelivery('scheduled').canBeRescheduled()).toBe(true);
    expect(mkDelivery('failed').canBeRescheduled()).toBe(true);
    expect(mkDelivery('in_transit').canBeRescheduled()).toBe(false);
  });

  it('canBeCancelled — delivered=false; failed=true', () => {
    expect(mkDelivery('delivered').canBeCancelled()).toBe(false);
    expect(mkDelivery('failed').canBeCancelled()).toBe(true);
  });

  it('canRetry — room + recoverable=true; no room=false', () => {
    expect(mkDelivery('failed').canRetry()).toBe(true);
    const attempts = [
      DeliveryAttemptVO.create({ id: UUID, attemptNumber: 1, status: 'failed', attemptedAt: TS }),
      DeliveryAttemptVO.create({ id: UUID2, attemptNumber: 2, status: 'failed', attemptedAt: TS }),
      DeliveryAttemptVO.create({ id: '550e8400-e29b-41d4-a716-446655440002', attemptNumber: 3, status: 'failed', attemptedAt: TS }),
    ];
    expect(mkDelivery('failed', attempts).canRetry()).toBe(false);
  });

  it('getters — all fields expose expected values', () => {
    const e = mkDelivery('scheduled');
    expect(e.shipmentId.value).toBe(UUID);
    expect(e.orderId.value).toBe(UUID);
    expect(e.type.value).toBe('standard');
    expect(e.status.value).toBe('scheduled');
    expect(e.attempts).toHaveLength(0);
    expect(e.toIdVO.value).toBe(UUID);
    expect(e.userId).toBeUndefined();
    expect(e.driverId).toBeUndefined();
    expect(e.vehicleId).toBeUndefined();
    expect(e.routeId).toBeUndefined();
    expect(e.recipientName).toBeUndefined();
    expect(e.recipientPhone).toBeUndefined();
    expect(e.scheduledAt).toBeUndefined();
    expect(e.pickedUpAt).toBeUndefined();
    expect(e.arrivedAt).toBeUndefined();
    expect(e.deliveredAt).toBeUndefined();
    expect(e.failedAt).toBeUndefined();
    expect(e.cancelledAt).toBeUndefined();
    expect(e.notes).toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// DispatchEntity — predicate + hasX short-circuits + canBeStarted
// ═══════════════════════════════════════════════════════════════
const DISPATCH_STATUSES = [
  'pending','assigned','dispatched','in_transit','delivered','failed','returned','cancelled',
] as const;

const DISPATCH_PREDICATES: Record<string, string> = {
  pending: 'isPending', assigned: 'isAssigned', dispatched: 'isDispatched',
  in_transit: 'isInTransit', delivered: 'isDelivered', failed: 'isFailed',
  returned: 'isReturned', cancelled: 'isCancelled',
};

function mkDispatch(status: string, extra: Record<string, unknown> = {}): DispatchEntity {
  return DispatchEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      dispatchNumber: DispatchNumberVO.reconstitute('DSP-20260101-0001'),
      status: DispatchStatusVO.reconstitute(status),
      type: DispatchTypeVO.reconstitute('single'),
      shipmentIds: [UUID],
      itemCount: 1,
      ...extra,
    },
  });
}

describe('DispatchEntity — predicate branches (all statuses)', () => {
  it.each(DISPATCH_STATUSES)('status=%s', (status) => {
    const e = mkDispatch(status);
    for (const [s, pred] of Object.entries(DISPATCH_PREDICATES)) {
      expect((e as unknown as Record<string, () => boolean>)[pred]()).toBe(s === status);
    }
    expect(e.isFinal()).toBe(['delivered','returned','cancelled'].includes(status));
    expect(e.isInFlight()).toBe(['dispatched','in_transit'].includes(status));
  });

  it('hasCourier/Driver/Vehicle/Manifest — false/true each', () => {
    const empty = mkDispatch('pending');
    expect(empty.hasCourier).toBe(false);
    expect(empty.hasVehicle).toBe(false);
    expect(empty.hasDriver).toBe(false);
    expect(empty.hasManifest).toBe(false);

    const full = mkDispatch('pending', {
      courierId: CourierIdVO.reconstitute(UUID2),
      vehicleId: VehicleIdVO.reconstitute(UUID2),
      driverId: DriverIdVO.reconstitute(UUID2),
      manifestUrl: 'https://x/y.pdf',
    });
    expect(full.hasCourier).toBe(true);
    expect(full.hasVehicle).toBe(true);
    expect(full.hasDriver).toBe(true);
    expect(full.hasManifest).toBe(true);
  });

  it('canBeStarted short-circuit — hasCourier false → false', () => {
    expect(mkDispatch('pending').canBeStarted()).toBe(false);
  });

  it('isReady short-circuits — 3 conditions', () => {
    expect(mkDispatch('pending').isReady()).toBe(false);
    const onlyCourier = mkDispatch('pending', { courierId: CourierIdVO.reconstitute(UUID2) });
    expect(onlyCourier.isReady()).toBe(false);
    const courierManifest = mkDispatch('pending', {
      courierId: CourierIdVO.reconstitute(UUID2),
      manifestUrl: 'https://x/y.pdf',
    });
    expect(courierManifest.isReady()).toBe(true);
  });

  it('getters — full expose', () => {
    const e = mkDispatch('pending');
    expect(e.dispatchNumber.value).toBe('DSP-20260101-0001');
    expect(e.type.value).toBe('single');
    expect(e.status.value).toBe('pending');
    expect(e.shipmentIds).toEqual([UUID]);
    expect(e.shipmentCount).toBe(1);
    expect(e.itemCount).toBe(1);
    expect(e.courierId).toBeUndefined();
    expect(e.vehicleId).toBeUndefined();
    expect(e.driverId).toBeUndefined();
    expect(e.warehouseId).toBeUndefined();
    expect(e.manifestUrl).toBeUndefined();
    expect(e.totalWeight).toBeUndefined();
    expect(e.dispatchedAt).toBeUndefined();
    expect(e.estimatedArrivalAt).toBeUndefined();
    expect(e.deliveredAt).toBeUndefined();
    expect(e.cancelledAt).toBeUndefined();
    expect(e.notes).toBeUndefined();
    expect(e.toIdVO.value).toBe(UUID);
  });
});

// ═══════════════════════════════════════════════════════════════
// ShipmentEntity — predicate branches (13 statuses)
// ═══════════════════════════════════════════════════════════════
const SHIPMENT_STATUSES = [
  'pending','confirmed','processing','packed','picked_up','in_transit',
  'out_for_delivery','delivered','failed','returned','cancelled','on_hold','delayed',
] as const;

const SHIPMENT_PREDICATES: Record<string, string> = {
  pending: 'isPending', confirmed: 'isConfirmed', processing: 'isProcessing',
  packed: 'isPacked', picked_up: 'isPickedUp', in_transit: 'isInTransit',
  out_for_delivery: 'isOutForDelivery', delivered: 'isDelivered', failed: 'isFailed',
  returned: 'isReturned', cancelled: 'isCancelled', on_hold: 'isOnHold', delayed: 'isDelayed',
};

function mkShipment(status: string, extra: Record<string, unknown> = {}): ShipmentEntity {
  return ShipmentEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      trackingNumber: TrackingNumberVO.reconstitute('SHABCD1234567XYZ'),
      orderId: OrderIdVO.reconstitute(UUID),
      type: ShipmentTypeVO.reconstitute('standard'),
      priority: ShipmentPriorityVO.reconstitute('normal'),
      status: ShipmentStatusVO.reconstitute(status),
      dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 1 }),
      shippingAddress: mkAddr(),
      packages: [PackageRefVO.create({ orderItemId: UUID, quantity: 1 })],
      itemCount: 1,
      isCOD: false,
      isInsured: false,
      ...extra,
    },
  });
}

describe('ShipmentEntity — predicate branches (all statuses)', () => {
  it.each(SHIPMENT_STATUSES)('status=%s', (status) => {
    const e = mkShipment(status);
    // VO isInTransit() returns true for both in_transit and out_for_delivery
    const inTransitExpected = status === 'in_transit' || status === 'out_for_delivery';
    expect(e.isInTransit()).toBe(inTransitExpected);

    // All other predicates are 1:1 with status name
    const allExceptInTransit: Record<string, string> = {
      pending: 'isPending', confirmed: 'isConfirmed', processing: 'isProcessing',
      packed: 'isPacked', picked_up: 'isPickedUp',
      out_for_delivery: 'isOutForDelivery', delivered: 'isDelivered', failed: 'isFailed',
      returned: 'isReturned', cancelled: 'isCancelled', on_hold: 'isOnHold', delayed: 'isDelayed',
    };
    for (const [s, pred] of Object.entries(allExceptInTransit)) {
      expect((e as unknown as Record<string, () => boolean>)[pred]()).toBe(s === status);
    }

    expect(e.isFinal()).toBe(['delivered','returned','cancelled'].includes(status));
    expect(e.isInFlight()).toBe(['picked_up','in_transit','out_for_delivery'].includes(status));
  });

  it('hasCourier/hasWarehouse/hasLabel — false/true', () => {
    const empty = mkShipment('pending');
    expect(empty.hasCourier()).toBe(false);
    expect(empty.hasWarehouse()).toBe(false);
    expect(empty.hasLabel()).toBe(false);
    expect(empty.hasPickupAddress()).toBe(false);

    const full = mkShipment('pending', {
      courierId: CourierIdVO.reconstitute(UUID2),
      warehouseId: WarehouseIdVO.reconstitute(UUID2),
      labelUrl: 'https://x/label.pdf',
      pickupAddress: mkAddr(),
    });
    expect(full.hasCourier()).toBe(true);
    expect(full.hasWarehouse()).toBe(true);
    expect(full.hasLabel()).toBe(true);
    expect(full.hasPickupAddress()).toBe(true);
  });

  it('isReadyForPickup — combo', () => {
    expect(mkShipment('packed').isReadyForPickup()).toBe(false);
    expect(mkShipment('packed', {
      courierId: CourierIdVO.reconstitute(UUID2),
      warehouseId: WarehouseIdVO.reconstitute(UUID2),
      labelUrl: 'https://x/l.pdf',
    }).isReadyForPickup()).toBe(true);
  });

  it('canBeCancelled / canBeModified / canGenerateLabel / canBeReturned', () => {
    expect(mkShipment('pending').canBeCancelled()).toBe(true);
    expect(mkShipment('delivered').canBeCancelled()).toBe(false);
    expect(mkShipment('pending').canBeModified()).toBe(true);
    expect(mkShipment('confirmed').canBeModified()).toBe(true);
    expect(mkShipment('on_hold').canBeModified()).toBe(true);
    expect(mkShipment('processing').canBeModified()).toBe(false);
    expect(mkShipment('confirmed', { courierId: CourierIdVO.reconstitute(UUID2) }).canGenerateLabel()).toBe(true);
    expect(mkShipment('confirmed').canGenerateLabel()).toBe(false);
    expect(mkShipment('delivered').canBeReturned()).toBe(true);
    expect(mkShipment('pending').canBeReturned()).toBe(false);
  });

  it('getters — full expose', () => {
    const e = mkShipment('pending');
    expect(e.trackingNumber.value).toBe('SHABCD1234567XYZ');
    expect(e.orderId.value).toBe(UUID);
    expect(e.type.value).toBe('standard');
    expect(e.priority.value).toBe('normal');
    expect(e.status.value).toBe('pending');
    expect(e.userId).toBeUndefined();
    expect(e.vendorId).toBeUndefined();
    expect(e.warehouseId).toBeUndefined();
    expect(e.courierId).toBeUndefined();
    expect(e.courierTrackingNumber).toBeUndefined();
    expect(e.labelUrl).toBeUndefined();
    expect(e.estimatedDeliveryAt).toBeUndefined();
    expect(e.pickedUpAt).toBeUndefined();
    expect(e.deliveredAt).toBeUndefined();
    expect(e.returnedAt).toBeUndefined();
    expect(e.cancelledAt).toBeUndefined();
    expect(e.failureReason).toBeUndefined();
    expect(e.notes).toBeUndefined();
    expect(e.customer).toBeUndefined();
    expect(e.pickupAddress).toBeUndefined();
    expect(e.codAmount).toBeUndefined();
    expect(e.declaredValue).toBeUndefined();
    expect(e.shippingCost).toBeUndefined();
    expect(e.packages).toHaveLength(1);
    expect(e.itemCount).toBe(1);
    expect(e.isCOD).toBe(false);
    expect(e.isInsured).toBe(false);
    expect(e.toIdVO.value).toBe(UUID);
  });
});

// ═══════════════════════════════════════════════════════════════
// WarehouseEntity — invariant throws + isOpenNow + transitions
// ═══════════════════════════════════════════════════════════════
function mkWarehouse(status: string, extra: Record<string, unknown> = {}): WarehouseEntity {
  return WarehouseEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      code: WarehouseCodeVO.reconstitute('WH-01'),
      name: 'Main Warehouse',
      type: WarehouseTypeVO.reconstitute('main'),
      status: WarehouseStatusVO.reconstitute(status),
      address: mkAddr(),
      capacity: CapacityVO.create({ capacityM3: 100, usedM3: 0, capacityKg: 1000, usedKg: 0 }),
      maxSkus: 1000,
      zone: 'dhaka',
      timezone: 'Asia/Dhaka',
      isDefault: false,
      ...extra,
    },
  });
}

describe('WarehouseEntity — branch fills', () => {
  it('name empty → throw', () => {
    expect(() => mkWarehouse('inactive', { name: '' })).toThrow();
  });

  it('maxSkus out of range → throw (both ends)', () => {
    expect(() => mkWarehouse('inactive', { maxSkus: 0 })).toThrow();
    expect(() => mkWarehouse('inactive', { maxSkus: 9999999 })).toThrow();
  });

  it('operatingHoursStart out of range → throw', () => {
    expect(() => mkWarehouse('inactive', { operatingHoursStart: -1 })).toThrow();
    expect(() => mkWarehouse('inactive', { operatingHoursStart: 24 })).toThrow();
  });

  it('operatingHoursEnd out of range → throw', () => {
    expect(() => mkWarehouse('inactive', { operatingHoursEnd: 24 })).toThrow();
  });

  it('operatingHoursEnd <= start → throw', () => {
    expect(() => mkWarehouse('inactive', { operatingHoursStart: 10, operatingHoursEnd: 8 })).toThrow();
  });

  it('isFull — status.full OR capacity.full', () => {
    expect(mkWarehouse('active').isFull()).toBe(false);
    expect(mkWarehouse('full').isFull()).toBe(true);
    const fullCap = CapacityVO.create({ capacityM3: 100, usedM3: 96, capacityKg: 1000, usedKg: 960 });
    expect(mkWarehouse('active', { capacity: fullCap }).isFull()).toBe(true);
  });

  it('canAcceptInbound short-circuit', () => {
    expect(mkWarehouse('inactive').canAcceptInbound()).toBe(false);
    expect(mkWarehouse('active').canAcceptInbound()).toBe(true);
  });

  it('isOpenNow — !active / no hours / within / outside', () => {
    expect(mkWarehouse('inactive').isOpenNow()).toBe(false);
    expect(mkWarehouse('active').isOpenNow()).toBe(true);
    const withHours = mkWarehouse('active', { operatingHoursStart: 6, operatingHoursEnd: 22 });
    const noon = new Date();
    noon.setHours(12, 0, 0, 0);
    const midnight = new Date();
    midnight.setHours(2, 0, 0, 0);
    expect(withHours.isOpenNow(noon)).toBe(true);
    expect(withHours.isOpenNow(midnight)).toBe(false);
  });

  it('canDispatch true for active/full', () => {
    expect(mkWarehouse('active').canDispatch()).toBe(true);
    expect(mkWarehouse('full').canDispatch()).toBe(true);
    expect(mkWarehouse('closed').canDispatch()).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════
// PackagingEntity — invariant + canHold + stock edge cases
// ═══════════════════════════════════════════════════════════════
function mkPackaging(status: string, stock: number, extra: Record<string, unknown> = {}): PackagingEntity {
  return PackagingEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      name: 'Box S',
      code: 'BOX-S',
      type: PackagingTypeVO.reconstitute('box'),
      material: PackagingMaterialVO.reconstitute('cardboard'),
      status: PackagingStatusVO.reconstitute(status),
      dimensions: DimensionCmVO.create(20, 20, 20),
      maxWeightKg: WeightKgVO.create(5),
      isFragile: false,
      isTemperatureControlled: false,
      isRecyclable: true,
      stock,
      isDefault: false,
      ...extra,
    },
  });
}

describe('PackagingEntity — branch fills', () => {
  it('name empty → throw', () => {
    expect(() => mkPackaging('active', 0, { name: '' })).toThrow();
  });
  it('code empty → throw', () => {
    expect(() => mkPackaging('active', 0, { code: '' })).toThrow();
  });
  it('negative stock → throw', () => {
    expect(() => mkPackaging('active', -1)).toThrow();
  });

  it('canBeUsed — status + stock combos', () => {
    expect(mkPackaging('active', 10).canBeUsed()).toBe(true);
    expect(mkPackaging('active', 0).canBeUsed()).toBe(false);
    expect(mkPackaging('inactive', 10).canBeUsed()).toBe(false);
  });

  it('canHold — weight limit / no dims / dims within / dims exceed', () => {
    const p = mkPackaging('active', 10);
    expect(p.canHold(10)).toBe(false);
    expect(p.canHold(3)).toBe(true);
    expect(p.canHold(3, { lengthCm: 5, widthCm: 5, heightCm: 5 })).toBe(true);
    expect(p.canHold(3, { lengthCm: 100, widthCm: 5, heightCm: 5 })).toBe(false);
    expect(p.canHold(3, { lengthCm: 5, widthCm: 100, heightCm: 5 })).toBe(false);
    expect(p.canHold(3, { lengthCm: 5, widthCm: 5, heightCm: 100 })).toBe(false);
  });

  it('requiresSpecialHandling — false/true for fragile/temp', () => {
    expect(mkPackaging('active', 10).requiresSpecialHandling()).toBe(false);
    expect(mkPackaging('active', 10, { isFragile: true }).requiresSpecialHandling()).toBe(true);
    expect(mkPackaging('active', 10, { isTemperatureControlled: true }).requiresSpecialHandling()).toBe(true);
  });

  it('markOutOfStock — already out → no-op', () => {
    expect(() => mkPackaging('out_of_stock', 0).markOutOfStock()).not.toThrow();
  });

  it('restock from out_of_stock → reactivates', () => {
    const p = mkPackaging('out_of_stock', 0);
    p.restock(5);
    expect(p.stock).toBe(5);
    expect(p.status.value).toBe('active');
  });

  it('restock — quantity <= 0 → throw', () => {
    expect(() => mkPackaging('active', 5).restock(0)).toThrow();
  });

  it('getters full', () => {
    const p = mkPackaging('active', 10);
    expect(p.name).toBe('Box S');
    expect(p.code).toBe('BOX-S');
    expect(p.type.value).toBe('box');
    expect(p.material.value).toBe('cardboard');
    expect(p.status.value).toBe('active');
    expect(p.stock).toBe(10);
    expect(p.isDefault).toBe(false);
    expect(p.isFragile).toBe(false);
    expect(p.isRecyclable).toBe(true);
    expect(p.isTemperatureControlled).toBe(false);
    expect(p.imageUrl).toBeUndefined();
    expect(p.cost).toBeUndefined();
    expect(p.toIdVO.value).toBe(UUID);
  });
});

// ═══════════════════════════════════════════════════════════════
// ZoneEntity — invariant + calculateShippingCost + coverage methods
// ═══════════════════════════════════════════════════════════════
function mkZone(extra: Record<string, unknown> = {}): ZoneEntity {
  return ZoneEntity.reconstitute({
    id: UUID, createdAt: TS, updatedAt: TS,
    props: {
      name: 'Dhaka District',
      code: 'DHK',
      type: ZoneTypeVO.reconstitute('district'),
      status: ZoneStatusVO.reconstitute('active'),
      pricingType: ZonePricingTypeVO.reconstitute('flat'),
      postalCodes: ['1000', '1200'],
      districts: ['Dhaka'],
      divisions: ['Dhaka'],
      shippingCost: ShippingCostVO.create(100, 'BDT'),
      minDeliveryDays: 1,
      maxDeliveryDays: 3,
      codEnabled: true,
      isRemote: false,
      isActive: true,
      ...extra,
    },
  });
}

describe('ZoneEntity — branch fills', () => {
  it('name/code empty → throw', () => {
    expect(() => mkZone({ name: '' })).toThrow();
    expect(() => mkZone({ code: '' })).toThrow();
  });

  it('minDeliveryDays out of range → throw', () => {
    expect(() => mkZone({ minDeliveryDays: -1 })).toThrow();
    expect(() => mkZone({ minDeliveryDays: 999 })).toThrow();
  });

  it('maxDeliveryDays < min → throw', () => {
    expect(() => mkZone({ minDeliveryDays: 5, maxDeliveryDays: 3 })).toThrow();
  });

  it('maxDeliveryDays > max → throw', () => {
    expect(() => mkZone({ maxDeliveryDays: 999 })).toThrow();
  });

  it('canAcceptOrders — active+isActive true; inactive false', () => {
    expect(mkZone().canAcceptOrders()).toBe(true);
    expect(mkZone({ status: ZoneStatusVO.reconstitute('inactive'), isActive: false }).canAcceptOrders()).toBe(false);
  });

  it('coversPostalCode — true/false', () => {
    expect(mkZone().coversPostalCode('1000')).toBe(true);
    expect(mkZone().coversPostalCode('9999')).toBe(false);
  });

  it('coversDistrict — true/false', () => {
    expect(mkZone().coversDistrict('Dhaka')).toBe(true);
    expect(mkZone().coversDistrict('Sylhet')).toBe(false);
  });

  it('coversDivision — true/false', () => {
    expect(mkZone().coversDivision('Dhaka')).toBe(true);
    expect(mkZone().coversDivision('Sylhet')).toBe(false);
  });

  it('calculateShippingCost — fixed / requiresWeight & >5 / fallback', () => {
    expect(mkZone().calculateShippingCost(3).amount).toBe(100);
    const weightBased = mkZone({
      pricingType: ZonePricingTypeVO.reconstitute('weight_based'),
      shippingCost: ShippingCostVO.create(60, 'BDT'),
    });
    expect(weightBased.calculateShippingCost(8).amount).toBe(90);
    expect(weightBased.calculateShippingCost(3).amount).toBe(60);
  });

  it('estimatedDeliveryDays avg', () => {
    expect(mkZone().estimatedDeliveryDays).toBe(2);
  });

  it('getters full', () => {
    const z = mkZone();
    expect(z.name).toBe('Dhaka District');
    expect(z.code).toBe('DHK');
    expect(z.type.value).toBe('district');
    expect(z.status.value).toBe('active');
    expect(z.pricingType.value).toBe('flat');
    expect(z.parentId).toBeUndefined();
    expect(z.postalCodes).toEqual(['1000', '1200']);
    expect(z.districts).toEqual(['Dhaka']);
    expect(z.divisions).toEqual(['Dhaka']);
    expect(z.minDeliveryDays).toBe(1);
    expect(z.maxDeliveryDays).toBe(3);
    expect(z.codEnabled).toBe(true);
    expect(z.codCharge).toBeUndefined();
    expect(z.codMaxAmount).toBeUndefined();
    expect(z.isRemote).toBe(false);
    expect(z.isActive).toBe(true);
    expect(z.toIdVO.value).toBe(UUID);
  });
});
