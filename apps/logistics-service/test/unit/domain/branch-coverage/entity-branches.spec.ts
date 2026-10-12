/**
 * Entity branch coverage — every conditional + guard in domain entities.
 */
import { describe, it, expect } from '@jest/globals';

import { ShipmentEntity } from '@domain/entities/shipment.entity.js';
import { CourierEntity } from '@domain/entities/courier.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
import { VehicleEntity } from '@domain/entities/vehicle.entity.js';
import { DriverEntity } from '@domain/entities/driver.entity.js';
import { ZoneEntity } from '@domain/entities/zone.entity.js';
import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity.js';
import { PackagingEntity } from '@domain/entities/packaging.entity.js';

import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { ShipmentTypeVO } from '@domain/value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '@domain/value-objects/primitives/shipment-priority.vo.js';
import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { ShipmentDimensionsVO } from '@domain/value-objects/composites/shipment-dimensions.vo.js';
import { PackageRefVO } from '@domain/value-objects/composites/package-ref.vo.js';
import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo.js';
import { CourierTypeVO } from '@domain/value-objects/primitives/courier-type.vo.js';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '@domain/value-objects/primitives/warehouse-type.vo.js';
import { CapacityVO } from '@domain/value-objects/composites/capacity.vo.js';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '@domain/value-objects/primitives/vehicle-fuel-type.vo.js';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '@domain/value-objects/primitives/driver-license-type.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingCostVO } from '@domain/value-objects/primitives/shipping-cost.vo.js';
import { ShippingMethodValueVO } from '@domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '@domain/value-objects/primitives/shipping-rate-type.vo.js';
import { PackagingTypeVO } from '@domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '@domain/value-objects/primitives/packaging-material.vo.js';
import { DimensionCmVO } from '@domain/value-objects/primitives/dimension-cm.vo.js';
import { WeightKgVO } from '@domain/value-objects/primitives/weight-kg.vo.js';
import { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '@domain/value-objects/primitives/warehouse-id.vo.js';

const NOW = '2026-01-01T00:00:00.000Z';
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const ADDR = AddressDetailsVO.create({ address: { line1: '12 Main', city: 'Dhaka', country: 'BD' } });

// ════════ SHIPMENT guard branches ════════
describe('ShipmentEntity — guard branches', () => {
  const baseProps = () => ({
    trackingNumber: TrackingNumberVO.create('SHTEST12345678'),
    orderId: OrderIdVO.create(UUID),
    type: ShipmentTypeVO.standard(),
    priority: ShipmentPriorityVO.normal(),
    dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 5 }),
    shippingAddress: ADDR,
    packages: [PackageRefVO.create({ orderItemId: UUID2, quantity: 1 })],
    itemCount: 1, isCOD: false, isInsured: false,
  });

  it('pickup without courier throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW);
    expect(() => s.pickup(undefined, NOW)).toThrow(/courier/);
  });

  it('generateLabel without packed throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    expect(() => s.generateLabel('https://l.x', NOW)).toThrow();
  });

  it('assignCourier after final throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.cancel(undefined, undefined, NOW);
    expect(() => s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW)).toThrow();
  });

  it('assignWarehouse after final throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.cancel(undefined, undefined, NOW);
    expect(() => s.assignWarehouse(WarehouseIdVO.reconstitute(UUID2), NOW)).toThrow();
  });

  it('changePriority when in-flight throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW); s.pickup(undefined, NOW);
    expect(() => s.changePriority(ShipmentPriorityVO.urgent(), NOW)).toThrow();
  });

  it('updateNotes when not modifiable throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.cancel(undefined, undefined, NOW);
    expect(() => s.updateNotes({ value: 'x' } as never, NOW)).toThrow();
  });

  it('invalid transitions throw', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    // pending → delivered is invalid
    expect(() => s.markDelivered(undefined, NOW)).toThrow();
    expect(() => s.markInTransit(NOW)).toThrow();
    expect(() => s.markOutForDelivery(NOW)).toThrow();
  });

  it('markFailed with short reason throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW); s.pickup(undefined, NOW);
    expect(() => s.markFailed('a', NOW)).toThrow();
  });

  it('markReturned with short reason throws', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW); s.pickup(undefined, NOW);
    s.markInTransit(NOW); s.markOutForDelivery(NOW); s.markDelivered(undefined, NOW);
    expect(() => s.markReturned('a', NOW)).toThrow();
  });

  it('markDelayed transitions correctly', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    s.assignCourier(CourierIdVO.reconstitute(UUID2), NOW);
    s.confirm(NOW); s.startProcessing(NOW); s.markPacked(NOW); s.pickup(undefined, NOW);
    s.markInTransit(NOW);
    s.markDelayed(undefined, 'traffic', NOW);
    expect(s.isDelayed()).toBe(true);
  });

  it('release only from on_hold', () => {
    const s = ShipmentEntity.create({ id: UUID, now: NOW, props: baseProps() });
    expect(() => s.release(NOW)).toThrow();
  });
});

