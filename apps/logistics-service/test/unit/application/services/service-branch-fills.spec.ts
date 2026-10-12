/**
 * Application services — branch fill coverage.
 * Targets uncovered if/else, catch, nullish-coalescing branches in
 * RouteService, WarehouseService, ZoneService, ShippingMethodService.
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';

import { RouteService } from '@application/services/impl/route.service.js';
import { WarehouseService } from '@application/services/impl/warehouse.service.js';
import { ZoneService } from '@application/services/impl/zone.service.js';
import { ShippingMethodService } from '@application/services/impl/shipping-method.service.js';

import { RouteEntity } from '@domain/entities/route.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
import { ZoneEntity } from '@domain/entities/zone.entity.js';
import { ShippingMethodEntity } from '@domain/entities/shipping-method.entity.js';
import type { RouteRepository } from '@domain/repositories/route.repository.interface.js';
import type { WarehouseRepository } from '@domain/repositories/warehouse.repository.interface.js';
import type { ZoneRepository } from '@domain/repositories/zone.repository.interface.js';
import type { ShippingMethodRepository } from '@domain/repositories/shipping-method.repository.interface.js';

import { RouteCodeVO } from '@domain/value-objects/primitives/route-code.vo.js';
import { RouteStopVO } from '@domain/value-objects/composites/route-stop.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo.js';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '@domain/value-objects/primitives/route-optimization.vo.js';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseTypeVO } from '@domain/value-objects/primitives/warehouse-type.vo.js';
import { ZoneTypeVO } from '@domain/value-objects/primitives/zone-type.vo.js';
import { ZonePricingTypeVO } from '@domain/value-objects/primitives/zone-pricing-type.vo.js';
import { ShippingCostVO } from '@domain/value-objects/primitives/shipping-cost.vo.js';
import { ShippingMethodValueVO } from '@domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingRateTypeVO } from '@domain/value-objects/primitives/shipping-rate-type.vo.js';
import { AddressDetailsVO } from '@domain/value-objects/composites/address-details.vo.js';
import { CapacityVO } from '@domain/value-objects/composites/capacity.vo.js';
import { WeightKgVO } from '@domain/value-objects/primitives/weight-kg.vo.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const NOW = '2026-01-01T00:00:00.000Z';

const mkAddr = () => AddressDetailsVO.create({ address: { line1: '12 Main', city: 'Dhaka', country: 'BD' } });

// ═══════════════════════════════════════════════════════════════
// RouteService
// ═══════════════════════════════════════════════════════════════
function addBasicStop(e: RouteEntity, stopId = UUID2, lat?: number, lng?: number): void {
  e.addStop(RouteStopVO.create({
    id: stopId, order: 0, location: 'Dhaka', address: '12 Main',
    latitude: lat, longitude: lng, shipmentIds: [UUID],
  }));
}

function mkRoute(status: 'draft' | 'planned' | 'active' | 'completed' | 'cancelled' = 'draft'): RouteEntity {
  const e = RouteEntity.create({
    id: UUID, now: NOW,
    props: {
      name: 'Morning Route', code: RouteCodeVO.create('RT-01'),
      type: RouteTypeVO.delivery(), optimization: RouteOptimizationVO.shortestDistance(),
      scheduledDate: NOW,
      vehicleId: VehicleIdVO.reconstitute(UUID2),
      driverId: DriverIdVO.reconstitute(UUID2),
    },
  });
  addBasicStop(e);
  if (status === 'planned') e.plan(NOW);
  if (status === 'active') { e.plan(NOW); e.start(NOW); }
  if (status === 'completed') { e.plan(NOW); e.start(NOW); e.complete(NOW); }
  if (status === 'cancelled') e.cancel('test', NOW);
  return e;
}

function mkRouteRepo(entity: RouteEntity | null): RouteRepository {
  return {
    findById: jest.fn(async () => entity),
    findByIdVO: jest.fn(async () => entity),
    findAll: jest.fn(async () => (entity ? [entity] : [])),
    findByCode: jest.fn(async () => entity),
    findByStatus: jest.fn(async () => (entity ? [entity] : [])),
    findByType: jest.fn(async () => (entity ? [entity] : [])),
    findByDriver: jest.fn(async () => (entity ? [entity] : [])),
    findByVehicle: jest.fn(async () => (entity ? [entity] : [])),
    findByWarehouse: jest.fn(async () => (entity ? [entity] : [])),
    findActive: jest.fn(async () => (entity ? [entity] : [])),
    findScheduledFor: jest.fn(async () => (entity ? [entity] : [])),
    findPaginated: jest.fn(async () => ({
      items: entity ? [entity] : [], total: entity ? 1 : 0,
      page: 1, limit: 20, totalPages: entity ? 1 : 0,
    })),
    existsByCode: jest.fn(async () => false),
    exists: jest.fn(async () => entity !== null),
    save: jest.fn(async (e: RouteEntity) => e),
    delete: jest.fn(async () => undefined),
    softDelete: jest.fn(async () => undefined),
  } as unknown as RouteRepository;
}

describe('RouteService — branch fills', () => {
  it('create throws when code exists', async () => {
    const e = mkRoute();
    const repo = mkRouteRepo(e);
    (repo.existsByCode as jest.Mock).mockResolvedValueOnce(true as never);
    const svc = new RouteService(repo);
    await expect(svc.create({
      name: 'X', code: 'RT-99', type: 'delivery' as never,
      optimization: 'shortest_distance' as never, scheduledDate: NOW,
    } as never)).rejects.toThrow();
  });

  it('create success with all optional fields', async () => {
    const repo = mkRouteRepo(null);
    const svc = new RouteService(repo);
    const r = await svc.create({
      name: 'R', code: 'RT-NEW', type: 'delivery' as never,
      optimization: 'shortest_distance' as never, scheduledDate: NOW,
      warehouseId: UUID2, vehicleId: UUID2, driverId: UUID2,
      isRecurring: true, recurrenceRule: 'daily',
    } as never);
    expect(r).toBeDefined();
  });

  it('create success with no optional fields', async () => {
    const repo = mkRouteRepo(null);
    const svc = new RouteService(repo);
    const r = await svc.create({
      name: 'R', code: 'RT-NEW2', type: 'delivery' as never,
      optimization: 'shortest_distance' as never, scheduledDate: NOW,
    } as never);
    expect(r).toBeDefined();
  });

  it('create catch path — invalid dto triggers operation failed', async () => {
    const repo = mkRouteRepo(null);
    const svc = new RouteService(repo);
    await expect(svc.create({
      name: '', code: '', type: 'delivery' as never,
      optimization: 'shortest_distance' as never, scheduledDate: '',
    } as never)).rejects.toThrow();
  });

  it('addStop success', async () => {
    const e = mkRoute();
    const svc = new RouteService(mkRouteRepo(e));
    const r = await svc.addStop({
      routeId: UUID, stopId: '550e8400-e29b-41d4-a716-446655440099', order: 1,
      location: 'Dhaka', address: '12 Main', shipmentIds: [UUID],
    } as never);
    expect(r).toBeDefined();
  });

  it('addStop catch path — duplicate order throws', async () => {
    const e = mkRoute();
    const svc = new RouteService(mkRouteRepo(e));
    await expect(svc.addStop({
      routeId: UUID, stopId: '550e8400-e29b-41d4-a716-446655440009',
      order: 0, location: 'L', address: 'A', shipmentIds: [UUID],
    } as never)).rejects.toThrow();
  });

  it('removeStop success', async () => {
    const e = mkRoute();
    const svc = new RouteService(mkRouteRepo(e));
    const r = await svc.removeStop({ routeId: UUID, stopId: UUID2 } as never);
    expect(r).toBeDefined();
  });

  it('reorderStops success', async () => {
    const e = mkRoute();
    const svc = new RouteService(mkRouteRepo(e));
    const r = await svc.reorderStops({ routeId: UUID, orderedStopIds: [UUID2] } as never);
    expect(r).toBeDefined();
  });

  it('completeStop success', async () => {
    const e = mkRoute('active');
    const svc = new RouteService(mkRouteRepo(e));
    const r = await svc.completeStop({ routeId: UUID, stopId: UUID2 } as never);
    expect(r).toBeDefined();
  });

  it('optimize success', async () => {
    const e = mkRoute();
    const svc = new RouteService(mkRouteRepo(e));
    const r = await svc.optimize({ routeId: UUID, startLat: 23.7, startLng: 90.3 } as never);
    expect(r).toBeDefined();
  });

  it('optimize without start coords', async () => {
    const e = mkRoute();
    const svc = new RouteService(mkRouteRepo(e));
    const r = await svc.optimize({ routeId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('plan success', async () => {
    const svc = new RouteService(mkRouteRepo(mkRoute()));
    const r = await svc.plan({ routeId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('start — no vehicle/driver → error caught', async () => {
    // Inline route WITHOUT vehicle/driver to force canBeStarted() = false
    const bare = RouteEntity.create({
      id: UUID, now: NOW,
      props: {
        name: 'Bare', code: RouteCodeVO.create('RT-BARE'),
        type: RouteTypeVO.delivery(), optimization: RouteOptimizationVO.shortestDistance(),
        scheduledDate: NOW,
      },
    });
    bare.addStop(RouteStopVO.create({
      id: UUID2, order: 0, location: 'D', address: '12 Main St', shipmentIds: [UUID],
    }));
    bare.plan(NOW);
    const svc = new RouteService(mkRouteRepo(bare));
    await expect(svc.start({ routeId: UUID } as never)).rejects.toThrow();
  });

  it('start — success when all prereqs present', async () => {
    const svc = new RouteService(mkRouteRepo(mkRoute('planned')));
    const r = await svc.start({ routeId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('complete — from draft → error caught', async () => {
    const svc = new RouteService(mkRouteRepo(mkRoute()));
    await expect(svc.complete({ routeId: UUID } as never)).rejects.toThrow();
  });

  it('cancel success', async () => {
    const svc = new RouteService(mkRouteRepo(mkRoute('planned')));
    const r = await svc.cancel({ routeId: UUID, reason: 'weather' } as never);
    expect(r).toBeDefined();
  });

  it('getById not-found throws', async () => {
    const svc = new RouteService(mkRouteRepo(null));
    await expect(svc.getById(UUID)).rejects.toThrow();
  });

  it('getById success', async () => {
    const svc = new RouteService(mkRouteRepo(mkRoute()));
    const r = await svc.getById(UUID);
    expect(r).toBeDefined();
  });

  it('list returns paginated', async () => {
    const svc = new RouteService(mkRouteRepo(mkRoute()));
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// WarehouseService
// ═══════════════════════════════════════════════════════════════
function mkWarehouse(status: 'inactive' | 'active' | 'maintenance' | 'full' | 'closed' = 'inactive'): WarehouseEntity {
  const e = WarehouseEntity.create({
    id: UUID, now: NOW,
    props: {
      code: WarehouseCodeVO.create('WH-01'), name: 'Main',
      type: WarehouseTypeVO.main(), address: mkAddr(),
      capacity: CapacityVO.create({ capacityM3: 100, usedM3: 0, capacityKg: 1000, usedKg: 0 }),
      maxSkus: 1000, zone: 'dhaka', timezone: 'Asia/Dhaka', isDefault: false,
    },
  });
  if (status === 'active') e.activate(NOW);
  if (status === 'maintenance') { e.activate(NOW); e.startMaintenance(undefined, NOW); }
  if (status === 'full') { e.activate(NOW); e.markFull(NOW); }
  if (status === 'closed') { e.activate(NOW); e.close(NOW); }
  return e;
}

function mkWarehouseRepo(entity: WarehouseEntity | null): WarehouseRepository {
  return {
    findById: jest.fn(async () => entity),
    findByIdVO: jest.fn(async () => entity),
    findAll: jest.fn(async () => (entity ? [entity] : [])),
    findByCode: jest.fn(async () => entity),
    findByStatus: jest.fn(async () => (entity ? [entity] : [])),
    findByType: jest.fn(async () => (entity ? [entity] : [])),
    findByZone: jest.fn(async () => (entity ? [entity] : [])),
    findAcceptingInbound: jest.fn(async () => (entity ? [entity] : [])),
    findWithCapacity: jest.fn(async () => (entity ? [entity] : [])),
    findDefault: jest.fn(async () => entity),
    findPaginated: jest.fn(async () => ({
      items: entity ? [entity] : [], total: entity ? 1 : 0,
      page: 1, limit: 20, totalPages: entity ? 1 : 0,
    })),
    existsByCode: jest.fn(async () => false),
    exists: jest.fn(async () => entity !== null),
    save: jest.fn(async (e: WarehouseEntity) => e),
    delete: jest.fn(async () => undefined),
    softDelete: jest.fn(async () => undefined),
  } as unknown as WarehouseRepository;
}

describe('WarehouseService — branch fills', () => {
  it('create throws when code exists', async () => {
    const repo = mkWarehouseRepo(null);
    (repo.existsByCode as jest.Mock).mockResolvedValueOnce(true as never);
    const svc = new WarehouseService(repo);
    await expect(svc.create({
      name: 'W', code: 'WH-01', type: 'main',
      address: { line1: '12 Main St', city: 'Dhaka', country: 'BD' },
      capacityM3: 100, capacityKg: 1000, zone: 'dhaka',
    } as never)).rejects.toThrow();
  });

  it('create success with all optional fields', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(null));
    const r = await svc.create({
      name: 'W', code: 'WH-99', type: 'main',
      address: { line1: '12 Main St', city: 'Dhaka', country: 'BD' },
      contactName: 'N', contactPhone: '01711111111', contactEmail: 'a@b.com',
      capacityM3: 100, capacityKg: 1000, maxSkus: 500, zone: 'dhaka',
      operatingHoursStart: 6, operatingHoursEnd: 22, timezone: 'Asia/Dhaka',
      isDefault: true,
    } as never);
    expect(r).toBeDefined();
  });

  it('create success with no optional fields', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(null));
    const r = await svc.create({
      name: 'W', code: 'WH-98', type: 'main',
      address: { line1: '12 Main St', city: 'Dhaka', country: 'BD' },
      capacityM3: 100, capacityKg: 1000, zone: 'dhaka',
    } as never);
    expect(r).toBeDefined();
  });

  it('create catch — invalid dto', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(null));
    await expect(svc.create({ name: '', code: '' } as never)).rejects.toThrow();
  });

  it('update success with all fields', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    const r = await svc.update({
      warehouseId: UUID, name: 'N', contactName: 'CN',
      contactPhone: '01711111111', contactEmail: 'a@b.com',
      operatingHoursStart: 8, operatingHoursEnd: 20,
    } as never);
    expect(r).toBeDefined();
  });

  it('update success with no fields', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    const r = await svc.update({ warehouseId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('activate success', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('inactive')));
    const r = await svc.activate({ warehouseId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('deactivate success with reason and without', async () => {
    const svc1 = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    await svc1.deactivate({ warehouseId: UUID, reason: 'test' } as never);
    const svc2 = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    await svc2.deactivate({ warehouseId: UUID } as never);
  });

  it('startMaintenance with and without reason', async () => {
    const svc1 = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    await svc1.startMaintenance({ warehouseId: UUID, reason: 'fix' } as never);
    const svc2 = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    await svc2.startMaintenance({ warehouseId: UUID } as never);
  });

  it('completeMaintenance success', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('maintenance')));
    const r = await svc.completeMaintenance({ warehouseId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('reserveCapacity success', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    const r = await svc.reserveCapacity({ warehouseId: UUID, volumeM3: 5, weightKg: 10 } as never);
    expect(r).toBeDefined();
  });

  it('releaseCapacity success', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    const r = await svc.releaseCapacity({ warehouseId: UUID, volumeM3: 5, weightKg: 10 } as never);
    expect(r).toBeDefined();
  });

  it('getById not-found throws', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(null));
    await expect(svc.getById(UUID)).rejects.toThrow();
  });

  it('getById success', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    const r = await svc.getById(UUID);
    expect(r).toBeDefined();
  });

  it('list returns paginated', async () => {
    const svc = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    const r = await svc.list({ page: 1, limit: 10 });
    expect(r).toBeDefined();
  });

  it('getDefault null vs found', async () => {
    const svc1 = new WarehouseService(mkWarehouseRepo(null));
    expect(await svc1.getDefault()).toBeNull();
    const svc2 = new WarehouseService(mkWarehouseRepo(mkWarehouse('active')));
    expect(await svc2.getDefault()).not.toBeNull();
  });
});

// ═══════════════════════════════════════════════════════════════
// ZoneService
// ═══════════════════════════════════════════════════════════════
function mkZone(status: 'inactive' | 'active' | 'suspended' = 'inactive'): ZoneEntity {
  const e = ZoneEntity.create({
    id: UUID, now: NOW,
    props: {
      name: 'Dhaka', code: 'DHK-01', type: ZoneTypeVO.district(),
      pricingType: ZonePricingTypeVO.flat(),
      postalCodes: ['1000'], districts: ['Dhaka'], divisions: ['Dhaka'],
      shippingCost: ShippingCostVO.create(100, 'BDT'),
      minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true,
      isRemote: false,
    },
  });
  if (status === 'active') e.activate(NOW);
  if (status === 'suspended') { e.activate(NOW); e.suspend('test', NOW); }
  return e;
}

function mkZoneRepo(entity: ZoneEntity | null): ZoneRepository {
  return {
    findById: jest.fn(async () => entity),
    findByIdVO: jest.fn(async () => entity),
    findAll: jest.fn(async () => (entity ? [entity] : [])),
    findByCode: jest.fn(async () => entity),
    findByStatus: jest.fn(async () => (entity ? [entity] : [])),
    findByType: jest.fn(async () => (entity ? [entity] : [])),
    findActive: jest.fn(async () => (entity ? [entity] : [])),
    findByParent: jest.fn(async () => (entity ? [entity] : [])),
    findByPostalCode: jest.fn(async () => entity),
    findByDistrict: jest.fn(async () => entity),
    findByDivision: jest.fn(async () => (entity ? [entity] : [])),
    findForAddress: jest.fn(async () => entity),
    findPaginated: jest.fn(async () => ({
      items: entity ? [entity] : [], total: entity ? 1 : 0,
      page: 1, limit: 20, totalPages: entity ? 1 : 0,
    })),
    existsByCode: jest.fn(async () => false),
    exists: jest.fn(async () => entity !== null),
    save: jest.fn(async (e: ZoneEntity) => e),
    delete: jest.fn(async () => undefined),
    softDelete: jest.fn(async () => undefined),
  } as unknown as ZoneRepository;
}

describe('ZoneService — branch fills', () => {
  it('create throws when code exists', async () => {
    const repo = mkZoneRepo(null);
    (repo.existsByCode as jest.Mock).mockResolvedValueOnce(true as never);
    const svc = new ZoneService(repo);
    await expect(svc.create({
      name: 'Z', code: 'Z1', type: 'district', pricingType: 'flat',
      shippingCost: 100, currency: 'BDT',
      minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true,
    } as never)).rejects.toThrow();
  });

  it('create success with all optional fields', async () => {
    const svc = new ZoneService(mkZoneRepo(null));
    const r = await svc.create({
      name: 'Z', code: 'Z-NEW', type: 'district', pricingType: 'flat',
      parentId: UUID2, postalCodes: ['1000'], districts: ['D'], divisions: ['D'],
      shippingCost: 100, currency: 'BDT',
      minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true,
      codCharge: 10, codMaxAmount: 5000, isRemote: true,
    } as never);
    expect(r).toBeDefined();
  });

  it('create success with minimal fields', async () => {
    const svc = new ZoneService(mkZoneRepo(null));
    const r = await svc.create({
      name: 'Z', code: 'Z-NEW2', type: 'district', pricingType: 'flat',
      shippingCost: 100, currency: 'BDT',
      minDeliveryDays: 1, maxDeliveryDays: 3, codEnabled: true,
    } as never);
    expect(r).toBeDefined();
  });

  it('create catch — invalid', async () => {
    const svc = new ZoneService(mkZoneRepo(null));
    await expect(svc.create({ name: '', code: '' } as never)).rejects.toThrow();
  });

  it('update with both shippingCost + currency', async () => {
    const svc = new ZoneService(mkZoneRepo(mkZone('active')));
    const r = await svc.update({ zoneId: UUID, shippingCost: 200, currency: 'BDT' } as never);
    expect(r).toBeDefined();
  });

  it('update without shippingCost', async () => {
    const svc = new ZoneService(mkZoneRepo(mkZone('active')));
    const r = await svc.update({ zoneId: UUID, name: 'New' } as never);
    expect(r).toBeDefined();
  });

  it('activate success', async () => {
    const svc = new ZoneService(mkZoneRepo(mkZone('inactive')));
    const r = await svc.activate({ zoneId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('inactivate with/without reason', async () => {
    const svc1 = new ZoneService(mkZoneRepo(mkZone('active')));
    await svc1.inactivate({ zoneId: UUID, reason: 'x' } as never);
    const svc2 = new ZoneService(mkZoneRepo(mkZone('active')));
    await svc2.inactivate({ zoneId: UUID } as never);
  });

  it('suspend success', async () => {
    const svc = new ZoneService(mkZoneRepo(mkZone('active')));
    const r = await svc.suspend({ zoneId: UUID, reason: 'x' } as never);
    expect(r).toBeDefined();
  });

  it('getById not-found vs found', async () => {
    await expect(new ZoneService(mkZoneRepo(null)).getById(UUID)).rejects.toThrow();
    expect(await new ZoneService(mkZoneRepo(mkZone('active'))).getById(UUID)).toBeDefined();
  });

  it('findByAddress null vs found', async () => {
    expect(await new ZoneService(mkZoneRepo(null)).findByAddress({ district: 'D' })).toBeNull();
    expect(await new ZoneService(mkZoneRepo(mkZone('active'))).findByAddress({ district: 'D' })).not.toBeNull();
  });

  it('list returns paginated', async () => {
    const r = await new ZoneService(mkZoneRepo(mkZone('active'))).list({ page: 1, limit: 10 });
    expect(r).toBeDefined();
  });
});

// ═══════════════════════════════════════════════════════════════
// ShippingMethodService
// ═══════════════════════════════════════════════════════════════
function mkShippingMethod(status: 'active' | 'inactive' = 'active'): ShippingMethodEntity {
  const e = ShippingMethodEntity.create({
    id: UUID, now: NOW,
    props: {
      name: 'Standard', code: ShippingMethodValueVO.standard(), displayName: 'Standard',
      rateType: ShippingRateTypeVO.flat(),
      baseCost: ShippingCostVO.create(60, 'BDT'),
      minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true, trackingEnabled: true,
      coverageZones: [], couriers: [], isDefault: false,
    },
  });
  if (status === 'inactive') e.deactivate(undefined, NOW);
  return e;
}

function mkSmRepo(entity: ShippingMethodEntity | null): ShippingMethodRepository {
  return {
    findById: jest.fn(async () => entity),
    findByIdVO: jest.fn(async () => entity),
    findAll: jest.fn(async () => (entity ? [entity] : [])),
    findByCode: jest.fn(async () => entity),
    findByStatus: jest.fn(async () => (entity ? [entity] : [])),
    findSelectable: jest.fn(async () => (entity ? [entity] : [])),
    findByZone: jest.fn(async () => (entity ? [entity] : [])),
    findDefault: jest.fn(async () => entity),
    findEligibleFor: jest.fn(async () => (entity ? [entity] : [])),
    findPaginated: jest.fn(async () => ({
      items: entity ? [entity] : [], total: entity ? 1 : 0,
      page: 1, limit: 20, totalPages: entity ? 1 : 0,
    })),
    existsByCode: jest.fn(async () => false),
    exists: jest.fn(async () => entity !== null),
    save: jest.fn(async (e: ShippingMethodEntity) => e),
    delete: jest.fn(async () => undefined),
    softDelete: jest.fn(async () => undefined),
    clearDefaultExcept: jest.fn(async () => undefined),
  } as unknown as ShippingMethodRepository;
}

describe('ShippingMethodService — branch fills', () => {
  it('create throws when code exists', async () => {
    const smRepo = mkSmRepo(null);
    (smRepo.existsByCode as jest.Mock).mockResolvedValueOnce(true as never);
    const svc = new ShippingMethodService(smRepo, mkZoneRepo(null));
    await expect(svc.create({
      name: 'X', code: 'standard', displayName: 'X', rateType: 'flat',
      baseCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true, trackingEnabled: true,
    } as never)).rejects.toThrow();
  });

  it('create success with all fields', async () => {
    const svc = new ShippingMethodService(mkSmRepo(null), mkZoneRepo(null));
    const r = await svc.create({
      name: 'X', code: 'express', displayName: 'X', rateType: 'flat',
      baseCost: 60, freeAbove: 1000, currency: 'BDT',
      minDeliveryDays: 1, maxDeliveryDays: 3,
      maxWeightKg: 30, maxDimensionsCm: 200,
      codEnabled: true, trackingEnabled: true,
      coverageZones: ['z1'], couriers: ['c1'], isDefault: true,
    } as never);
    expect(r).toBeDefined();
  });

  it('create success with minimal', async () => {
    const svc = new ShippingMethodService(mkSmRepo(null), mkZoneRepo(null));
    const r = await svc.create({
      name: 'X', code: 'economy', displayName: 'X', rateType: 'flat',
      baseCost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3,
      codEnabled: true, trackingEnabled: true,
    } as never);
    expect(r).toBeDefined();
  });

  it('create catch — invalid', async () => {
    const svc = new ShippingMethodService(mkSmRepo(null), mkZoneRepo(null));
    await expect(svc.create({ name: '' } as never)).rejects.toThrow();
  });

  it('update with baseCost + currency', async () => {
    const svc = new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null));
    const r = await svc.update({ methodId: UUID, baseCost: 80, currency: 'BDT' } as never);
    expect(r).toBeDefined();
  });

  it('update without baseCost', async () => {
    const svc = new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null));
    const r = await svc.update({ methodId: UUID, displayName: 'X2' } as never);
    expect(r).toBeDefined();
  });

  it('activate', async () => {
    const r = await new ShippingMethodService(mkSmRepo(mkShippingMethod('inactive')), mkZoneRepo(null))
      .activate({ methodId: UUID } as never);
    expect(r).toBeDefined();
  });

  it('deactivate with/without reason', async () => {
    await new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null))
      .deactivate({ methodId: UUID, reason: 'x' } as never);
    await new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null))
      .deactivate({ methodId: UUID } as never);
  });

  it('suspend', async () => {
    const r = await new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null))
      .suspend({ methodId: UUID, reason: 'x' } as never);
    expect(r).toBeDefined();
  });

  it('calculateShipping success when selectable + zone found', async () => {
    const svc = new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(mkZone('active')));
    const r = await svc.calculateShipping({ methodId: UUID, orderValue: 500, weightKg: 2 } as never);
    expect(r).toBeDefined();
  });

  it('calculateShipping throws when zone not found', async () => {
    const svc = new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null));
    await expect(svc.calculateShipping({ methodId: UUID, orderValue: 500, weightKg: 2 } as never)).rejects.toThrow();
  });

  it('calculateShipping throws when method not selectable', async () => {
    const svc = new ShippingMethodService(mkSmRepo(mkShippingMethod('inactive')), mkZoneRepo(mkZone('active')));
    await expect(svc.calculateShipping({ methodId: UUID, orderValue: 500, weightKg: 2 } as never)).rejects.toThrow();
  });

  it('getById not-found vs found', async () => {
    await expect(new ShippingMethodService(mkSmRepo(null), mkZoneRepo(null)).getById(UUID)).rejects.toThrow();
    expect(await new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null)).getById(UUID)).toBeDefined();
  });

  it('list returns paginated', async () => {
    const r = await new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null))
      .list({ page: 1, limit: 10 });
    expect(r).toBeDefined();
  });

  it('getDefault null vs found', async () => {
    expect(await new ShippingMethodService(mkSmRepo(null), mkZoneRepo(null)).getDefault()).toBeNull();
    expect(await new ShippingMethodService(mkSmRepo(mkShippingMethod('active')), mkZoneRepo(null)).getDefault()).not.toBeNull();
  });
});
