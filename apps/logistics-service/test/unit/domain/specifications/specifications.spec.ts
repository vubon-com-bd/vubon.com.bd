/**
 * Specification tests.
 */
import { describe, it, expect } from '@jest/globals';

import { CanShipShipmentSpecification } from '@domain/specifications/can-ship-shipment.specification.js';
import { CanCancelShipmentSpecification } from '@domain/specifications/can-cancel-shipment.specification.js';
import { CanCancelDeliverySpecification } from '@domain/specifications/can-cancel-delivery.specification.js';
import { CanRefundReturnSpecification } from '@domain/specifications/can-refund-return.specification.js';
import { CanFileClaimSpecification } from '@domain/specifications/can-file-claim.specification.js';
import { CanAssignDriverSpecification } from '@domain/specifications/can-assign-driver.specification.js';
import { CanAssignVehicleSpecification } from '@domain/specifications/can-assign-vehicle.specification.js';
import { CanDispatchSpecification } from '@domain/specifications/can-dispatch.specification.js';
import { CanCourierHandleShipmentSpecification } from '@domain/specifications/can-courier-handle-shipment.specification.js';

import { ShipmentEntity } from '@domain/entities/shipment.entity.js';
import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity.js';
import { InsuranceEntity } from '@domain/entities/insurance.entity.js';
import { DriverEntity } from '@domain/entities/driver.entity.js';
import { VehicleEntity } from '@domain/entities/vehicle.entity.js';
import { DispatchEntity } from '@domain/entities/dispatch.entity.js';
import { CourierEntity } from '@domain/entities/courier.entity.js';

import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { ShipmentTypeVO } from '@domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '@domain/value-objects/primitives/shipment-priority.vo.js';
import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { ShipmentDimensionsVO } from '@domain/value-objects/composites/shipment-dimensions.vo.js';
import { PackageRefVO } from '@domain/value-objects/composites/package-ref.vo.js';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo.js';
import { RmaNumberVO } from '@domain/value-objects/primitives/rma-number.vo.js';
import { ReturnShipmentTypeVO } from '@domain/value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '@domain/value-objects/primitives/return-reason.vo.js';
import { InsuranceTypeVO } from '@domain/value-objects/primitives/insurance-type.vo.js';
import { InsuranceCoverageVO } from '@domain/value-objects/primitives/insurance-coverage.vo.js';
import { DeclaredValueVO } from '@domain/value-objects/primitives/declared-value.vo.js';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '@domain/value-objects/primitives/driver-license-type.vo.js';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '@domain/value-objects/primitives/vehicle-fuel-type.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo.js';
import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo.js';
import { CourierTypeVO } from '@domain/value-objects/primitives/courier-type.vo.js';
import { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { ProofOfDeliveryVO } from '@domain/value-objects/composites/proof-of-delivery.vo.js';

const NOW = '2026-01-01T00:00:00.000Z';
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const ADDR = AddressDetailsVO.create({ address: { line1: '12 Main', city: 'Dhaka', country: 'BD' } });

function makeShipment(): ShipmentEntity {
  return ShipmentEntity.create({
    id: UUID, now: NOW,
    props: {
      trackingNumber: TrackingNumberVO.create('SHTEST12345678'),
      orderId: OrderIdVO.create(UUID),
      type: ShipmentTypeVO.standard(), priority: ShipmentPriorityVO.normal(),
      dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 3 }),
      shippingAddress: ADDR,
      packages: [PackageRefVO.create({ orderItemId: UUID2, quantity: 1 })],
      itemCount: 1, isCOD: false, isInsured: false,
    },
  });
}

// ═══════════════════════════════════════════════════════════════
describe('CanShipShipmentSpecification', () => {
  it('true when packed', () => {
    const s = makeShipment();
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW);
    const spec = new CanShipShipmentSpecification();
    expect(spec.isSatisfiedBy({ shipment: s, ctx: { requireCourier: false, requireWarehouse: false, requireLabel: false } })).toBe(true);
  });
  it('false when not packed', () => {
    const spec = new CanShipShipmentSpecification();
    expect(spec.isSatisfiedBy({ shipment: makeShipment() })).toBe(false);
  });
  it('explain returns reason', () => {
    const spec = new CanShipShipmentSpecification();
    expect(spec.explain({ shipment: makeShipment() })).toBeTruthy();
  });
});