// ════════ COURIER guards ════════
describe('CourierEntity — guard branches', () => {
  const props = () => ({
    name: 'P', code: CourierNameVO.pathao(), displayName: 'P',
    type: CourierTypeVO.local(), apiEnabled: false,
    coverageZones: ['dhaka'], supportsCOD: true, supportsInsurance: true,
    supportsInternational: false, averageDeliveryDays: 2, isDefault: false, priority: 50,
  });

  it('markAsDefault when not operational throws', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => c.markAsDefault(NOW)).toThrow();
  });

  it('changePriority out of range throws', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => c.changePriority(200, NOW)).toThrow();
  });

  it('invalid state transitions throw', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    c.activate(NOW);
    c.terminate('end', NOW);
    expect(() => c.activate(NOW)).toThrow();
  });

  it('supportsCurrency when config absent → true', () => {
    const c = CourierEntity.create({ id: UUID, now: NOW, props: props() });
    c.activate(NOW);
    expect(c.supportsCurrency('USD')).toBe(true);
  });

  it('coverageZones empty → canShipTo any zone', () => {
    const c = CourierEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), coverageZones: [] },
    });
    c.activate(NOW);
    expect(c.canShipTo('anywhere')).toBe(true);
  });
});

// ════════ WAREHOUSE guards ════════
describe('WarehouseEntity — guard branches', () => {
  const props = () => ({
    code: WarehouseCodeVO.create('WH-01'), name: 'W', type: WarehouseTypeVO.main(),
    address: ADDR,
    capacity: CapacityVO.create({ capacityM3: 100, usedM3: 10, capacityKg: 1000, usedKg: 100 }),
    maxSkus: 1000, zone: 'dhaka', timezone: 'Asia/Dhaka', isDefault: false,
  });

  it('completeMaintenance when not in maintenance throws', () => {
    const w = WarehouseEntity.create({ id: UUID, now: NOW, props: props() });
    w.activate(NOW);
    expect(() => w.completeMaintenance(NOW)).toThrow();
  });

  it('reserveCapacity over volume throws', () => {
    const w = WarehouseEntity.create({ id: UUID, now: NOW, props: props() });
    w.activate(NOW);
    expect(() => w.reserveCapacity(200, 100, NOW)).toThrow();
  });

  it('reserveCapacity over weight throws', () => {
    const w = WarehouseEntity.create({ id: UUID, now: NOW, props: props() });
    w.activate(NOW);
    expect(() => w.reserveCapacity(1, 5000, NOW)).toThrow();
  });

  it('reserveCapacity when not active throws', () => {
    const w = WarehouseEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => w.reserveCapacity(1, 10, NOW)).toThrow();
  });
});

// ════════ VEHICLE guards ════════
describe('VehicleEntity — guard branches', () => {
  const props = () => ({
    registrationNumber: 'DHA-GA-1', type: VehicleTypeVO.truckMedium(),
    fuelType: VehicleFuelTypeVO.diesel(), make: 'T', model: 'X', year: 2023,
    maxWeightKg: 5000, isActive: true,
  });

  it('updateMileage decreasing throws', () => {
    const v = VehicleEntity.create({ id: UUID, now: NOW, props: props() });
    v.updateMileage(500, NOW);
    expect(() => v.updateMileage(100, NOW)).toThrow();
  });

  it('completeMaintenance when not maintenance throws', () => {
    const v = VehicleEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => v.completeMaintenance(NOW)).toThrow();
  });

  it('needsServiceSoon when next service is close', () => {
    const v = VehicleEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), nextServiceAt: new Date(Date.now() + 3 * 86400000).toISOString() },
    });
    expect(v.needsServiceSoon()).toBe(true);
  });

  it('isInsuranceExpired / isRegistrationExpired', () => {
    const past = new Date(Date.now() - 1000).toISOString();
    const v = VehicleEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), insuranceExpiresAt: past, registrationExpiresAt: past },
    });
    expect(v.isInsuranceExpired()).toBe(true);
    expect(v.isRegistrationExpired()).toBe(true);
  });

  it('canCarry with volume limit', () => {
    const v = VehicleEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), maxVolumeM3: 10 },
    });
    expect(v.canCarry(1000, 5)).toBe(true);
    expect(v.canCarry(1000, 20)).toBe(false);
  });
});

// ════════ DRIVER guards ════════
describe('DriverEntity — guard branches', () => {
  const props = () => ({
    name: 'R', phone: '+8801712345678' as never,
    type: DriverTypeVO.fullTime(),
    licenseNumber: 'DL-1', licenseType: DriverLicenseTypeVO.heavy(),
    licenseExpiresAt: '2030-01-01T00:00:00.000Z',
  });

  it('receiveCash above limit throws', () => {
    const d = DriverEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => d.receiveCash(1_000_000, NOW)).toThrow();
  });

  it('remitCash exceeding cashInHand throws', () => {
    const d = DriverEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => d.remitCash(100, NOW)).toThrow();
  });

  it('updateRating out of range throws', () => {
    const d = DriverEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => d.updateRating(10, NOW)).toThrow();
    expect(() => d.updateRating(-1, NOW)).toThrow();
  });

  it('isLicenseExpiringSoon when close', () => {
    const close = new Date(Date.now() + 15 * 86400000).toISOString();
    const d = DriverEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), licenseExpiresAt: close },
    });
    expect(d.isLicenseExpiringSoon(30)).toBe(true);
  });

  it('isLicenseExpired when past', () => {
    const past = new Date(Date.now() - 1000).toISOString();
    const d = DriverEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), licenseExpiresAt: past },
    });
    expect(d.isLicenseExpired()).toBe(true);
  });
});

