/**
 * All service impls — CRUD + branch coverage with mocked repos.
 */
import { describe, it, expect } from '@jest/globals';

import { CourierService } from '@application/services/impl/courier.service.js';
import { WarehouseService } from '@application/services/impl/warehouse.service.js';
import { VehicleService } from '@application/services/impl/vehicle.service.js';
import { DriverService } from '@application/services/impl/driver.service.js';
import { ZoneService } from '@application/services/impl/zone.service.js';
import { ShippingMethodService } from '@application/services/impl/shipping-method.service.js';
import { PackagingService } from '@application/services/impl/packaging.service.js';
import { DeliveryService } from '@application/services/impl/delivery.service.js';
import { TrackingService } from '@application/services/impl/tracking.service.js';
import { RouteService } from '@application/services/impl/route.service.js';
import { FulfillmentService } from '@application/services/impl/fulfillment.service.js';
import { DispatchService } from '@application/services/impl/dispatch.service.js';
import { ReturnShipmentService } from '@application/services/impl/return-shipment.service.js';
import { InsuranceService } from '@application/services/impl/insurance.service.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const NOW = new Date().toISOString();
const ADDR = { line1: '12 Main St', city: 'Dhaka', country: 'BD' };

function mkRepo<T>(overrides: Record<string, unknown> = {}): T {
  return {
    save: async (e: unknown) => e,
    existsByCode: async () => false,
    existsByRegistration: async () => false,
    existsByLicense: async () => false,
    existsByRma: async () => false,
    existsByNumber: async () => false,
    existsByPolicyNumber: async () => false,
    existsByTrackingNumber: async () => false,
    findByIdVO: async () => null,
    findByCode: async () => null,
    findByTrackingNumber: async () => null,
    findByRma: async () => null,
    findByNumber: async () => null,
    findByPolicyNumber: async () => null,
    findByShipmentId: async () => null,
    findByOrderId: async () => [],
    findByUserId: async () => [],
    findByDriverId: async () => [],
    findByStatus: async () => [],
    findByType: async () => [],
    findByCourierId: async () => [],
    findByWarehouseId: async () => [],
    findByVendorId: async () => [],
    findByOriginalShipment: async () => [],
    findByClaimStatus: async () => [],
    findByDriver: async () => null,
    findByVehicle: async () => null,
    findActive: async () => [],
    findActiveByDriver: async () => [],
    findAcceptingInbound: async () => [],
    findAvailable: async () => [],
    findAssignable: async () => [],
    findAwaitingCourier: async () => [],
    findAwaitingInspection: async () => [],
    findAwaitingPickup: async () => [],
    findCapableOf: async () => [],
    findCoveringZone: async () => [],
    findDefault: async () => null,
    findEligibleFor: async () => [],
    findExpiring: async () => [],
    findForAddress: async () => null,
    findInFlight: async () => [],
    findInStock: async () => [],
    findLowStock: async () => [],
    findNeedingService: async () => [],
    findOperational: async () => [],
    findPaginated: async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 }),
    findPending: async () => [],
    findPendingApproval: async () => [],
    findPendingByWarehouse: async () => [],
    findPublicByTrackingNumber: async () => null,
    findReadyForPickup: async () => [],
    findReadyToShip: async () => [],
    findScheduledFor: async () => [],
    findSelectable: async () => [],
    findSlaBreached: async () => [],
    findStale: async () => [],
    findStaleAssigned: async () => [],
    findStaleNoUpdate: async () => [],
    findWithCapacity: async () => [],
    findWithExpiringLicense: async () => [],
    findWithOpenClaims: async () => [],
    clearDefaultExcept: async () => {},
    getStats: async () => ({
      totalShipments: 0, inTransit: 0, delivered: 0, failed: 0, returned: 0, cancelled: 0,
      totalPayments: 0, totalCaptured: 0, totalRefunded: 0, averageAmount: 0,
      totalPolicies: 0, activePolicies: 0, claimedPolicies: 0,
      totalDeclaredValue: 0, totalPremium: 0, currency: 'BDT',
      averageAttempts: 0, firstAttemptSuccessRate: 0,
      byStatus: {}, byPriority: {}, byCourier: {}, byGateway: {},
    }),
    softDelete: async () => {},
    ...overrides,
  } as T;
}