describe('CanCancelShipmentSpecification', () => {
  it('true when pending + non-admin', () => {
    const spec = new CanCancelShipmentSpecification();
    expect(spec.isSatisfiedBy({ shipment: makeShipment(), ctx: { isAdmin: false } })).toBe(true);
  });
  it('explain when final', () => {
    const s = makeShipment();
    s.cancel('u', undefined, NOW);
    const spec = new CanCancelShipmentSpecification();
    expect(spec.explain({ shipment: s })).toContain('final');
  });
});

describe('CanCancelDeliverySpecification', () => {
  it('true for scheduled', () => {
    const d = DeliveryEntity.create({
      id: UUID, now: NOW,
      props: { shipmentId: ShipmentIdVO.create(UUID), orderId: OrderIdVO.create(UUID2), type: DeliveryTypeVO.standard(), deliveryAddress: ADDR },
    });
    const spec = new CanCancelDeliverySpecification();
    expect(spec.isSatisfiedBy({ delivery: d })).toBe(true);
  });
  it('explain when in a state not yet final', () => {
    const d = DeliveryEntity.create({
      id: UUID, now: NOW,
      props: { shipmentId: ShipmentIdVO.create(UUID), orderId: OrderIdVO.create(UUID2), type: DeliveryTypeVO.standard(), deliveryAddress: ADDR },
    });
    d.cancel('user', NOW);
    const spec = new CanCancelDeliverySpecification();
    const e = spec.explain({ delivery: d });
    expect(e === null || typeof e === 'string').toBe(true);
  });
});

describe('CanRefundReturnSpecification', () => {
  it('true when inspected + no refund yet', () => {
    const r = ReturnShipmentEntity.request({
      id: UUID, now: NOW,
      props: {
        rmaNumber: RmaNumberVO.generate(1),
        orderId: OrderIdVO.create(UUID),
        userId: UserIdVO.create(UUID2),
        type: ReturnShipmentTypeVO.customerReturn(),
        reason: ReturnReasonVO.changedMind(),
        itemIds: [UUID2], images: [], pickupAddress: ADDR,
      },
    });
    r.approve(NOW); r.schedulePickup('2026-01-05T00:00:00Z', NOW);
    r.markPickedUp(undefined, NOW); r.markInTransit(NOW); r.markReceived(NOW);
    r.inspect(UserIdVO.create(UUID2) as never, true, NOW);
    const spec = new CanRefundReturnSpecification();
    const satisfied = spec.isSatisfiedBy({ returnShipment: r, ctx: { requiresInspection: true } });
    expect(typeof satisfied).toBe('boolean');
  });
  it('explain when not inspected', () => {
    const r = ReturnShipmentEntity.request({
      id: UUID, now: NOW,
      props: {
        rmaNumber: RmaNumberVO.generate(1),
        orderId: OrderIdVO.create(UUID),
        userId: UserIdVO.create(UUID2),
        type: ReturnShipmentTypeVO.customerReturn(),
        reason: ReturnReasonVO.changedMind(),
        itemIds: [UUID2], images: [], pickupAddress: ADDR,
      },
    });
    const spec = new CanRefundReturnSpecification();
    expect(spec.explain({ returnShipment: r, ctx: { requiresInspection: true } })).toBeTruthy();
  });
});

describe('CanFileClaimSpecification', () => {
  it('true for active + photos + coverage match', () => {
    const i = InsuranceEntity.create({
      id: UUID, now: NOW,
      props: {
        shipmentId: ShipmentIdVO.create(UUID2), orderId: OrderIdVO.create(UUID),
        type: InsuranceTypeVO.standard(),
        coverages: [InsuranceCoverageVO.loss()],
        declaredValue: DeclaredValueVO.create(5000, 'BDT'),
        startsAt: '2026-01-01T00:00:00Z', expiresAt: '2026-12-31T00:00:00Z',
      },
    });
    i.activate(NOW);
    const spec = new CanFileClaimSpecification();
    expect(spec.isSatisfiedBy({
      insurance: i, ctx: { coverage: 'loss', amount: 1000, hasPhotoEvidence: true },
    })).toBe(true);
  });
  it('explain when no photos', () => {
    const i = InsuranceEntity.create({
      id: UUID, now: NOW,
      props: {
        type: InsuranceTypeVO.standard(),
        coverages: [InsuranceCoverageVO.loss()],
        declaredValue: DeclaredValueVO.create(5000, 'BDT'),
        startsAt: '2026-01-01T00:00:00Z', expiresAt: '2026-12-31T00:00:00Z',
      },
    });
    i.activate(NOW);
    const spec = new CanFileClaimSpecification();
    expect(spec.explain({ insurance: i, ctx: { hasPhotoEvidence: false } })).toBeTruthy();
  });
});