// ════════ ZONE guards ════════
describe('ZoneEntity — guard branches', () => {
  const props = () => ({
    name: 'D', code: 'DHK', type: ZoneTypeVO.district(),
    pricingType: ZonePricingTypeVO.flat(),
    postalCodes: ['1200'], districts: ['Dhaka'], divisions: ['Dhaka'],
    shippingCost: ShippingCostVO.create(60, 'BDT'),
    minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true, isRemote: false,
  });

  it('covers* predicates', () => {
    const z = ZoneEntity.create({ id: UUID, now: NOW, props: props() });
    expect(z.coversPostalCode('1200')).toBe(true);
    expect(z.coversPostalCode('9999')).toBe(false);
    expect(z.coversDistrict('Dhaka')).toBe(true);
    expect(z.coversDistrict('Nope')).toBe(false);
    expect(z.coversDivision('Dhaka')).toBe(true);
    expect(z.coversDivision('X')).toBe(false);
  });

  it('calculateShippingCost weight-based surcharge', () => {
    const z = ZoneEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), pricingType: ZonePricingTypeVO.weightBased() },
    });
    expect(z.calculateShippingCost(10).amount).toBe(110);
    expect(z.calculateShippingCost(2).amount).toBe(60);
  });
});

// ════════ SHIPPING METHOD guards ════════
describe('ShippingMethodEntity — guard branches', () => {
  const props = () => ({
    name: 'Std', code: ShippingMethodValueVO.standard(), displayName: 'Std',
    rateType: ShippingRateTypeVO.flat(),
    baseCost: ShippingCostVO.create(60, 'BDT'),
    minDeliveryDays: 1, maxDeliveryDays: 3,
    codEnabled: true, trackingEnabled: true,
    coverageZones: [], couriers: [], isDefault: false,
  });

  it('coversZone empty = all', () => {
    const m = ShippingMethodEntity.create({ id: UUID, now: NOW, props: props() });
    expect(m.coversZone('anything')).toBe(true);
  });

  it('canHandleWeight with maxWeightKg', () => {
    const m = ShippingMethodEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), maxWeightKg: WeightKgVO.create(50) },
    });
    expect(m.canHandleWeight(30)).toBe(true);
    expect(m.canHandleWeight(100)).toBe(false);
  });

  it('calculateCost weight-based surcharge', () => {
    const m = ShippingMethodEntity.create({
      id: UUID, now: NOW,
      props: { ...props(), rateType: ShippingRateTypeVO.weightBased() },
    });
    expect(m.calculateCost(500, 10).amount).toBeGreaterThan(60);
    expect(m.calculateCost(500, 2).amount).toBe(60);
  });
});

// ════════ PACKAGING guards ═══════════
describe('PackagingEntity — guard branches', () => {
  const props = () => ({
    name: 'Box', code: 'BOX-S', type: PackagingTypeVO.box(),
    material: PackagingMaterialVO.cardboard(),
    dimensions: DimensionCmVO.create(20, 15, 10),
    maxWeightKg: WeightKgVO.create(5),
    isFragile: true, isTemperatureControlled: true, isRecyclable: true,
    stock: 100, isDefault: false,
  });

  it('requiresSpecialHandling when fragile or temp-controlled', () => {
    const p = PackagingEntity.create({ id: UUID, now: NOW, props: props() });
    expect(p.requiresSpecialHandling()).toBe(true);
  });

  it('consume more than stock throws', () => {
    const p = PackagingEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => p.consume(1000, NOW)).toThrow();
  });

  it('consume negative throws', () => {
    const p = PackagingEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => p.consume(-1, NOW)).toThrow();
  });

  it('restock negative throws', () => {
    const p = PackagingEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => p.restock(-1, NOW)).toThrow();
  });

  it('adjustStock delta non-integer throws', () => {
    const p = PackagingEntity.create({ id: UUID, now: NOW, props: props() });
    expect(() => p.adjustStock(1.5, 'x', NOW)).toThrow();
  });

  it('canHold with dimensions', () => {
    const p = PackagingEntity.create({ id: UUID, now: NOW, props: props() });
    expect(p.canHold(3, { lengthCm: 10, widthCm: 10, heightCm: 5 })).toBe(true);
    expect(p.canHold(3, { lengthCm: 100, widthCm: 100, heightCm: 100 })).toBe(false);
  });
});
