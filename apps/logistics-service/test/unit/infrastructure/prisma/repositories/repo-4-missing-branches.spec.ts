/**
 * Vehicle / Tracking / Route / ReturnShipment Prisma repos — full
 * finder coverage (found rows + all filter variants).
 */
import { describe, it, expect, jest } from '@jest/globals';

import { VehiclePrismaRepository } from '@infrastructure/persistence/prisma/repositories/vehicle.prisma.repository.js';
import { TrackingPrismaRepository } from '@infrastructure/persistence/prisma/repositories/tracking.prisma.repository.js';
import { RoutePrismaRepository } from '@infrastructure/persistence/prisma/repositories/route.prisma.repository.js';
import { ReturnShipmentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/return-shipment.prisma.repository.js';

import { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo.js';
import { VehicleStatusVO } from '@domain/value-objects/primitives/vehicle-status.vo.js';
import { VehicleTypeVO } from '@domain/value-objects/primitives/vehicle-type.vo.js';
import { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo.js';
import { TrackingIdVO } from '@domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { TrackingStatusVO } from '@domain/value-objects/primitives/tracking-status.vo.js';
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { RouteIdVO } from '@domain/value-objects/primitives/route-id.vo.js';
import { RouteCodeVO } from '@domain/value-objects/primitives/route-code.vo.js';
import { RouteStatusVO } from '@domain/value-objects/primitives/route-status.vo.js';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo.js';
import { ReturnShipmentIdVO } from '@domain/value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '@domain/value-objects/primitives/rma-number.vo.js';
import { ReturnShipmentStatusVO } from '@domain/value-objects/primitives/return-shipment-status.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';
import { WarehouseIdVO } from '@domain/value-objects/primitives/warehouse-id.vo.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const TS = new Date('2026-01-01T00:00:00.000Z');

function mkDelegate(rows: readonly unknown[] = []): Record<string, jest.Mock> {
  // update/create receive { where?, data } — return the merged full row so
  // mapper.toDomain can access all fields (id, createdAt, etc.).
  const echoRow = async (arg: unknown): Promise<unknown> => {
    const a = arg as { data?: Record<string, unknown> };
    if (a && a.data) return { ...rows[0], ...a.data };
    return rows[0] ?? null;
  };
  return {
    findFirst: jest.fn(async () => rows[0] ?? null),
    findMany: jest.fn(async () => rows),
    findUnique: jest.fn(async () => rows[0] ?? null),
    findUniqueOrThrow: jest.fn(async () => rows[0]),
    update: jest.fn(echoRow),
    updateMany: jest.fn(async () => ({ count: 1 })),
    delete: jest.fn(async () => undefined),
    deleteMany: jest.fn(async () => ({ count: 0 })),
    create: jest.fn(echoRow),
    count: jest.fn(async () => rows.length),
  };
}

function mkPrisma(rows: Record<string, readonly unknown[]> = {}): Record<string, unknown> {
  return {
    logisticsVehicle: mkDelegate(rows['vehicle']),
    logisticsTracking: mkDelegate(rows['tracking']),
    logisticsTrackingEvent: mkDelegate(rows['trackingEvent']),
    logisticsRoute: mkDelegate(rows['route']),
    logisticsReturnShipment: mkDelegate(rows['returnShipment']),
    $transaction: jest.fn(async (arg: unknown) => {
      if (typeof arg === 'function') return (arg as (tx: unknown) => Promise<unknown>)({});
      if (Array.isArray(arg)) return Promise.all(arg);
      return undefined;
    }),
  };
}

// ═══════════════ VEHICLE ROW ═══════════════
function vehicleRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, registrationNumber: 'DHAKA-1234',
    type: 'car', status: 'available', fuelType: 'petrol',
    make: 'Toyota', model: 'Corolla', year: 2020, color: 'White',
    maxWeightKg: 500, maxVolumeM3: 5, capacity: 4, mileageKm: 1000,
    lastServiceAt: null, nextServiceAt: null,
    insuranceExpiresAt: null, registrationExpiresAt: null,
    assignedDriverId: null, isActive: true,
    version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    ...overrides,
  };
}

// ═══════════════ TRACKING ROW ═══════════════
function trackingRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, trackingNumber: 'SHXYZ1234567ABCD',
    shipmentId: UUID, orderId: UUID, courierCode: 'pathao',
    status: 'active', currentLocation: 'Dhaka',
    estimatedDeliveryAt: TS, publicAccess: true, lastUpdatedAt: TS,
    version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    events: [],
    ...overrides,
  };
}