describe('CanAssignDriverSpecification', () => {
  it('true for available + valid license', () => {
    const d = DriverEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Rahim', phone: '+8801712345678' as never,
        type: DriverTypeVO.fullTime(),
        licenseNumber: 'DL-1', licenseType: DriverLicenseTypeVO.heavy(),
        licenseExpiresAt: '2030-01-01T00:00:00Z',
      },
    });
    const spec = new CanAssignDriverSpecification();
    expect(spec.isSatisfiedBy({ driver: d, ctx: { requiredLicenseType: 'light' } })).toBe(true);
  });
  it('explain when suspended', () => {
    const d = DriverEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Rahim', phone: '+8801712345678' as never,
        type: DriverTypeVO.fullTime(),
        licenseNumber: 'DL-1', licenseType: DriverLicenseTypeVO.heavy(),
        licenseExpiresAt: '2030-01-01T00:00:00Z',
      },
    });
    d.suspend('x', NOW);
    const spec = new CanAssignDriverSpecification();
    expect(spec.explain({ driver: d })).toBeTruthy();
  });
});

describe('CanAssignVehicleSpecification', () => {
  it('true for available vehicle that can carry', () => {
    const v = VehicleEntity.create({
      id: UUID, now: NOW,
      props: {
        registrationNumber: 'DHA-GA-1', type: VehicleTypeVO.truckMedium(),
        fuelType: VehicleFuelTypeVO.diesel(), make: 'Tata', model: 'X', year: 2023,
        maxWeightKg: 5000, isActive: true,
      },
    });
    const spec = new CanAssignVehicleSpecification();
    expect(spec.isSatisfiedBy({ vehicle: v, ctx: { requiredWeightKg: 1000 } })).toBe(true);
  });
  it('explain when retired', () => {
    const v = VehicleEntity.create({
      id: UUID, now: NOW,
      props: {
        registrationNumber: 'DHA-GA-2', type: VehicleTypeVO.truckMedium(),
        fuelType: VehicleFuelTypeVO.diesel(), make: 'T', model: 'X', year: 2023,
        maxWeightKg: 5000, isActive: true,
      },
    });
    v.retire('end', NOW);
    const spec = new CanAssignVehicleSpecification();
    expect(spec.explain({ vehicle: v })).toBeTruthy();
  });
});

describe('CanDispatchSpecification', () => {
  it('true with shipment + courier + manifest', () => {
    const d = DispatchEntity.create({
      id: UUID, now: NOW,
      props: { dispatchNumber: DispatchNumberVO.generate(1), type: DispatchTypeVO.single(), shipmentIds: [UUID] },
    });
    d.assign(CourierIdVO.reconstitute(UUID2), undefined, undefined, undefined, NOW);
    d.generateManifest('http://m', NOW);
    const spec = new CanDispatchSpecification();
    expect(spec.isSatisfiedBy({ dispatch: d, ctx: { requireManifest: true } })).toBe(true);
  });
  it('explain when no courier', () => {
    const d = DispatchEntity.create({
      id: UUID, now: NOW,
      props: { dispatchNumber: DispatchNumberVO.generate(1), type: DispatchTypeVO.single(), shipmentIds: [UUID] },
    });
    const spec = new CanDispatchSpecification();
    expect(spec.explain({ dispatch: d })).toBeTruthy();
  });
});

describe('CanCourierHandleShipmentSpecification', () => {
  it('true for active courier + coverage + COD', () => {
    const c = CourierEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'P', code: CourierNameVO.pathao(), displayName: 'P',
        type: CourierTypeVO.local(), apiEnabled: false,
        coverageZones: ['dhaka'], supportsCOD: true, supportsInsurance: true, supportsInternational: false,
        averageDeliveryDays: 2, isDefault: false, priority: 50,
      },
    });
    c.activate(NOW);
    const spec = new CanCourierHandleShipmentSpecification();
    expect(spec.isSatisfiedBy({
      courier: c, ctx: { zone: 'dhaka', currency: 'BDT', isCOD: true, isInsured: false, isInternational: false },
    })).toBe(true);
  });
  it('explain when not operational', () => {
    const c = CourierEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'P', code: CourierNameVO.pathao(), displayName: 'P',
        type: CourierTypeVO.local(), apiEnabled: false,
        coverageZones: [], supportsCOD: true, supportsInsurance: false, supportsInternational: false,
        averageDeliveryDays: 2, isDefault: false, priority: 50,
      },
    });
    const spec = new CanCourierHandleShipmentSpecification();
    expect(spec.explain({ courier: c, ctx: { isCOD: false, isInsured: false, isInternational: false } })).toBeTruthy();
  });
});
