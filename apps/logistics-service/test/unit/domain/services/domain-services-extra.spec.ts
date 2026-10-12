/**
 * Comprehensive tests for all domain services + algorithms.
 */
import { describe, it, expect } from '@jest/globals';

import { CourierSelectionService } from '@domain/services/courier-selection.service.js';
import { ShippingCostCalculatorService } from '@domain/services/shipping-cost-calculator.service.js';
import { DeliverySchedulingService } from '@domain/services/delivery-scheduling.service.js';
import { DriverAssignmentService } from '@domain/services/driver-assignment.service.js';
import { WarehouseAllocationService } from '@domain/services/warehouse-allocation.service.js';
import { InsurancePremiumService } from '@domain/services/insurance-premium.service.js';
import { RouteOptimizationService } from '@domain/services/route-optimization.service.js';
import { CourierTrackingUrlService } from '@domain/services/courier-tracking-url.service.js';

// ═══ RouteOptimization (38%) ═══
describe('RouteOptimizationService', () => {
  it('handles no geo stops → returns same order, distance 0', () => {
    const stops = [
      { id: 'a', latitude: undefined, longitude: undefined, hasGeo: () => false } as never,
      { id: 'b', latitude: undefined, longitude: undefined, hasGeo: () => false } as never,
    ];
    const r = RouteOptimizationService.optimize({
      stops, mode: { value: 'balanced', isCapacityAware: () => false } as never,
    });
    expect(r.totalDistanceKm).toBe(0);
    expect(r.orderedStopIds.length).toBe(2);
  });
  it('reorders stops by nearest-neighbor', () => {
    const mk = (id: string, lat: number, lng: number) => ({
      id, latitude: lat, longitude: lng,
      hasGeo: () => true,
    }) as never;
    const stops = [
      mk('far', 24.5, 91.0),
      mk('near', 23.81, 90.41),
      mk('mid', 23.9, 90.5),
    ];
    const r = RouteOptimizationService.optimize({
      stops, startLat: 23.8, startLng: 90.4,
      mode: { value: 'balanced' } as never,
    });
    expect(r.orderedStopIds[0]).toBe('near');
    expect(r.totalDistanceKm).toBeGreaterThan(0);
    expect(r.estimatedDurationMinutes).toBeGreaterThan(0);
  });
});

// ═══ WarehouseAllocation (38%) ═══
describe('WarehouseAllocationService', () => {
  function mkWarehouse(id: string, overrides: Record<string, unknown> = {}): never {
    return {
      id, isDefault: false, zone: 'z1',
      canAcceptInbound: () => true,
      isOpenNow: () => true,
      capacity: {
        canFit: () => true,
        availableKg: 1000,
        availableM3: 100,
      },
      utilizationPercent: { value: 40 },
      ...overrides,
    } as never;
  }

  it('returns preferred when eligible', () => {
    const w = mkWarehouse('w1');
    const r = WarehouseAllocationService.select({
      candidates: [w], volumeM3: 1, weightKg: 10, preferredWarehouseId: 'w1',
    });
    expect(r.reason).toBe('preferred_warehouse');
    expect(r.warehouse).toBe(w);
  });

  it('no eligible → null', () => {
    const w = mkWarehouse('w1', { canAcceptInbound: () => false });
    const r = WarehouseAllocationService.select({ candidates: [w], volumeM3: 1, weightKg: 10 });
    expect(r.warehouse).toBeNull();
    expect(r.reason).toBe('no_eligible_warehouse');
  });

  it('ranks: default wins', () => {
    const a = mkWarehouse('a', { isDefault: true });
    const b = mkWarehouse('b', { utilizationPercent: { value: 10 } });
    const r = WarehouseAllocationService.select({ candidates: [a, b], volumeM3: 1, weightKg: 10 });
    expect(r.reason).toBe('best_match');
    expect(r.warehouse).toBe(a);
  });

  it('rejects zone mismatch when not default', () => {
    const w = mkWarehouse('w1', { zone: 'z2', isDefault: false });
    const r = WarehouseAllocationService.select({
      candidates: [w], volumeM3: 1, weightKg: 10, zone: 'z1',
    });
    expect(r.warehouse).toBeNull();
  });

  it('closed warehouse rejected', () => {
    const w = mkWarehouse('w1', { isOpenNow: () => false });
    const r = WarehouseAllocationService.select({ candidates: [w], volumeM3: 1, weightKg: 10 });
    expect(r.warehouse).toBeNull();
  });
});