describe('CourierService — branches', () => {
  const svc = () => new CourierService(mkRepo({}) as never);
  it('register happy', async () => {
    const r = await svc().register({
      name: 'Pathao', code: 'pathao', displayName: 'Pathao', type: 'local',
      supportsCOD: true, supportsInsurance: false, supportsInternational: false,
      averageDeliveryDays: 3,
    } as never);
    expect(r.name).toBe('Pathao');
  });
  it('register duplicate throws', async () => {
    await expect(new CourierService(mkRepo({ existsByCode: async () => true }) as never).register({
      name: 'X', code: 'x', displayName: 'X', type: 'local',
      supportsCOD: false, supportsInsurance: false, supportsInternational: false,
      averageDeliveryDays: 3,
    } as never)).rejects.toThrow();
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('list', async () => {
    const r = await svc().list({ page: 1, limit: 20 } as never);
    expect(r.total).toBe(0);
  });
  it('getDefault null', async () => {
    expect(await svc().getDefault()).toBeNull();
  });
});

describe('WarehouseService — branches', () => {
  const svc = () => new WarehouseService(mkRepo({}) as never);
  it('create', async () => {
    const r = await svc().create({
      name: 'WH', code: 'WH-01', type: 'main',
      address: ADDR, capacityM3: 100, capacityKg: 1000, zone: 'dhaka',
    } as never);
    expect(r.name).toBe('WH');
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('list', async () => {
    const r = await svc().list({ page: 1, limit: 20 } as never);
    expect(r.total).toBe(0);
  });
  it('getDefault null', async () => {
    expect(await svc().getDefault()).toBeNull();
  });
});

describe('VehicleService — branches', () => {
  const svc = () => new VehicleService(mkRepo({}) as never);
  it('register', async () => {
    const r = await svc().register({
      registrationNumber: 'DHK-1', type: 'motorcycle', fuelType: 'petrol',
      make: 'H', model: 'CB', year: 2024, maxWeightKg: 100,
    } as never);
    expect(r.registrationNumber).toBe('DHK-1');
  });
  it('register duplicate throws', async () => {
    await expect(new VehicleService(mkRepo({ existsByRegistration: async () => true }) as never).register({
      registrationNumber: 'DHK-1', type: 'motorcycle', fuelType: 'petrol',
      make: 'H', model: 'CB', year: 2024, maxWeightKg: 100,
    } as never)).rejects.toThrow();
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('DriverService — branches', () => {
  const svc = () => new DriverService(mkRepo({}) as never);
  it('register', async () => {
    const r = await svc().register({
      name: 'K', phone: '+8801712345678', type: 'full_time',
      licenseNumber: 'L1', licenseType: 'light', licenseExpiresAt: NOW,
    } as never);
    expect(r.name).toBe('K');
  });
  it('register duplicate license', async () => {
    await expect(new DriverService(mkRepo({ existsByLicense: async () => true }) as never).register({
      name: 'K', phone: '+8801712345678', type: 'full_time',
      licenseNumber: 'L1', licenseType: 'light', licenseExpiresAt: NOW,
    } as never)).rejects.toThrow();
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('ZoneService — branches', () => {
  const svc = () => new ZoneService(mkRepo({}) as never);
  it('create', async () => {
    const r = await svc().create({
      name: 'Z', code: 'Z1', type: 'district', pricingType: 'flat',
      shippingCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true,
    } as never);
    expect(r.name).toBe('Z');
  });
  it('create duplicate', async () => {
    await expect(new ZoneService(mkRepo({ existsByCode: async () => true }) as never).create({
      name: 'Z', code: 'Z1', type: 'district', pricingType: 'flat',
      shippingCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true,
    } as never)).rejects.toThrow();
  });
  it('findByAddress null', async () => {
    expect(await svc().findByAddress({})).toBeNull();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('ShippingMethodService — branches', () => {
  const svc = () => new ShippingMethodService(
    mkRepo({}) as never,
    mkRepo({}) as never,
  );
  it('create', async () => {
    const r = await svc().create({
      name: 'S', code: 'standard', displayName: 'Std', rateType: 'flat',
      baseCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true, trackingEnabled: true,
    } as never);
    expect(r.name).toBe('S');
  });
  it('create duplicate', async () => {
    const s = new ShippingMethodService(
      mkRepo({ existsByCode: async () => true }) as never, mkRepo({}) as never,
    );
    await expect(s.create({
      name: 'S', code: 'standard', displayName: 'Std', rateType: 'flat',
      baseCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true, trackingEnabled: true,
    } as never)).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('PackagingService — branches', () => {
  const svc = () => new PackagingService(mkRepo({}) as never);
  it('create', async () => {
    const r = await svc().create({
      name: 'Box', code: 'BOX1', type: 'box', material: 'cardboard',
      lengthCm: 10, widthCm: 10, heightCm: 10, maxWeightKg: 5,
      isFragile: false, isTemperatureControlled: false, isRecyclable: true, stock: 10,
    } as never);
    expect(r.name).toBe('Box');
  });
  it('create duplicate', async () => {
    await expect(new PackagingService(mkRepo({ existsByCode: async () => true }) as never).create({
      name: 'B', code: 'B1', type: 'box', material: 'cardboard',
      lengthCm: 10, widthCm: 10, heightCm: 10, maxWeightKg: 5,
      isFragile: false, isTemperatureControlled: false, isRecyclable: true, stock: 10,
    } as never)).rejects.toThrow();
  });
  it('select returns array', async () => {
    expect(await svc().select({ weightKg: 1 })).toEqual([]);
  });
  it('getDefault null', async () => {
    expect(await svc().getDefault()).toBeNull();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('DeliveryService — branches', () => {
  const svc = () => new DeliveryService(mkRepo({}) as never);
  it('schedule', async () => {
    const r = await svc().schedule({
      shipmentId: UUID2, orderId: UUID, type: 'standard',
      deliveryAddress: ADDR, recipientName: 'R',
    } as never);
    expect(r.shipmentId).toBe(UUID2);
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('getByShipmentId null', async () => {
    expect(await svc().getByShipmentId(UUID2)).toBeNull();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('TrackingService — branches', () => {
  const svc = () => new TrackingService(mkRepo({}) as never);
  it('start', async () => {
    const r = await svc().start({ trackingNumber: 'SHTEST12345678' } as never);
    expect(r.trackingNumber).toBe('SHTEST12345678');
  });
  it('start duplicate throws', async () => {
    await expect(new TrackingService(mkRepo({ existsByTrackingNumber: async () => true }) as never).start({
      trackingNumber: 'SHTEST12345678',
    } as never)).rejects.toThrow();
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('getByTrackingNumber not found', async () => {
    await expect(svc().getByTrackingNumber('SHTEST12345678')).rejects.toThrow();
  });
  it('getPublicByTrackingNumber not found', async () => {
    await expect(svc().getPublicByTrackingNumber('SHTEST12345678')).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('RouteService — branches', () => {
  const svc = () => new RouteService(mkRepo({}) as never);
  it('create', async () => {
    const r = await svc().create({
      name: 'R1', code: 'RT-01', type: 'delivery', optimization: 'balanced',
      scheduledDate: NOW,
    } as never);
    expect(r.name).toBe('R1');
  });
  it('create duplicate', async () => {
    await expect(new RouteService(mkRepo({ existsByCode: async () => true }) as never).create({
      name: 'R1', code: 'RT-01', type: 'delivery', optimization: 'balanced', scheduledDate: NOW,
    } as never)).rejects.toThrow();
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('FulfillmentService — branches', () => {
  const svc = () => new FulfillmentService(mkRepo({}) as never);
  it('create', async () => {
    const r = await svc().create({
      orderId: UUID2, type: 'standard', itemIds: ['i1'],
    } as never);
    expect(r.orderId).toBe(UUID2);
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('DispatchService — branches', () => {
  const svc = () => new DispatchService(mkRepo({}) as never);
  it('create', async () => {
    const r = await svc().create({ type: 'single', shipmentIds: ['s1'] } as never);
    expect(r.type).toBe('single');
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('getByNumber not found', async () => {
    await expect(svc().getByNumber('DSP-20260115-0001')).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('ReturnShipmentService — branches', () => {
  const svc = () => new ReturnShipmentService(mkRepo({}) as never);
  it('request', async () => {
    const r = await svc().request({
      orderId: UUID2, userId: UUID, type: 'customer_return', reason: 'changed_mind',
      itemIds: ['i1'], pickupAddress: ADDR,
    } as never);
    expect(r.orderId).toBe(UUID2);
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('getByRma not found', async () => {
    await expect(svc().getByRma('RMA-2026-000123')).rejects.toThrow();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});

describe('InsuranceService — branches', () => {
  const svc = () => new InsuranceService(mkRepo({}) as never);
  it('purchase', async () => {
    const r = await svc().purchase({
      shipmentId: UUID2, type: 'standard', coverages: ['loss'],
      declaredValue: 5000, currency: 'BDT',
      startsAt: NOW, expiresAt: new Date(Date.now() + 86400000).toISOString(),
    } as never);
    expect(r.type).toBe('standard');
  });
  it('getById not found', async () => {
    await expect(svc().getById(UUID)).rejects.toThrow();
  });
  it('getByPolicyNumber not found', async () => {
    await expect(svc().getByPolicyNumber('POL-2026-000005')).rejects.toThrow();
  });
  it('getByShipmentId null', async () => {
    expect(await svc().getByShipmentId(UUID2)).toBeNull();
  });
  it('list', async () => {
    expect((await svc().list({ page: 1, limit: 20 } as never)).total).toBe(0);
  });
});
