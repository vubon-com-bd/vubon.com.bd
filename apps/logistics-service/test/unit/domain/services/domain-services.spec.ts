/**
 * Tests for remaining domain services.
 */
import { describe, it, expect } from '@jest/globals';

import { ShippingCostCalculatorService } from '@domain/services/shipping-cost-calculator.service.js';
import { DeliverySchedulingService } from '@domain/services/delivery-scheduling.service.js';
import { DriverAssignmentService } from '@domain/services/driver-assignment.service.js';
import { WarehouseAllocationService } from '@domain/services/warehouse-allocation.service.js';
import { InsurancePremiumService } from '@domain/services/insurance-premium.service.js';
import { RouteOptimizationService } from '@domain/services/route-optimization.service.js';
import { CourierSelectionService } from '@domain/services/courier-selection.service.js';
import { CourierTrackingUrlService } from '@domain/services/courier-tracking-url.service.js';

import { CourierEntity } from '@domain/entities/courier.entity.js';
import { ZoneEntity } from '@domain/entities/zone.entity.js';
import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
import { DriverEntity } from '@domain/entities/driver.entity.js';

import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo.js';
import { CourierTypeVO } from '@domain/value-objects/primitives/courier-type.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingCostVO } from '@domain/value-objects/primitives/shipping-cost.vo.js';
import { ShippingMethodValueVO } from '@domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '@domain/value-objects/primitives/shipping-rate-type.vo.js';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '@domain/value-objects/primitives/warehouse-type.vo.js';
import { CapacityVO } from '@domain/value-objects/composites/capacity.vo.js';
import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { ShipmentDimensionsVO } from '@domain/value-objects/composites/shipment-dimensions.vo.js';
import { DriverTypeVO } from '@domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '@domain/value-objects/primitives/driver-license-type.vo.js';
import { InsuranceTypeVO } from '@domain/value-objects/primitives/insurance-type.vo.js';
import { RouteStopVO } from '@domain/value-objects/composites/route-stop.vo.js';
import { RouteOptimizationVO } from '@domain/value-objects/primitives/route-optimization.vo.js';
import { DeliveryTypeVO } from '@domain/value-objects/primitives/delivery-type.vo.js';
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';

const NOW = '2026-01-01T00:00:00.000Z';
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const ADDR = AddressDetailsVO.create({ address: { line1: '12 Main', city: 'Dhaka', country: 'BD' } });

function makeCourier(props: Partial<Parameters<typeof CourierEntity.create>[0]['props']> = {}): CourierEntity {
  return CourierEntity.create({
    id: UUID, now: NOW,
    props: {
      name: 'C', code: CourierNameVO.pathao(), displayName: 'C',
      type: CourierTypeVO.local(),
      trackingUrlTemplate: 'https://ex.com/t/{trackingNumber}',
      apiEnabled: false,
      coverageZones: ['dhaka'],
      supportsCOD: true, supportsInsurance: true, supportsInternational: false,
      averageDeliveryDays: 2, isDefault: false, priority: 50,
      ...props,
    },
  });
}

function makeZone(): ZoneEntity {
  return ZoneEntity.create({
    id: UUID, now: NOW,
    props: {
      name: 'Z', code: 'DHK', type: ZoneTypeVO.district(),
      pricingType: ZonePricingTypeVO.flat(),
      postalCodes: [], districts: [], divisions: [],
      shippingCost: ShippingCostVO.create(60, 'BDT'),
      minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true, isRemote: false,
    },
  });
}

function makeMethod(): ShippingMethodEntity {
  return ShippingMethodEntity.create({
    id: UUID, now: NOW,
    props: {
      name: 'Std', code: ShippingMethodValueVO.standard(), displayName: 'Std',
      rateType: ShippingRateTypeVO.flat(),
      baseCost: ShippingCostVO.create(60, 'BDT'),
      minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true, trackingEnabled: true,
      coverageZones: [], couriers: [], isDefault: false,
    },
  });
}

function makeWarehouse(): WarehouseEntity {
  return WarehouseEntity.create({
    id: UUID, now: NOW,
    props: {
      code: WarehouseCodeVO.create('WH-01'), name: 'W', type: WarehouseTypeVO.main(),
      address: ADDR,
      capacity: CapacityVO.create({ capacityM3: 100, usedM3: 10, capacityKg: 1000, usedKg: 100 }),
      maxSkus: 1000, zone: 'dhaka', timezone: 'Asia/Dhaka', isDefault: false,
    },
  });
}

function makeDriver(): DriverEntity {
  return DriverEntity.create({
    id: UUID, now: NOW,
    props: {
      name: 'Rahim', phone: '+8801712345678' as never,
      type: DriverTypeVO.fullTime(),
      licenseNumber: 'DL-1', licenseType: DriverLicenseTypeVO.heavy(),
      licenseExpiresAt: '2030-01-01T00:00:00Z',
    },
  });
}