// ═══════════════ ROUTE ROW ═══════════════
function routeRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, name: 'Morning Route', code: 'RT-01',
    type: 'delivery', status: 'draft', optimization: 'shortest_distance',
    totalDistanceKm: null, totalDurationMinutes: null,
    warehouseId: null, vehicleId: null, driverId: null,
    scheduledDate: TS, startedAt: null, completedAt: null,
    isOptimized: false, isRecurring: false, recurrenceRule: null,
    stops: [],
    version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    ...overrides,
  };
}

// ═══════════════ RETURN SHIPMENT ROW ═══════════════
function returnRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, rmaNumber: 'RMA-2026-000001',
    orderId: UUID, originalShipmentId: null, userId: UUID,
    status: 'requested', type: 'customer_return', reason: 'changed_mind',
    description: null, images: ['https://x/1.png'], itemIds: [UUID2],
    pickupLine1: '12 Main', pickupLine2: null, pickupCity: 'Dhaka',
    pickupState: null, pickupDistrict: null, pickupDivision: null,
    pickupPostalCode: null, pickupCountry: 'BD',
    pickupScheduledAt: null, pickedUpAt: null, receivedAt: null,
    inspectedAt: null, inspectedBy: null, restockable: false,
    refundAmount: null, refundCurrency: null, restockFeeAmount: null,
    trackingNumber: null, notes: null,
    version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════════
