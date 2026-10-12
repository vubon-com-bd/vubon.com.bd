/**
 * ShipmentService — orchestration tests with mocked repositories.
 */
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ShipmentService } from '@application/services/impl/shipment.service.js';
import type { ShipmentRepository } from '@domain/repositories/shipment.repository.interface.js';
import type { CourierRepository } from '@domain/repositories/courier.repository.interface.js';
import type { WarehouseRepository } from '@domain/repositories/warehouse.repository.interface.js';
import { ShipmentEntity } from '@domain/entities/shipment.entity.js';
import { CourierEntity } from '@domain/entities/courier.entity.js';
import { WarehouseEntity } from '@domain/entities/warehouse.entity.js';
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

const NOW = '2026-01-01T00:00:00.000Z';
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const ADDR = { line1: '12 Main', city: 'Dhaka', country: 'BD' };

function makeShipmentEntity(status: 'pending' | 'confirmed' | 'processing' | 'packed' = 'pending'): ShipmentEntity {
  const base = ShipmentEntity.create({
    id: UUID, now: NOW,
    props: {
      trackingNumber: TrackingNumberVO.create('SHTEST12345678'),
      orderId: OrderIdVO.create(UUID),
      type: ShipmentTypeVO.standard(), priority: ShipmentPriorityVO.normal(),
      dimensions: ShipmentDimensionsVO.create({ actualWeightKg: 3 }),
      shippingAddress: AddressDetailsVO.create({ address: ADDR }),
      packages: [PackageRefVO.create({ orderItemId: UUID2, quantity: 1 })],
      itemCount: 1, isCOD: false, isInsured: false,
    },
  });
  if (status === 'confirmed') base.confirm(NOW);
  if (status === 'processing') { base.confirm(NOW); base.startProcessing(NOW); }
  if (status === 'packed') { base.confirm(NOW); base.startProcessing(NOW); base.markPacked(NOW); }
  return base;
}

function mkRepo(entity: ShipmentEntity): ShipmentRepository {
  return {
    findById: jest.fn(async () => entity),
    findByIdVO: jest.fn(async () => entity),
    findAll: jest.fn(async () => []),
    findByTrackingNumber: jest.fn(async () => entity),
    findByOrderId: jest.fn(async () => []),
    findByUserId: jest.fn(async () => []),
    findByVendorId: jest.fn(async () => []),
    findByCourierId: jest.fn(async () => []),
    findByWarehouseId: jest.fn(async () => []),
    findByStatus: jest.fn(async () => []),
    existsByTrackingNumber: jest.fn(async () => false),
    exists: jest.fn(async () => true),
    findPaginated: jest.fn(async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 })),
    countByOrder: jest.fn(async () => 0),
    getStats: jest.fn(async () => ({
      totalShipments: 0, inTransit: 0, delivered: 0, failed: 0,
      returned: 0, cancelled: 0, byStatus: {}, byPriority: {}, byCourier: {},
    })),
    findStale: jest.fn(async () => []),
    findReadyForPickup: jest.fn(async () => []),
    findAwaitingCourier: jest.fn(async () => []),
    save: jest.fn(async (e: ShipmentEntity) => e),
    delete: jest.fn(async () => undefined),
    softDelete: jest.fn(async () => undefined),
  } as unknown as ShipmentRepository;
}

function mkCourierRepo(): CourierRepository {
  return {
    findById: jest.fn(async () => null),
    findByIdVO: jest.fn(async () => CourierEntity.create({
      id: UUID2, now: NOW,
      props: {
        name: 'P', code: CourierNameVO.pathao(), displayName: 'P',
        type: CourierTypeVO.local(), apiEnabled: false,
        coverageZones: [], supportsCOD: true, supportsInsurance: false, supportsInternational: false,
        averageDeliveryDays: 2, isDefault: false, priority: 50,
      },
    })),
    findAll: jest.fn(async () => []),
    findByCode: jest.fn(async () => null),
    findByStatus: jest.fn(async () => []),
    findByType: jest.fn(async () => []),
    findOperational: jest.fn(async () => []),
    findDefault: jest.fn(async () => null),
    findCoveringZone: jest.fn(async () => []),
    findPaginated: jest.fn(async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 })),
    existsByCode: jest.fn(async () => false),
    exists: jest.fn(async () => false),
    save: jest.fn(async (e) => e),
    delete: jest.fn(async () => undefined),
    softDelete: jest.fn(async () => undefined),
    clearDefaultExcept: jest.fn(async () => undefined),
  } as unknown as CourierRepository;
}