// ═══ CourierSelection (was > 60?) ═══
describe('CourierSelectionService', () => {
  function mkCourier(id: string, overrides: Record<string, unknown> = {}): never {
    return {
      id, isDefault: false, priority: 50,
      averageDeliveryDays: 3,
      isOperational: () => true,
      canShipTo: () => true,
      supportsCurrency: () => true,
      canHandle: () => true,
      supportsCOD: true,
      supportsInsurance: true,
      supportsInternational: true,
      ...overrides,
    } as never;
  }

  it('preferred wins', () => {
    const c = mkCourier('c1');
    const r = CourierSelectionService.select({
      availableCouriers: [c], preferredCourierId: 'c1',
      zone: 'z', weightKg: 1, currency: 'BDT',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.reason).toBe('preferred_courier');
  });

  it('no eligible', () => {
    const c = mkCourier('c1', { isOperational: () => false });
    const r = CourierSelectionService.select({
      availableCouriers: [c], zone: 'z', weightKg: 1, currency: 'BDT',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.courier).toBeNull();
    expect(r.reason).toBe('no_eligible_courier');
  });

  it('default is heavily favored', () => {
    const a = mkCourier('a', { isDefault: true });
    const b = mkCourier('b', { priority: 100 });
    const r = CourierSelectionService.select({
      availableCouriers: [a, b], zone: 'z', weightKg: 1, currency: 'BDT',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.courier).toBe(a);
  });

  it('rejects zone mismatch', () => {
    const c = mkCourier('c1', { canShipTo: () => false });
    const r = CourierSelectionService.select({
      availableCouriers: [c], zone: 'z', weightKg: 1, currency: 'BDT',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.courier).toBeNull();
  });

  it('rejects currency mismatch', () => {
    const c = mkCourier('c1', { supportsCurrency: () => false });
    const r = CourierSelectionService.select({
      availableCouriers: [c], zone: 'z', weightKg: 1, currency: 'USD',
      isCOD: false, isInsured: false, isInternational: false,
    });
    expect(r.courier).toBeNull();
  });
});

// ═══ DeliveryScheduling ═══
describe('DeliverySchedulingService', () => {
  function mkType(value: string, days: number, isSameDay = false, isExpress = false): never {
    return {
      value,
      isSameDay: () => isSameDay,
      isExpress: () => isExpress,
      estimatedDays: days,
    } as never;
  }
  const zone = { minDeliveryDays: 1, maxDeliveryDays: 5 } as never;

  it('same-day type before cutoff → 0 days', () => {
    const from = new Date();
    from.setHours(8, 0, 0, 0);
    const r = DeliverySchedulingService.estimate({
      type: mkType('same_day', 0, true), zone, fromDate: from,
    });
    expect(r.isSameDay).toBe(true);
    expect(r.estimatedDays).toBe(0);
  });

  it('same-day type after cutoff → 1 day', () => {
    const from = new Date();
    from.setHours(18, 0, 0, 0);
    const r = DeliverySchedulingService.estimate({
      type: mkType('same_day', 0, true), zone, fromDate: from,
    });
    expect(r.isSameDay).toBe(false);
  });

  it('express type → 1 day', () => {
    const r = DeliverySchedulingService.estimate({
      type: mkType('express', 1, false, true), zone,
    });
    expect(r.estimatedDays).toBe(1);
  });

  it('standard type → zone min', () => {
    const r = DeliverySchedulingService.estimate({
      type: mkType('standard', 3), zone,
    });
    expect(r.estimatedDays).toBeGreaterThanOrEqual(1);
    expect(r.latestAt).toBeDefined();
  });

  it('isBeforeSameDayCutoff', () => {
    const early = new Date();
    early.setHours(8);
    const late = new Date();
    late.setHours(20);
    expect(DeliverySchedulingService.isBeforeSameDayCutoff(early)).toBe(true);
    expect(DeliverySchedulingService.isBeforeSameDayCutoff(late)).toBe(false);
  });

  it('nextPickupSlot after business hours', () => {
    const late = new Date();
    late.setHours(22);
    const slot = DeliverySchedulingService.nextPickupSlot(late);
    expect(slot.getHours()).toBeLessThan(20);
  });
});

// ═══ InsurancePremium ═══
describe('InsurancePremiumService', () => {
  it('calculate', () => {
    const p = InsurancePremiumService.calculate({
      declaredValue: 10000, currency: 'BDT',
      type: { premiumPercent: 1, value: 'standard' } as never,
    });
    expect(p.amount).toBe(100);
  });
  it('rejects below min', () => {
    expect(() => InsurancePremiumService.calculate({
      declaredValue: 10, currency: 'BDT', type: { premiumPercent: 1 } as never,
    })).toThrow();
  });
  it('rejects above max', () => {
    expect(() => InsurancePremiumService.calculate({
      declaredValue: 99999999999, currency: 'BDT', type: { premiumPercent: 1 } as never,
    })).toThrow();
  });
  it('isCheaper with same currency', () => {
    expect(InsurancePremiumService.isCheaper(
      { amount: 100, currency: 'BDT' } as never,
      { amount: 200, currency: 'BDT' } as never,
    )).toBe(true);
  });
  it('isCheaper with different currency returns false', () => {
    expect(InsurancePremiumService.isCheaper(
      { amount: 100, currency: 'BDT' } as never,
      { amount: 200, currency: 'USD' } as never,
    )).toBe(false);
  });
});

// ═══ CourierTrackingUrl ═══
describe('CourierTrackingUrlService', () => {
  const courier = {
    code: { value: 'pathao' },
    trackingUrlTemplate: 'https://track/{trackingNumber}?c={courierCode}',
  } as never;

  it('builds url', () => {
    const url = CourierTrackingUrlService.build(courier, 'TRK123');
    expect(url).toBe('https://track/TRK123?c=pathao');
  });
  it('encodes values', () => {
    const c = { code: { value: 'a b' }, trackingUrlTemplate: 'https://x/{trackingNumber}/{courierCode}' } as never;
    const url = CourierTrackingUrlService.build(c, 'A B');
    expect(url).toContain('A%20B');
    expect(url).toContain('a%20b');
  });
  it('returns null when no template', () => {
    const c = { code: { value: 'x' }, trackingUrlTemplate: undefined } as never;
    expect(CourierTrackingUrlService.build(c, 'T')).toBeNull();
  });
  it('buildOrThrow throws when no template', () => {
    const c = { code: { value: 'x' }, trackingUrlTemplate: undefined } as never;
    expect(() => CourierTrackingUrlService.buildOrThrow(c, 'T')).toThrow();
  });
  it('rejects empty tracking number', () => {
    expect(() => CourierTrackingUrlService.build(courier, '')).toThrow();
  });
  it('extractPlaceholders', () => {
    const keys = CourierTrackingUrlService.extractPlaceholders('a/{x}/b/{y}');
    expect(keys).toEqual(['x', 'y']);
  });
});

// ═══ ShippingCostCalculator ═══
describe('ShippingCostCalculatorService', () => {
  function mkMethod(overrides: Record<string, unknown> = {}): never {
    return {
      baseCost: { amount: 60, currency: 'BDT' },
      freeAbove: undefined,
      ...overrides,
    } as never;
  }
  function mkZone(overrides: Record<string, unknown> = {}): never {
    return { isRemote: false, ...overrides } as never;
  }
  function mkDim(chargeableWeight: number): never {
    return { chargeableWeightKg: { value: chargeableWeight } } as never;
  }

  it('base + weight (no remote, no cod)', () => {
    const r = ShippingCostCalculatorService.calculate({
      method: mkMethod(), zone: mkZone(),
      dimensions: mkDim(2), orderValue: 500, isCOD: false, currency: 'BDT',
    });
    expect(r.baseCost).toBe(60);
    expect(r.currency).toBe('BDT');
    expect(r.isFreeShipping).toBe(false);
    expect(r.total.amount).toBeGreaterThan(0);
  });

  it('remote zone doubles via multiplier', () => {
    const r = ShippingCostCalculatorService.calculate({
      method: mkMethod(), zone: mkZone({ isRemote: true }),
      dimensions: mkDim(2), orderValue: 500, isCOD: false, currency: 'BDT',
    });
    expect(r.zoneMultiplier).toBe(2);
    expect(r.remoteSurcharge).toBeGreaterThan(0);
  });

  it('COD adds cod charge', () => {
    const r = ShippingCostCalculatorService.calculate({
      method: mkMethod(), zone: mkZone(),
      dimensions: mkDim(2), orderValue: 500, isCOD: true, currency: 'BDT',
    });
    expect(r.codCharge).toBeGreaterThan(0);
  });

  it('free shipping when orderValue above threshold', () => {
    const r = ShippingCostCalculatorService.calculate({
      method: mkMethod({ freeAbove: { amount: 1000, currency: 'BDT' } }),
      zone: mkZone(),
      dimensions: mkDim(1), orderValue: 1500, isCOD: false, currency: 'BDT',
    });
    expect(r.isFreeShipping).toBe(true);
    expect(r.discount).toBeGreaterThan(0);
  });

  it('heavy weight adds surcharge', () => {
    const r = ShippingCostCalculatorService.calculate({
      method: mkMethod(), zone: mkZone(),
      dimensions: mkDim(20), orderValue: 500, isCOD: false, currency: 'BDT',
    });
    expect(r.weightSurcharge).toBeGreaterThan(0);
  });
});

// ═══ DriverAssignment ═══
describe('DriverAssignmentService', () => {
  function mkDriver(id: string, overrides: Record<string, unknown> = {}): never {
    return {
      id, canBeAssigned: () => true, isLicenseExpired: () => false,
      availableCashLimit: 50000, totalDeliveries: 100,
      licenseType: { rank: 3 },
      warehouseId: { value: 'w1' },
      rating: 4.5, lastActiveAt: new Date().toISOString(),
      ...overrides,
    } as never;
  }
  it('preferred eligible wins', () => {
    const d = mkDriver('d1');
    const r = DriverAssignmentService.select({ availableDrivers: [d], preferredDriverId: 'd1' });
    expect(r.reason).toBe('preferred_driver');
  });
  it('no eligible → null', () => {
    const d = mkDriver('d1', { canBeAssigned: () => false });
    const r = DriverAssignmentService.select({ availableDrivers: [d] });
    expect(r.driver).toBeNull();
  });
  it('ranks by rating', () => {
    const a = mkDriver('a', { rating: 5 });
    const b = mkDriver('b', { rating: 3 });
    const r = DriverAssignmentService.select({ availableDrivers: [a, b] });
    expect(r.driver).toBe(a);
  });
  it('rejects expired license', () => {
    const d = mkDriver('d1', { isLicenseExpired: () => true });
    const r = DriverAssignmentService.select({ availableDrivers: [d] });
    expect(r.driver).toBeNull();
  });
  it('requires warehouse match', () => {
    const d = mkDriver('d1', { warehouseId: { value: 'other' } });
    const r = DriverAssignmentService.select({ availableDrivers: [d], warehouseId: 'w1' });
    expect(r.driver).toBeNull();
  });
  it('cash headroom filter', () => {
    const d = mkDriver('d1', { availableCashLimit: 100 });
    const r = DriverAssignmentService.select({ availableDrivers: [d], requiredCashHeadroom: 500 });
    expect(r.driver).toBeNull();
  });
  it('license type rank filter', () => {
    const d = mkDriver('d1', { licenseType: { rank: 2 } });
    const r = DriverAssignmentService.select({ availableDrivers: [d], requiredLicenseType: 'professional' });
    expect(r.driver).toBeNull();
  });
});