// ═══════════════════════════════════════════════════════════════
// COURIER SELECTION
// ═══════════════════════════════════════════════════════════════
describe('CourierSelectionService', () => {
  it('selects preferred courier when eligible', () => {
    const c = makeCourier({ status: undefined } as never);
    c.activate(NOW);
    const r = CourierSelectionService.select({
      availableCouriers: [c],
      preferredCourierId: c.id,
      zone: 'dhaka', weightKg: 2, currency: 'BDT',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.courier?.id).toBe(c.id);
    expect(r.reason).toBe('preferred_courier');
  });

  it('returns null when no eligible', () => {
    const r = CourierSelectionService.select({
      availableCouriers: [],
      zone: 'x', weightKg: 1, currency: 'BDT',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.courier).toBeNull();
    expect(r.reason).toBe('no_eligible_courier');
  });

  it('ranks candidates by default + priority', () => {
    const c1 = makeCourier();
    c1.activate(NOW);
    const c2 = makeCourier({ priority: 100 } as never);
    c2.activate(NOW);
    const r = CourierSelectionService.select({
      availableCouriers: [c1, c2],
      zone: 'dhaka', weightKg: 1, currency: 'BDT',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.courier).not.toBeNull();
    expect(r.candidateCount).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════
// SHIPPING COST
// ═══════════════════════════════════════════════════════════════
describe('ShippingCostCalculatorService', () => {
  it('computes base + weight surcharge', () => {
    const r = ShippingCostCalculatorService.calculate({
      method: makeMethod(),
      zone: makeZone(),
      dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 10 }),
      orderValue: 500,
      isCOD: false,
      currency: 'BDT',
    });
    expect(r.total.amount).toBeGreaterThan(0);
    expect(r.baseCost).toBe(60);
    expect(r.isFreeShipping).toBe(false);
  });

  it('free shipping when threshold met', () => {
    const m = makeMethod();
    const withFree = ShippingMethodEntity.create({
      id: UUID2, now: NOW,
      props: {
        name: 'Std', code: ShippingMethodValueVO.standard(), displayName: 'Std',
        rateType: ShippingRateTypeVO.flat(),
        baseCost: ShippingCostVO.create(60, 'BDT'),
        freeAbove: ShippingCostVO.create(1000, 'BDT'),
        minDeliveryDays: 1, maxDeliveryDays: 3,
        codEnabled: true, trackingEnabled: true,
        coverageZones: [], couriers: [], isDefault: false,
      },
    });
    const r = ShippingCostCalculatorService.calculate({
      method: withFree,
      zone: makeZone(),
      dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 2 }),
      orderValue: 2000,
      isCOD: false,
      currency: 'BDT',
    });
    expect(r.isFreeShipping).toBe(true);
    void m;
  });

  it('adds COD charge + remote surcharge', () => {
    const remote = ZoneEntity.create({
      id: UUID2, now: NOW,
      props: {
        name: 'R', code: 'REM', type: ZoneTypeVO.customPolygon(),
        pricingType: ZonePricingTypeVO.flat(),
        postalCodes: [], districts: [], divisions: [],
        shippingCost: ShippingCostVO.create(60, 'BDT'),
        minDeliveryDays: 1, maxDeliveryDays: 5, codEnabled: true, isRemote: true,
      },
    });
    const r = ShippingCostCalculatorService.calculate({
      method: makeMethod(),
      zone: remote,
      dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 2 }),
      orderValue: 500,
      isCOD: true,
      currency: 'BDT',
    });
    expect(r.remoteSurcharge).toBeGreaterThan(0);
    expect(r.codCharge).toBeGreaterThan(0);
    expect(r.zoneMultiplier).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════
// DELIVERY SCHEDULING
// ═══════════════════════════════════════════════════════════════
describe('DeliverySchedulingService', () => {
  it('estimates standard delivery', () => {
    const r = DeliverySchedulingService.estimate({
      type: DeliveryTypeVO.standard(),
      zone: makeZone(),
    });
    expect(r.estimatedDays).toBeGreaterThan(0);
    expect(r.earliestAt).toBeTruthy();
    expect(r.latestAt).toBeTruthy();
  });

  it('isBeforeSameDayCutoff', () => {
    expect(DeliverySchedulingService.isBeforeSameDayCutoff(new Date('2026-01-01T10:00:00'))).toBe(true);
    expect(DeliverySchedulingService.isBeforeSameDayCutoff(new Date('2026-01-01T15:00:00'))).toBe(false);
  });

  it('nextPickupSlot respects business hours', () => {
    const early = DeliverySchedulingService.nextPickupSlot(new Date('2026-01-01T05:00:00'));
    expect(early.getHours()).toBeGreaterThanOrEqual(8);
  });
});

// ═══════════════════════════════════════════════════════════════
// DRIVER ASSIGNMENT
// ═══════════════════════════════════════════════════════════════
describe('DriverAssignmentService', () => {
  it('preferred driver wins if eligible', () => {
    const d = makeDriver();
    const r = DriverAssignmentService.select({
      availableDrivers: [d],
      preferredDriverId: d.id,
    });
    expect(r.driver?.id).toBe(d.id);
  });

  it('returns null when no eligible', () => {
    const r = DriverAssignmentService.select({ availableDrivers: [] });
    expect(r.driver).toBeNull();
  });

  it('ranks by rating + deliveries', () => {
    const d1 = makeDriver();
    const d2 = makeDriver();
    d2.recordDelivery('sh1', 10, NOW);
    d2.updateRating(5, NOW);
    const r = DriverAssignmentService.select({ availableDrivers: [d1, d2] });
    expect(r.driver).not.toBeNull();
    expect(r.candidateCount).toBe(2);
  });
});

// ═══════════════════════════════════════════════════════════════
// WAREHOUSE ALLOCATION
// ═══════════════════════════════════════════════════════════════
describe('WarehouseAllocationService', () => {
  it('preferred warehouse wins', () => {
    const w = makeWarehouse();
    w.activate(NOW);
    const r = WarehouseAllocationService.select({
      candidates: [w],
      volumeM3: 1, weightKg: 10,
      preferredWarehouseId: w.id,
    });
    expect(r.warehouse?.id).toBe(w.id);
  });

  it('returns null when none eligible', () => {
    const r = WarehouseAllocationService.select({ candidates: [], volumeM3: 1, weightKg: 10 });
    expect(r.warehouse).toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════
// INSURANCE PREMIUM
// ═══════════════════════════════════════════════════════════════
describe('InsurancePremiumService', () => {
  it('calculates premium from declared value', () => {
    const p = InsurancePremiumService.calculate({
      declaredValue: 10000, currency: 'BDT', type: InsuranceTypeVO.standard(),
    });
    expect(p.amount).toBe(100);
    expect(p.currency).toBe('BDT');
  });

  it('rejects out-of-range declared value', () => {
    expect(() => InsurancePremiumService.calculate({ declaredValue: 10, currency: 'BDT', type: InsuranceTypeVO.basic() })).toThrow();
    expect(() => InsurancePremiumService.calculate({ declaredValue: 20000000, currency: 'BDT', type: InsuranceTypeVO.basic() })).toThrow();
  });

  it('isCheaper comparison', () => {
    const a = InsurancePremiumService.calculate({ declaredValue: 10000, currency: 'BDT', type: InsuranceTypeVO.basic() });
    const b = InsurancePremiumService.calculate({ declaredValue: 10000, currency: 'BDT', type: InsuranceTypeVO.fullCoverage() });
    expect(InsurancePremiumService.isCheaper(a, b)).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// ROUTE OPTIMIZATION
// ═══════════════════════════════════════════════════════════════
describe('RouteOptimizationService', () => {
  it('orders stops nearest-first', () => {
    const s1 = RouteStopVO.create({
      id: UUID, order: 0, location: 'A', address: 'St1', shipmentIds: ['sh1'], completed: false,
      latitude: 23.81, longitude: 90.41,
    });
    const s2 = RouteStopVO.create({
      id: UUID2, order: 1, location: 'B', address: 'St2', shipmentIds: ['sh2'], completed: false,
      latitude: 23.80, longitude: 90.40,
    });
    const r = RouteOptimizationService.optimize({
      stops: [s1, s2],
      startLat: 23.80, startLng: 90.40,
      mode: RouteOptimizationVO.shortestDistance(),
    });
    expect(r.orderedStopIds.length).toBe(2);
    expect(r.totalDistanceKm).toBeGreaterThanOrEqual(0);
    expect(r.estimatedDurationMinutes).toBeGreaterThan(0);
  });

  it('handles no-geo stops', () => {
    const s = RouteStopVO.create({
      id: UUID, order: 0, location: 'A', address: 'St1', shipmentIds: ['sh1'], completed: false,
    });
    const r = RouteOptimizationService.optimize({
      stops: [s],
      mode: RouteOptimizationVO.shortestDistance(),
    });
    expect(r.orderedStopIds).toEqual([UUID]);
  });
});

// ═══════════════════════════════════════════════════════════════
// COURIER TRACKING URL
// ═══════════════════════════════════════════════════════════════
describe('CourierTrackingUrlService', () => {
  it('substitutes tracking number', () => {
    const c = makeCourier();
    const url = CourierTrackingUrlService.build(c, 'SHTEST12345678');
    expect(url).toContain('SHTEST12345678');
  });

  it('returns null when no template', () => {
    const c = makeCourier({ trackingUrlTemplate: undefined } as never);
    expect(CourierTrackingUrlService.build(c, 'SHX')).toBeNull();
  });

  it('buildOrThrow throws when no template', () => {
    const c = makeCourier({ trackingUrlTemplate: undefined } as never);
    expect(() => CourierTrackingUrlService.buildOrThrow(c, 'SHX')).toThrow();
  });

  it('rejects empty tracking number', () => {
    const c = makeCourier();
    expect(() => CourierTrackingUrlService.build(c, '')).toThrow();
  });

  it('extractPlaceholders', () => {
    const placeholders = CourierTrackingUrlService.extractPlaceholders('/t/{trackingNumber}/{courierCode}');
    expect(placeholders).toEqual(['trackingNumber', 'courierCode']);
  });
});