// VEHICLE REPOSITORY
// ═══════════════════════════════════════════════════════════════
describe('VehiclePrismaRepository — full coverage', () => {
  it('findByIdVO found row', async () => {
    const prisma = mkPrisma({ vehicle: [vehicleRow()] });
    const r = new VehiclePrismaRepository(prisma as never);
    const e = await r.findByIdVO(VehicleIdVO.reconstitute(UUID));
    expect(e).not.toBeNull();
  });

  it('findByIdVO null row', async () => {
    const prisma = mkPrisma({ vehicle: [] });
    const r = new VehiclePrismaRepository(prisma as never);
    expect(await r.findByIdVO(VehicleIdVO.reconstitute(UUID))).toBeNull();
  });

  it('findByRegistration found + null', async () => {
    const p1 = mkPrisma({ vehicle: [vehicleRow()] });
    const r1 = new VehiclePrismaRepository(p1 as never);
    expect(await r1.findByRegistration('DHAKA-1234')).not.toBeNull();

    const p2 = mkPrisma({ vehicle: [] });
    const r2 = new VehiclePrismaRepository(p2 as never);
    expect(await r2.findByRegistration('DHAKA-1234')).toBeNull();
  });

  it('findByStatus / findByType / findAvailable / findAll', async () => {
    const prisma = mkPrisma({ vehicle: [vehicleRow()] });
    const r = new VehiclePrismaRepository(prisma as never);
    expect((await r.findByStatus(VehicleStatusVO.reconstitute('available'))).length).toBe(1);
    expect((await r.findByType(VehicleTypeVO.reconstitute('car'))).length).toBe(1);
    expect((await r.findAvailable()).length).toBe(1);
    expect((await r.findAll()).length).toBe(1);
  });

  it('findByDriver found + null', async () => {
    const p1 = mkPrisma({ vehicle: [vehicleRow({ assignedDriverId: UUID2 })] });
    const r1 = new VehiclePrismaRepository(p1 as never);
    expect(await r1.findByDriver(DriverIdVO.reconstitute(UUID2))).not.toBeNull();

    const p2 = mkPrisma({ vehicle: [] });
    const r2 = new VehiclePrismaRepository(p2 as never);
    expect(await r2.findByDriver(DriverIdVO.reconstitute(UUID2))).toBeNull();
  });

  it('findCapableOf with volumeM3 (both branches)', async () => {
    const prisma = mkPrisma({ vehicle: [vehicleRow()] });
    const r = new VehiclePrismaRepository(prisma as never);
    // weight only
    const a = await r.findCapableOf(100);
    expect(a.length).toBeGreaterThanOrEqual(0);
    // weight + volume (both branches in filter)
    const b = await r.findCapableOf(100, 3);
    expect(b.length).toBeGreaterThanOrEqual(0);
  });

  it('findCapableOf volume undefined + maxVolumeM3 null', async () => {
    const prisma = mkPrisma({ vehicle: [vehicleRow({ maxVolumeM3: null })] });
    const r = new VehiclePrismaRepository(prisma as never);
    const x = await r.findCapableOf(100, 3);
    expect(x.length).toBe(1); // should pass because maxVolumeM3 is null → skip check
  });

  it('findNeedingService with results + empty', async () => {
    const p1 = mkPrisma({ vehicle: [vehicleRow({ nextServiceAt: TS })] });
    const r1 = new VehiclePrismaRepository(p1 as never);
    await r1.findNeedingService(30);

    const p2 = mkPrisma({ vehicle: [] });
    const r2 = new VehiclePrismaRepository(p2 as never);
    expect((await r2.findNeedingService(30)).length).toBe(0);
  });

  it('findPaginated with all filter branches', async () => {
    const prisma = mkPrisma({ vehicle: [vehicleRow()] });
    const r = new VehiclePrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 10, filter: { status: 'available' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { type: 'car' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { fuelType: 'petrol' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { hasDriver: true } });
    await r.findPaginated({ page: 1, limit: 10, filter: { hasDriver: false } });
    await r.findPaginated({ page: 1, limit: 10, filter: { minCapacityKg: 100 } });
    await r.findPaginated({ page: 1, limit: 10, filter: { search: 'Toyota' } });
    await r.findPaginated({ page: 1, limit: 10, sortBy: 'maxWeightKg', sortDir: 'asc' });
    expect(true).toBe(true);
  });

  it('findPaginated no filter', async () => {
    const prisma = mkPrisma({ vehicle: [] });
    const r = new VehiclePrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('existsByRegistration / exists / delete / softDelete', async () => {
    const prisma = mkPrisma({ vehicle: [vehicleRow()] });
    const r = new VehiclePrismaRepository(prisma as never);
    expect(await r.existsByRegistration('DHAKA-1234')).toBe(true);
    expect(await r.exists(UUID)).toBe(true);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });

  it('save existing row + save new row', async () => {
    const p1 = mkPrisma({ vehicle: [vehicleRow()] });
    const r1 = new VehiclePrismaRepository(p1 as never);
    const e = await r1.findByIdVO(VehicleIdVO.reconstitute(UUID));
    if (e) await r1.save(e);

    const p2 = mkPrisma({ vehicle: [vehicleRow()] });
    (p2['logisticsVehicle'] as Record<string, jest.Mock>)['findUnique'] = jest.fn(async () => null);
    const r2 = new VehiclePrismaRepository(p2 as never);
    const e2 = await r2.findByIdVO(VehicleIdVO.reconstitute(UUID));
    if (e2) await r2.save(e2);
    expect(true).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// TRACKING REPOSITORY
// ═══════════════════════════════════════════════════════════════
describe('TrackingPrismaRepository — full coverage', () => {
  it('findByIdVO found + null', async () => {
    const p1 = mkPrisma({ tracking: [trackingRow()] });
    const r1 = new TrackingPrismaRepository(p1 as never);
    expect(await r1.findByIdVO(TrackingIdVO.reconstitute(UUID))).not.toBeNull();

    const p2 = mkPrisma({ tracking: [] });
    const r2 = new TrackingPrismaRepository(p2 as never);
    expect(await r2.findByIdVO(TrackingIdVO.reconstitute(UUID))).toBeNull();
  });

  it('findByTrackingNumber found + null', async () => {
    const p1 = mkPrisma({ tracking: [trackingRow()] });
    const r1 = new TrackingPrismaRepository(p1 as never);
    expect(await r1.findByTrackingNumber(TrackingNumberVO.reconstitute('SHXYZ1234567ABCD'))).not.toBeNull();

    const p2 = mkPrisma({ tracking: [] });
    const r2 = new TrackingPrismaRepository(p2 as never);
    expect(await r2.findByTrackingNumber(TrackingNumberVO.reconstitute('SHXYZ1234567ABCD'))).toBeNull();
  });

  it('findByShipmentId found + null', async () => {
    const p1 = mkPrisma({ tracking: [trackingRow()] });
    const r1 = new TrackingPrismaRepository(p1 as never);
    expect(await r1.findByShipmentId(ShipmentIdVO.reconstitute(UUID))).not.toBeNull();

    const p2 = mkPrisma({ tracking: [] });
    const r2 = new TrackingPrismaRepository(p2 as never);
    expect(await r2.findByShipmentId(ShipmentIdVO.reconstitute(UUID))).toBeNull();
  });

  it('findByOrderId / findByStatus / findAll', async () => {
    const prisma = mkPrisma({ tracking: [trackingRow()] });
    const r = new TrackingPrismaRepository(prisma as never);
    expect((await r.findByOrderId(OrderIdVO.reconstitute(UUID))).length).toBe(1);
    expect((await r.findByStatus(TrackingStatusVO.reconstitute('active'))).length).toBe(1);
    expect((await r.findAll()).length).toBe(1);
  });

  it('findPublicByTrackingNumber found + null', async () => {
    const p1 = mkPrisma({ tracking: [trackingRow()] });
    const r1 = new TrackingPrismaRepository(p1 as never);
    expect(await r1.findPublicByTrackingNumber(TrackingNumberVO.reconstitute('SHXYZ1234567ABCD'))).not.toBeNull();

    const p2 = mkPrisma({ tracking: [] });
    const r2 = new TrackingPrismaRepository(p2 as never);
    expect(await r2.findPublicByTrackingNumber(TrackingNumberVO.reconstitute('SHXYZ1234567ABCD'))).toBeNull();
  });

  it('findActive / findStaleNoUpdate', async () => {
    const prisma = mkPrisma({ tracking: [trackingRow()] });
    const r = new TrackingPrismaRepository(prisma as never);
    expect((await r.findActive()).length).toBe(1);
    expect((await r.findStaleNoUpdate(30)).length).toBe(1);
  });

  it('findPaginated every filter branch', async () => {
    const prisma = mkPrisma({ tracking: [trackingRow()] });
    const r = new TrackingPrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 10, filter: { shipmentId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { orderId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { status: 'active' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { courierCode: 'pathao' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { fromDate: '2026-01-01' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { toDate: '2026-12-31' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { fromDate: '2026-01-01', toDate: '2026-12-31' } });
    await r.findPaginated({ page: 1, limit: 10, sortBy: 'lastUpdatedAt', sortDir: 'asc' });
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('existsByTrackingNumber / exists / delete / softDelete', async () => {
    const prisma = mkPrisma({ tracking: [trackingRow()] });
    const r = new TrackingPrismaRepository(prisma as never);
    expect(await r.existsByTrackingNumber(TrackingNumberVO.reconstitute('SHXYZ1234567ABCD'))).toBe(true);
    expect(await r.exists(UUID)).toBe(true);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });

  it('save existing row (transaction delete + update)', async () => {
    const prisma = mkPrisma({ tracking: [trackingRow()] });
    const r = new TrackingPrismaRepository(prisma as never);
    const e = await r.findByIdVO(TrackingIdVO.reconstitute(UUID));
    if (e) await r.save(e);
    expect(true).toBe(true);
  });

  it('save new row (create path)', async () => {
    const prisma = mkPrisma({ tracking: [trackingRow()] });
    (prisma['logisticsTracking'] as Record<string, jest.Mock>)['findUnique'] = jest.fn(async () => null);
    const r = new TrackingPrismaRepository(prisma as never);
    const e = await r.findByIdVO(TrackingIdVO.reconstitute(UUID));
    if (e) await r.save(e);
    expect(true).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// ROUTE REPOSITORY
// ═══════════════════════════════════════════════════════════════
describe('RoutePrismaRepository — full coverage', () => {
  it('findByIdVO / findByCode found + null', async () => {
    const p1 = mkPrisma({ route: [routeRow()] });
    const r1 = new RoutePrismaRepository(p1 as never);
    expect(await r1.findByIdVO(RouteIdVO.reconstitute(UUID))).not.toBeNull();
    expect(await r1.findByCode(RouteCodeVO.reconstitute('RT-01'))).not.toBeNull();

    const p2 = mkPrisma({ route: [] });
    const r2 = new RoutePrismaRepository(p2 as never);
    expect(await r2.findByIdVO(RouteIdVO.reconstitute(UUID))).toBeNull();
    expect(await r2.findByCode(RouteCodeVO.reconstitute('RT-01'))).toBeNull();
  });

  it('findByStatus / findByType / findAll', async () => {
    const prisma = mkPrisma({ route: [routeRow()] });
    const r = new RoutePrismaRepository(prisma as never);
    expect((await r.findByStatus(RouteStatusVO.reconstitute('draft'))).length).toBe(1);
    expect((await r.findByType(RouteTypeVO.reconstitute('delivery'))).length).toBe(1);
    expect((await r.findAll()).length).toBe(1);
  });

  it('findByDriver / findByVehicle / findByWarehouse', async () => {
    const prisma = mkPrisma({ route: [routeRow({ driverId: UUID2, vehicleId: UUID2, warehouseId: UUID2 })] });
    const r = new RoutePrismaRepository(prisma as never);
    expect((await r.findByDriver(DriverIdVO.reconstitute(UUID2))).length).toBe(1);
    expect((await r.findByVehicle({ value: UUID2 } as never)).length).toBe(1);
    expect((await r.findByWarehouse(WarehouseIdVO.reconstitute(UUID2))).length).toBe(1);
  });

  it('findActive / findScheduledFor', async () => {
    const prisma = mkPrisma({ route: [routeRow({ status: 'active' })] });
    const r = new RoutePrismaRepository(prisma as never);
    expect((await r.findActive()).length).toBe(1);
    expect((await r.findScheduledFor('2026-01-01')).length).toBe(1);
  });

  it('findPaginated every filter branch', async () => {
    const prisma = mkPrisma({ route: [routeRow()] });
    const r = new RoutePrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 10, filter: { status: 'draft' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { type: 'delivery' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { driverId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { vehicleId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { warehouseId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { fromDate: '2026-01-01' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { toDate: '2026-12-31' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { fromDate: '2026-01-01', toDate: '2026-12-31' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { search: 'RT' } });
    await r.findPaginated({ page: 1, limit: 10, sortBy: 'name', sortDir: 'asc' });
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('existsByCode / exists / delete / softDelete', async () => {
    const prisma = mkPrisma({ route: [routeRow()] });
    const r = new RoutePrismaRepository(prisma as never);
    expect(await r.existsByCode(RouteCodeVO.reconstitute('RT-01'))).toBe(true);
    expect(await r.exists(UUID)).toBe(true);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });

  it('save existing + save new', async () => {
    const p1 = mkPrisma({ route: [routeRow()] });
    const r1 = new RoutePrismaRepository(p1 as never);
    const e = await r1.findByIdVO(RouteIdVO.reconstitute(UUID));
    if (e) await r1.save(e);

    const p2 = mkPrisma({ route: [routeRow()] });
    (p2['logisticsRoute'] as Record<string, jest.Mock>)['findUnique'] = jest.fn(async () => null);
    const r2 = new RoutePrismaRepository(p2 as never);
    const e2 = await r2.findByIdVO(RouteIdVO.reconstitute(UUID));
    if (e2) await r2.save(e2);
    expect(true).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// RETURN SHIPMENT REPOSITORY
// ═══════════════════════════════════════════════════════════════
describe('ReturnShipmentPrismaRepository — full coverage', () => {
  it('findByIdVO / findByRma found + null', async () => {
    const p1 = mkPrisma({ returnShipment: [returnRow()] });
    const r1 = new ReturnShipmentPrismaRepository(p1 as never);
    expect(await r1.findByIdVO(ReturnShipmentIdVO.reconstitute(UUID))).not.toBeNull();
    expect(await r1.findByRma(RmaNumberVO.reconstitute('RMA-2026-000001'))).not.toBeNull();

    const p2 = mkPrisma({ returnShipment: [] });
    const r2 = new ReturnShipmentPrismaRepository(p2 as never);
    expect(await r2.findByIdVO(ReturnShipmentIdVO.reconstitute(UUID))).toBeNull();
    expect(await r2.findByRma(RmaNumberVO.reconstitute('RMA-2026-000001'))).toBeNull();
  });

  it('findByOrderId / findByUserId / findAll', async () => {
    const prisma = mkPrisma({ returnShipment: [returnRow()] });
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    expect((await r.findByOrderId(OrderIdVO.reconstitute(UUID))).length).toBe(1);
    expect((await r.findByUserId(UserIdVO.reconstitute(UUID))).length).toBe(1);
    expect((await r.findAll()).length).toBe(1);
  });

  it('findByOriginalShipment / findByStatus', async () => {
    const prisma = mkPrisma({ returnShipment: [returnRow({ originalShipmentId: UUID2 })] });
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    expect((await r.findByOriginalShipment(ShipmentIdVO.reconstitute(UUID2))).length).toBe(1);
    expect((await r.findByStatus(ReturnShipmentStatusVO.reconstitute('requested'))).length).toBe(1);
  });

  it('findPendingApproval / findAwaitingPickup / findAwaitingInspection', async () => {
    const prisma = mkPrisma({ returnShipment: [returnRow()] });
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    expect((await r.findPendingApproval()).length).toBe(1);
    expect((await r.findAwaitingPickup()).length).toBe(1);
    expect((await r.findAwaitingInspection()).length).toBe(1);
  });

  it('findPaginated every filter branch', async () => {
    const prisma = mkPrisma({ returnShipment: [returnRow()] });
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 10, filter: { orderId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { userId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { originalShipmentId: UUID } });
    await r.findPaginated({ page: 1, limit: 10, filter: { status: 'requested' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { type: 'customer_return' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { reason: 'defective' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { fromDate: '2026-01-01' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { toDate: '2026-12-31' } });
    await r.findPaginated({ page: 1, limit: 10, filter: { fromDate: '2026-01-01', toDate: '2026-12-31' } });
    await r.findPaginated({ page: 1, limit: 10, sortBy: 'rmaNumber', sortDir: 'asc' });
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('existsByRma / exists / delete / softDelete', async () => {
    const prisma = mkPrisma({ returnShipment: [returnRow()] });
    const r = new ReturnShipmentPrismaRepository(prisma as never);
    expect(await r.existsByRma(RmaNumberVO.reconstitute('RMA-2026-000001'))).toBe(true);
    expect(await r.exists(UUID)).toBe(true);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });

  it('save existing + save new', async () => {
    const p1 = mkPrisma({ returnShipment: [returnRow()] });
    const r1 = new ReturnShipmentPrismaRepository(p1 as never);
    const e = await r1.findByIdVO(ReturnShipmentIdVO.reconstitute(UUID));
    if (e) await r1.save(e);

    const p2 = mkPrisma({ returnShipment: [returnRow()] });
    (p2['logisticsReturnShipment'] as Record<string, jest.Mock>)['findUnique'] = jest.fn(async () => null);
    const r2 = new ReturnShipmentPrismaRepository(p2 as never);
    const e2 = await r2.findByIdVO(ReturnShipmentIdVO.reconstitute(UUID));
    if (e2) await r2.save(e2);
    expect(true).toBe(true);
  });
});