function mkWarehouseRepo(): WarehouseRepository {
  return {
    findById: jest.fn(async () => null),
    findByIdVO: jest.fn(async () => WarehouseEntity.create({
      id: UUID2, now: NOW,
      props: {
        code: WarehouseCodeVO.create('WH-01'), name: 'W', type: WarehouseTypeVO.main(),
        address: AddressDetailsVO.create({ address: ADDR }),
        capacity: CapacityVO.create({ capacityM3: 100, usedM3: 0, capacityKg: 1000, usedKg: 0 }),
        maxSkus: 1000, zone: 'dhaka', timezone: 'Asia/Dhaka', isDefault: false,
      },
    })),
    findAll: jest.fn(async () => []),
    findByCode: jest.fn(async () => null),
    findByStatus: jest.fn(async () => []),
    findByType: jest.fn(async () => []),
    findByZone: jest.fn(async () => []),
    findAcceptingInbound: jest.fn(async () => []),
    findWithCapacity: jest.fn(async () => []),
    findDefault: jest.fn(async () => null),
    findPaginated: jest.fn(async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 })),
    existsByCode: jest.fn(async () => false),
    exists: jest.fn(async () => false),
    save: jest.fn(async (e) => e),
    delete: jest.fn(async () => undefined),
    softDelete: jest.fn(async () => undefined),
  } as unknown as WarehouseRepository;
}

const baseDto = () => ({
  orderId: UUID,
  type: 'standard' as never,
  shippingAddress: ADDR as never,
  packages: [{ orderItemId: UUID2, quantity: 1 }],
  weightKg: 3,
});

describe('ShipmentService', () => {
  it('create() creates shipment', async () => {
    const repo = mkRepo(makeShipmentEntity('pending'));
    const s = new ShipmentService(repo, mkCourierRepo(), mkWarehouseRepo());
    const r = await s.create(baseDto());
    expect(r.id).toBeDefined();
    expect(repo.save).toHaveBeenCalled();
  });

  it('create() with courier + warehouse validation', async () => {
    const repo = mkRepo(makeShipmentEntity('pending'));
    const s = new ShipmentService(repo, mkCourierRepo(), mkWarehouseRepo());
    await s.create({ ...baseDto(), courierId: UUID2, warehouseId: UUID2 });
    expect(repo.save).toHaveBeenCalled();
  });

  it('create() throws when courier not found', async () => {
    const repo = mkRepo(makeShipmentEntity('pending'));
    const cRepo = mkCourierRepo();
    (cRepo.findByIdVO as jest.Mock).mockResolvedValueOnce(null);
    const s = new ShipmentService(repo, cRepo, mkWarehouseRepo());
    await expect(s.create({ ...baseDto(), courierId: UUID2 })).rejects.toThrow();
  });

  it('confirm()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.confirm(UUID);
  });

  it('startProcessing()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('confirmed')), mkCourierRepo(), mkWarehouseRepo());
    await s.startProcessing(UUID);
  });

  it('markPacked()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('processing')), mkCourierRepo(), mkWarehouseRepo());
    await s.markPacked(UUID);
  });

  it('cancel()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.cancel({ shipmentId: UUID });
  });

  it('assignCourier()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.assignCourier({ shipmentId: UUID, courierId: UUID2 });
  });

  it('assignWarehouse()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.assignWarehouse({ shipmentId: UUID, warehouseId: UUID2 });
  });

  it('changePriority()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.changePriority({ shipmentId: UUID, priority: 'urgent' as never });
  });

  it('update()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.update({ shipmentId: UUID, notes: 'x' });
  });

  it('getById()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    const r = await s.getById(UUID);
    expect(r.id).toBe(UUID);
  });

  it('getByTrackingNumber()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.getByTrackingNumber('SHTEST12345678');
  });

  it('getPublic()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.getPublic(UUID);
  });

  it('listByOrder()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.listByOrder(UUID);
  });

  it('list()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.list({ page: 1, limit: 20 });
  });

  it('getStats()', async () => {
    const s = new ShipmentService(mkRepo(makeShipmentEntity('pending')), mkCourierRepo(), mkWarehouseRepo());
    await s.getStats();
  });

  it('getById throws when not found', async () => {
    const repo = mkRepo(makeShipmentEntity('pending'));
    (repo.findByIdVO as jest.Mock).mockResolvedValueOnce(null);
    const s = new ShipmentService(repo, mkCourierRepo(), mkWarehouseRepo());
    await expect(s.getById(UUID)).rejects.toThrow();
  });
});
