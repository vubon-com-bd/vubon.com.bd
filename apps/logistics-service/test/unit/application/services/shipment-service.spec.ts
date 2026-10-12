/**
 * ShipmentService — orchestration branches with mocked repository.
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { ShipmentService } from '@application/services/impl/shipment.service.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const NOW = new Date().toISOString();
const ADDR = { line1: '12 Main St', city: 'Dhaka', country: 'BD' };

function mockRepo(overrides: Record<string, unknown> = {}): never {
  return {
    save: async (e: unknown) => e,
    existsByTrackingNumber: async () => false,
    findByTrackingNumber: async () => null,
    findByIdVO: async () => null,
    findByOrderId: async () => [],
    findPaginated: async () => ({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 }),
    getStats: async () => ({
      totalShipments: 0, inTransit: 0, delivered: 0, failed: 0,
      returned: 0, cancelled: 0, byStatus: {}, byPriority: {}, byCourier: {},
    }),
    ...overrides,
  } as never;
}

const mockCourierRepo = {
  findByIdVO: async () => ({ id: UUID }),
} as never;

const mockWarehouseRepo = {
  findByIdVO: async () => ({ id: UUID2 }),
} as never;

const baseInput = {
  orderId: UUID2,
  type: 'standard',
  shippingAddress: ADDR,
  packages: [{ orderItemId: 'oi1', quantity: 2 }],
  weightKg: 5,
};

describe('ShipmentService — branch coverage', () => {
  let service: ShipmentService;

  beforeEach(() => {
    service = new ShipmentService(mockRepo(), mockCourierRepo, mockWarehouseRepo);
  });

  it('create() — minimal valid input', async () => {
    const result = await service.create(baseInput as never);
    expect(result.orderId).toBe(UUID2);
    expect(result.itemCount).toBe(2);
    expect(result.status).toBe('pending');
  });

  it('create() — with courier + warehouse', async () => {
    const result = await service.create({ ...baseInput, courierId: UUID, warehouseId: UUID2 } as never);
    expect(result.courierId).toBe(UUID);
    expect(result.warehouseId).toBe(UUID2);
  });

  it('create() — courier not found throws', async () => {
    const s = new ShipmentService(
      mockRepo(),
      { findByIdVO: async () => null } as never,
      mockWarehouseRepo,
    );
    await expect(s.create({ ...baseInput, courierId: UUID } as never)).rejects.toThrow();
  });

  it('create() — warehouse not found throws', async () => {
    const s = new ShipmentService(
      mockRepo(),
      mockCourierRepo,
      { findByIdVO: async () => null } as never,
    );
    await expect(s.create({ ...baseInput, warehouseId: UUID2 } as never)).rejects.toThrow();
  });

  it('create() — COD with amount', async () => {
    const result = await service.create({ ...baseInput, isCOD: true, codAmount: 500 } as never);
    expect(result.isCOD).toBe(true);
    expect(result.codAmount).toBe(500);
  });

  it('create() — insured with declared value', async () => {
    const result = await service.create({ ...baseInput, isInsured: true, declaredValue: 5000 } as never);
    expect(result.isInsured).toBe(true);
    expect(result.declaredValue).toBe(5000);
  });

  it('create() — full optional fields', async () => {
    const result = await service.create({
      ...baseInput,
      userId: UUID, vendorId: UUID, priority: 'high',
      pickupAddress: ADDR, notes: 'urgent',
      shippingCost: 100, currency: 'BDT',
      dimensions: { lengthCm: 10, widthCm: 10, heightCm: 10 },
      volumeM3: 2,
    } as never);
    expect(result.priority).toBe('high');
    expect(result.userId).toBe(UUID);
    expect(result.notes).toBe('urgent');
  });

  it('create() — repository save error wrapped', async () => {
    const s = new ShipmentService(
      mockRepo({ save: async () => { throw new Error('db down'); } }),
      mockCourierRepo, mockWarehouseRepo,
    );
    await expect(s.create(baseInput as never)).rejects.toThrow();
  });

  it('getById() — not found throws', async () => {
    await expect(service.getById(UUID)).rejects.toThrow();
  });

  it('getById() — found returns DTO', async () => {
    const s = new ShipmentService(
      mockRepo({
        findByIdVO: async () => ({
          id: UUID, trackingNumber: { value: 'SHTEST12345678' },
          orderId: { value: UUID2 }, status: { value: 'pending' },
          type: { value: 'standard' }, priority: { value: 'normal' },
          dimensions: { actualWeightKg: { value: 5 }, chargeableWeightKg: { value: 5 }, volumetricWeightKg: undefined, dimensions: undefined },
          shippingAddress: { toAddress: () => ADDR },
          packages: [], itemCount: 0, isCOD: false, isInsured: false,
          createdAt: NOW, updatedAt: NOW,
        } as never),
      }),
      mockCourierRepo, mockWarehouseRepo,
    );
    const r = await s.getById(UUID);
    expect(r.id).toBe(UUID);
  });

  it('getByTrackingNumber()', async () => {
    await expect(service.getByTrackingNumber('SHTEST12345678')).rejects.toThrow();
  });

  it('listByOrder()', async () => {
    const r = await service.listByOrder(UUID2);
    expect(Array.isArray(r)).toBe(true);
  });

  it('list()', async () => {
    const r = await service.list({ page: 1, limit: 20 } as never);
    expect(r.total).toBe(0);
  });

  it('getStats()', async () => {
    const r = await service.getStats();
    expect(r.totalShipments).toBe(0);
  });

  it('cancel() — not found throws', async () => {
    await expect(service.cancel({ shipmentId: UUID, reason: 'test' } as never)).rejects.toThrow();
  });

  it('assignCourier() — courier not found', async () => {
    const s = new ShipmentService(
      mockRepo({ findByIdVO: async () => createMockEntity() }),
      { findByIdVO: async () => null } as never,
      mockWarehouseRepo,
    );
    await expect(s.assignCourier({ shipmentId: UUID, courierId: UUID } as never)).rejects.toThrow();
  });

  it('deliver()', async () => {
    const s = new ShipmentService(
      mockRepo({ findByIdVO: async () => createMockEntity('out_for_delivery') }),
      mockCourierRepo, mockWarehouseRepo,
    );
    const r = await s.deliver({ shipmentId: UUID, receivedBy: 'R' } as never);
    expect(r.id).toBe(UUID);
  });

  it('getPublic()', async () => {
    const s = new ShipmentService(
      mockRepo({ findByIdVO: async () => createMockEntity() }),
      mockCourierRepo, mockWarehouseRepo,
    );
    const r = await s.getPublic(UUID);
    expect(r.id).toBe(UUID);
  });
});

function createMockEntity(status = 'pending'): unknown {
  return {
    id: UUID,
    trackingNumber: { value: 'SHTEST12345678' },
    orderId: { value: UUID2 },
    userId: undefined, vendorId: undefined, warehouseId: undefined, courierId: undefined,
    type: { value: 'standard' }, priority: { value: 'normal' },
    status: {
      value: status,
      isPending: () => status === 'pending',
      isConfirmed: () => status === 'confirmed',
      isProcessing: () => status === 'processing',
      isPacked: () => status === 'packed',
      isPickedUp: () => status === 'picked_up',
      isInTransit: () => status === 'in_transit',
      isOutForDelivery: () => status === 'out_for_delivery',
      isDelivered: () => status === 'delivered',
      isFailed: () => status === 'failed',
      isReturned: () => status === 'returned',
      isCancelled: () => status === 'cancelled',
      isOnHold: () => status === 'on_hold',
      isDelayed: () => status === 'delayed',
      isFinal: () => ['delivered', 'returned', 'cancelled'].includes(status),
      isInFlight: () => ['picked_up', 'in_transit', 'out_for_delivery'].includes(status),
      canBeCancelled: () => !['picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled', 'returned'].includes(status),
      canBeModified: () => ['pending', 'confirmed', 'on_hold'].includes(status),
      canGenerateLabel: () => ['confirmed', 'processing', 'packed'].includes(status),
      canTransitionTo: () => true,
    },
    dimensions: {
      actualWeightKg: { value: 5 }, chargeableWeightKg: { value: 5 },
      volumetricWeightKg: undefined, dimensions: undefined,
    },
    shippingAddress: { toAddress: () => ADDR }, pickupAddress: undefined,
    customer: undefined, packages: [], itemCount: 0,
    isCOD: false, codAmount: undefined, isInsured: false,
    declaredValue: undefined, shippingCost: undefined,
    courierTrackingNumber: undefined, labelUrl: undefined,
    estimatedDeliveryAt: undefined, pickedUpAt: undefined,
    deliveredAt: undefined, returnedAt: undefined, cancelledAt: undefined,
    failureReason: undefined, notes: undefined,
    createdAt: NOW, updatedAt: NOW,
    hasCourier: () => false, hasWarehouse: () => false, hasLabel: () => false,
    canBeReturned: () => false, isReadyForPickup: () => false,
    confirm: () => {}, startProcessing: () => {}, markPacked: () => {},
    generateLabel: () => {}, pickup: () => {}, markInTransit: () => {},
    markOutForDelivery: () => {}, markDelivered: () => {}, markFailed: () => {},
    markReturned: () => {}, cancel: () => {}, putOnHold: () => {},
    release: () => {}, markDelayed: () => {}, assignCourier: () => {},
    assignWarehouse: () => {}, changePriority: () => {}, updateNotes: () => {},
  };
}
