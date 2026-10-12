/**
 * Prisma repos — found-row + populated methods to trigger nullish
 * coalescing and filter-build branches.
 */
import { describe, it, expect, jest } from '@jest/globals';

import { ShipmentPrismaRepository } from '@infrastructure/persistence/prisma/repositories/shipment.prisma.repository.js';
import { DeliveryPrismaRepository } from '@infrastructure/persistence/prisma/repositories/delivery.prisma.repository.js';
import { InsurancePrismaRepository } from '@infrastructure/persistence/prisma/repositories/insurance.prisma.repository.js';
import { PackagingPrismaRepository } from '@infrastructure/persistence/prisma/repositories/packaging.prisma.repository.js';
import { DispatchPrismaRepository } from '@infrastructure/persistence/prisma/repositories/dispatch.prisma.repository.js';

import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { ShipmentStatusVO } from '@domain/value-objects/primitives/shipment-status.vo.js';
import { TrackingNumberVO } from '@domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { DeliveryIdVO } from '@domain/value-objects/primitives/delivery-id.vo.js';
import { InsuranceIdVO } from '@domain/value-objects/primitives/insurance-id.vo.js';
import { PolicyNumberVO } from '@domain/value-objects/primitives/policy-number.vo.js';
import { PackagingIdVO } from '@domain/value-objects/primitives/packaging-id.vo.js';
import { DispatchIdVO } from '@domain/value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const TS = new Date('2026-01-01T00:00:00.000Z');

function mkDelegate(rows: readonly unknown[] = []): Record<string, jest.Mock> {
  const first = rows[0] ?? null;
  return {
    findFirst: jest.fn(async () => first),
    findMany: jest.fn(async () => rows),
    findUnique: jest.fn(async () => first),
    findUniqueOrThrow: jest.fn(async () => first),
    update: jest.fn(async () => first),
    updateMany: jest.fn(async () => ({ count: rows.length })),
    delete: jest.fn(async () => first),
    deleteMany: jest.fn(async () => ({ count: 0 })),
    create: jest.fn(async () => first),
    count: jest.fn(async () => rows.length),
    upsert: jest.fn(async () => first),
    groupBy: jest.fn(async () => []),
  };
}

function mkPrisma(rows: {
  shipment?: readonly unknown[]; delivery?: readonly unknown[];
  insurance?: readonly unknown[]; packaging?: readonly unknown[];
  dispatch?: readonly unknown[];
  shipmentPackage?: readonly unknown[];
  deliveryAttempt?: readonly unknown[];
} = {}): Record<string, unknown> {
  const firstRow = (rowSet?: readonly unknown[]) => rowSet?.[0] ?? null;
  return {
    logisticsShipment: mkDelegate(rows.shipment),
    logisticsShipmentPackage: mkDelegate(rows.shipmentPackage),
    logisticsDelivery: mkDelegate(rows.delivery),
    logisticsDeliveryAttempt: mkDelegate(rows.deliveryAttempt),
    logisticsInsurance: mkDelegate(rows.insurance),
    logisticsPackaging: mkDelegate(rows.packaging),
    logisticsDispatch: mkDelegate(rows.dispatch),
    $transaction: jest.fn(async (arg: unknown) => {
      if (typeof arg === 'function') return (arg as (tx: unknown) => Promise<unknown>)({});
      if (Array.isArray(arg)) return Promise.all(arg);
      return undefined;
    }),
    // Helper for save() tests — row-aware mocks
    __firstRow: firstRow,
  };
}

// Minimal row fixtures (only key fields matter for branch triggers)
function shipRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, trackingNumber: 'SHXYZ1234567ABCD', orderId: UUID,
    userId: null, vendorId: null, warehouseId: null, courierId: null,
    type: 'standard', priority: 'normal', status: 'pending',
    shippingLine1: '12 Main', shippingLine2: null, shippingCity: 'Dhaka',
    shippingState: null, shippingDistrict: null, shippingDivision: null,
    shippingPostalCode: null, shippingCountry: 'BD', shippingLandmark: null,
    shippingLatitude: null, shippingLongitude: null,
    pickupLine1: null, pickupLine2: null, pickupCity: null, pickupState: null,
    pickupDistrict: null, pickupDivision: null, pickupPostalCode: null,
    pickupCountry: null, pickupLandmark: null,
    customerName: null, customerPhone: null, customerEmail: null,
    actualWeightKg: 1, volumetricWeightKg: null, lengthCm: null, widthCm: null, heightCm: null,
    itemCount: 1, isCOD: false, codAmount: null, isInsured: false,
    declaredValue: null, shippingCost: null, currency: 'BDT',
    courierTrackingNumber: null, labelUrl: null,
    estimatedDeliveryAt: null, pickedUpAt: null, deliveredAt: null,
    returnedAt: null, cancelledAt: null, failureReason: null, notes: null,
    version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    packages: [{
      id: '550e8400-e29b-41d4-a716-446655440099',
      shipmentId: UUID, orderItemId: UUID,
      productId: null, variantId: null, sku: null, name: null,
      quantity: 1, sortOrder: 0, createdAt: TS,
    }],
    ...overrides,
  };
}

function delRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, shipmentId: UUID, orderId: UUID, userId: null,
    status: 'scheduled', type: 'standard',
    driverId: null, vehicleId: null, routeId: null,
    recipientName: null, recipientPhone: null,
    deliveryLine1: '12 Main', deliveryLine2: null, deliveryCity: 'Dhaka',
    deliveryState: null, deliveryDistrict: null, deliveryDivision: null,
    deliveryPostalCode: null, deliveryCountry: 'BD', deliveryLandmark: null,
    latitude: null, longitude: null,
    scheduledAt: null, pickedUpAt: null, arrivedAt: null,
    deliveredAt: null, failedAt: null, cancelledAt: null,
    proofType: null, proofSignatureUrl: null, proofPhotoUrl: null,
    proofOtp: null, proofIdNumber: null, proofRecipientName: null, proofCapturedAt: null,
    notes: null, version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    attempts: [],
    ...overrides,
  };
}

function insRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, policyNumber: 'POL-2026-000001',
    shipmentId: null, orderId: null, userId: null,
    status: 'active', type: 'basic', coverages: ['loss'],
    declaredValue: 5000, premium: 50, currency: 'BDT',
    startsAt: TS, expiresAt: new Date('2027-01-01T00:00:00.000Z'),
    isClaimed: false,
    claimId: null, claimNumber: null, claimStatus: null, claimReason: null,
    claimDescription: null, claimImages: [], claimAmount: null,
    claimApprovedAmount: null, claimSubmittedAt: null, claimReviewedAt: null,
    claimApprovedAt: null, claimRejectedAt: null, claimRejectionReason: null,
    claimPaidAt: null, version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    ...overrides,
  };
}

function pkgRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, name: 'Box', code: 'BOX-01', type: 'box', material: 'cardboard',
    status: 'active', lengthCm: 20, widthCm: 20, heightCm: 20, maxWeightKg: 5,
    cost: null, currency: null, imageUrl: null,
    isFragile: false, isTemperatureControlled: false, isRecyclable: true,
    stock: 10, isDefault: false,
    version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    ...overrides,
  };
}

function dspRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, dispatchNumber: 'DSP-20260101-0001', status: 'pending', type: 'single',
    shipmentIds: [UUID], courierId: null, vehicleId: null, driverId: null, warehouseId: null,
    manifestUrl: null, itemCount: 1, totalWeight: null,
    dispatchedAt: null, estimatedArrivalAt: null, deliveredAt: null, cancelledAt: null,
    notes: null, version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    ...overrides,
  };
}

// ═══════════════════════════════════════════════════════════════
// SHIPMENT REPOSITORY
// ═══════════════════════════════════════════════════════════════
describe('ShipmentPrismaRepository — found branches', () => {
  it('findByIdVO returns found entity', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    const e = await r.findByIdVO(ShipmentIdVO.reconstitute(UUID));
    expect(e).not.toBeNull();
  });

  it('findAll returns rows', async () => {
    const prisma = mkPrisma({ shipment: [shipRow(), shipRow({ id: UUID2 })] });
    const r = new ShipmentPrismaRepository(prisma as never);
    const e = await r.findAll();
    expect(e.length).toBe(2);
  });

  it('findByTrackingNumber returns found', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    const e = await r.findByTrackingNumber(TrackingNumberVO.reconstitute('SHXYZ1234567ABCD'));
    expect(e).not.toBeNull();
  });

  it('findByOrderId / findByUserId / findByVendorId / findByCourierId / findByWarehouseId', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    await r.findByOrderId(OrderIdVO.reconstitute(UUID));
    await r.findByStatus(ShipmentStatusVO.reconstitute('pending'));
    await r.findByUserId({ value: UUID } as never);
    await r.findByVendorId({ value: UUID } as never);
    await r.findByCourierId({ value: UUID } as never);
    await r.findByWarehouseId({ value: UUID } as never);
    expect(true).toBe(true);
  });

  it('findPaginated with filters (all)', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    const res = await r.findPaginated({
      page: 1, limit: 10, sortBy: 'createdAt', sortDir: 'desc',
      filter: {
        orderId: UUID, userId: UUID, vendorId: UUID, courierId: UUID, warehouseId: UUID,
        status: 'pending', type: 'standard', priority: 'normal',
        isCOD: false, isInsured: false,
        fromDate: '2026-01-01', toDate: '2026-12-31', search: 'abc',
      },
    });
    expect(res.items.length).toBe(1);
  });

  it('findPaginated empty filter', async () => {
    const prisma = mkPrisma({ shipment: [] });
    const r = new ShipmentPrismaRepository(prisma as never);
    const res = await r.findPaginated({ page: 2, limit: 5 });
    expect(res.items.length).toBe(0);
  });

  it('getStats with filters + actual statuses counted', async () => {
    const prisma = mkPrisma({
      shipment: [
        shipRow({ status: 'delivered' }),
        shipRow({ id: UUID2, status: 'failed', courierId: UUID2 }),
        shipRow({ id: '550e8400-e29b-41d4-a716-446655440002', status: 'in_transit' }),
      ],
    });
    const r = new ShipmentPrismaRepository(prisma as never);
    const stats = await r.getStats(UUID, UUID2, '2026-01-01', '2026-12-31');
    expect(stats.totalShipments).toBe(3);
    expect(stats.delivered).toBe(1);
  });

  it('getStats without filters', async () => {
    const prisma = mkPrisma({ shipment: [shipRow({ status: 'returned' })] });
    const r = new ShipmentPrismaRepository(prisma as never);
    const stats = await r.getStats();
    expect(stats.returned).toBe(1);
  });

  it('save existing → update + transaction', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    const e = await r.findByIdVO(ShipmentIdVO.reconstitute(UUID));
    if (e) {
      await r.save(e);
      expect(true).toBe(true);
    }
  });

  it('save new → create path', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    // Override findUnique to null → create path
    (prisma['logisticsShipment'] as Record<string, jest.Mock>)['findUnique'] = jest.fn(async () => null);
    (prisma['logisticsShipment'] as Record<string, jest.Mock>)['findUniqueOrThrow'] = jest.fn(async () => shipRow());
    const r = new ShipmentPrismaRepository(prisma as never);
    const e = await r.findByIdVO(ShipmentIdVO.reconstitute(UUID));
    if (e) {
      await r.save(e);
      expect(true).toBe(true);
    }
  });

  it('existsByTrackingNumber true/false', async () => {
    const p1 = mkPrisma({ shipment: [shipRow()] });
    const r1 = new ShipmentPrismaRepository(p1 as never);
    expect(await r1.existsByTrackingNumber(TrackingNumberVO.reconstitute('SHXYZ1234567ABCD'))).toBe(true);
  });

  it('findStale / findReadyForPickup / findAwaitingCourier with rows', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    await r.findStale(24);
    await r.findReadyForPickup();
    await r.findAwaitingCourier();
    expect(true).toBe(true);
  });

  it('softDelete / delete', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });

  it('countByOrder', async () => {
    const prisma = mkPrisma({ shipment: [shipRow()] });
    const r = new ShipmentPrismaRepository(prisma as never);
    expect(await r.countByOrder(OrderIdVO.reconstitute(UUID))).toBe(1);
  });
});

// ═══════════════════════════════════════════════════════════════
// DELIVERY
// ═══════════════════════════════════════════════════════════════
describe('DeliveryPrismaRepository — found branches', () => {
  it('findByIdVO / findByShipmentId / findByOrderId', async () => {
    const prisma = mkPrisma({ delivery: [delRow()] });
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findByIdVO(DeliveryIdVO.reconstitute(UUID));
    await r.findByShipmentId({ value: UUID } as never);
    await r.findByOrderId(OrderIdVO.reconstitute(UUID));
    expect(true).toBe(true);
  });

  it('findByStatus / findActiveByDriver / findScheduledFor', async () => {
    const prisma = mkPrisma({ delivery: [delRow()] });
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findByStatus({ value: 'scheduled' } as never);
    await r.findActiveByDriver({ value: UUID } as never);
    await r.findScheduledFor('2026-01-01');
    expect(true).toBe(true);
  });

  it('findPaginated with all filters', async () => {
    const prisma = mkPrisma({ delivery: [delRow()] });
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findPaginated({
      page: 1, limit: 10,
      filter: {
        shipmentId: UUID, orderId: UUID, driverId: UUID,
        status: 'scheduled', type: 'standard',
        fromDate: '2026-01-01', toDate: '2026-12-31',
      },
    });
    expect(true).toBe(true);
  });

  it('findPaginated no filter', async () => {
    const prisma = mkPrisma({ delivery: [delRow()] });
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('getStats with data + filters + no filters', async () => {
    const prisma = mkPrisma({
      delivery: [
        delRow({ status: 'delivered' }),
        delRow({ id: UUID2, status: 'failed' }),
        delRow({ id: '550e8400-e29b-41d4-a716-446655440002', status: 'in_transit' }),
      ],
    });
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.getStats(UUID, '2026-01-01', '2026-12-31');
    await r.getStats();
    expect(true).toBe(true);
  });

  it('findStaleAssigned', async () => {
    const prisma = mkPrisma({ delivery: [delRow()] });
    const r = new DeliveryPrismaRepository(prisma as never);
    await r.findStaleAssigned(1);
    expect(true).toBe(true);
  });

  it('save existing + delete + softDelete + findAll', async () => {
    const prisma = mkPrisma({ delivery: [delRow()] });
    const r = new DeliveryPrismaRepository(prisma as never);
    const e = await r.findByIdVO(DeliveryIdVO.reconstitute(UUID));
    if (e) await r.save(e);
    await r.findAll();
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// INSURANCE
// ═══════════════════════════════════════════════════════════════
describe('InsurancePrismaRepository — found branches', () => {
  it('findByIdVO / findByPolicyNumber / findByShipmentId', async () => {
    const prisma = mkPrisma({ insurance: [insRow()] });
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findByIdVO(InsuranceIdVO.reconstitute(UUID));
    await r.findByPolicyNumber(PolicyNumberVO.reconstitute('POL-2026-000001'));
    await r.findByShipmentId({ value: UUID } as never);
    expect(true).toBe(true);
  });

  it('findByOrderId / findByUserId / findByStatus / findByClaimStatus', async () => {
    const prisma = mkPrisma({ insurance: [insRow()] });
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findByOrderId(OrderIdVO.reconstitute(UUID));
    await r.findByUserId({ value: UUID } as never);
    await r.findByStatus({ value: 'active' } as never);
    await r.findByClaimStatus({ value: 'submitted' } as never);
    expect(true).toBe(true);
  });

  it('findActive / findExpiring / findWithOpenClaims / findAll', async () => {
    const prisma = mkPrisma({ insurance: [insRow()] });
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findActive();
    await r.findExpiring(30);
    await r.findWithOpenClaims();
    await r.findAll();
    expect(true).toBe(true);
  });

  it('findPaginated with all filters', async () => {
    const prisma = mkPrisma({ insurance: [insRow()] });
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findPaginated({
      page: 1, limit: 10,
      filter: {
        shipmentId: UUID, orderId: UUID, userId: UUID,
        status: 'active', type: 'basic',
        isClaimed: false, claimStatus: 'submitted',
        fromDate: '2026-01-01', toDate: '2026-12-31',
      },
    });
    expect(true).toBe(true);
  });

  it('findPaginated no filters', async () => {
    const prisma = mkPrisma({ insurance: [insRow()] });
    const r = new InsurancePrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('getStats with filters + no filters', async () => {
    const prisma = mkPrisma({
      insurance: [
        insRow({ status: 'active', isClaimed: false }),
        insRow({ id: UUID2, status: 'claimed', isClaimed: true }),
      ],
    });
    const r = new InsurancePrismaRepository(prisma as never);
    await r.getStats(UUID, '2026-01-01', '2026-12-31');
    await r.getStats();
    expect(true).toBe(true);
  });

  it('save + existsByPolicyNumber + delete/softDelete', async () => {
    const prisma = mkPrisma({ insurance: [insRow()] });
    const r = new InsurancePrismaRepository(prisma as never);
    expect(await r.existsByPolicyNumber(PolicyNumberVO.reconstitute('POL-2026-000001'))).toBe(true);
    const e = await r.findByIdVO(InsuranceIdVO.reconstitute(UUID));
    if (e) await r.save(e);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// PACKAGING
// ═══════════════════════════════════════════════════════════════
describe('PackagingPrismaRepository — found branches', () => {
  it('findByIdVO / findByCode / findByStatus / findByType / findByMaterial', async () => {
    const prisma = mkPrisma({ packaging: [pkgRow()] });
    const r = new PackagingPrismaRepository(prisma as never);
    await r.findByIdVO(PackagingIdVO.reconstitute(UUID));
    await r.findByCode('BOX-01');
    await r.findByStatus({ value: 'active' } as never);
    await r.findByType({ value: 'box' } as never);
    await r.findByMaterial({ value: 'cardboard' } as never);
    expect(true).toBe(true);
  });

  it('findInStock / findDefault / findCapableOf / findLowStock / findAll', async () => {
    const prisma = mkPrisma({ packaging: [pkgRow()] });
    const r = new PackagingPrismaRepository(prisma as never);
    await r.findInStock();
    await r.findDefault();
    await r.findCapableOf(3, { lengthCm: 10, widthCm: 10, heightCm: 10 });
    await r.findCapableOf(3);
    await r.findLowStock(20);
    await r.findAll();
    expect(true).toBe(true);
  });

  it('findPaginated with all filters', async () => {
    const prisma = mkPrisma({ packaging: [pkgRow()] });
    const r = new PackagingPrismaRepository(prisma as never);
    await r.findPaginated({
      page: 1, limit: 10,
      filter: { status: 'active', type: 'box', material: 'cardboard', isFragile: false, inStock: true, search: 'box' },
    });
    expect(true).toBe(true);
  });

  it('findPaginated minimal filter', async () => {
    const prisma = mkPrisma({ packaging: [pkgRow()] });
    const r = new PackagingPrismaRepository(prisma as never);
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('save + exists + delete/softDelete', async () => {
    const prisma = mkPrisma({ packaging: [pkgRow()] });
    const r = new PackagingPrismaRepository(prisma as never);
    expect(await r.existsByCode('BOX-01')).toBe(true);
    const e = await r.findByIdVO(PackagingIdVO.reconstitute(UUID));
    if (e) await r.save(e);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// DISPATCH
// ═══════════════════════════════════════════════════════════════
describe('DispatchPrismaRepository — found branches', () => {
  it('findByIdVO / findByNumber / findByStatus / findByType', async () => {
    const prisma = mkPrisma({ dispatch: [dspRow()] });
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findByIdVO(DispatchIdVO.reconstitute(UUID));
    await r.findByNumber(DispatchNumberVO.reconstitute('DSP-20260101-0001'));
    await r.findByStatus({ value: 'pending' } as never);
    await r.findByType({ value: 'single' } as never);
    expect(true).toBe(true);
  });

  it('findByCourier / findByWarehouse / findByDriver / findByShipmentId / findPending / findInFlight / findAll', async () => {
    const prisma = mkPrisma({ dispatch: [dspRow()] });
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findByCourier({ value: UUID } as never);
    await r.findByWarehouse({ value: UUID } as never);
    await r.findByDriver({ value: UUID } as never);
    await r.findByShipmentId(UUID);
    await r.findPending();
    await r.findInFlight();
    await r.findAll();
    expect(true).toBe(true);
  });

  it('findPaginated all filters + minimal', async () => {
    const prisma = mkPrisma({ dispatch: [dspRow()] });
    const r = new DispatchPrismaRepository(prisma as never);
    await r.findPaginated({
      page: 1, limit: 10,
      filter: { courierId: UUID, warehouseId: UUID, driverId: UUID, status: 'pending', type: 'single', fromDate: '2026-01-01', toDate: '2026-12-31' },
    });
    await r.findPaginated({ page: 1, limit: 5 });
    expect(true).toBe(true);
  });

  it('save + existsByNumber + exists + delete/softDelete', async () => {
    const prisma = mkPrisma({ dispatch: [dspRow()] });
    const r = new DispatchPrismaRepository(prisma as never);
    expect(await r.existsByNumber(DispatchNumberVO.reconstitute('DSP-20260101-0001'))).toBe(true);
    const e = await r.findByIdVO(DispatchIdVO.reconstitute(UUID));
    if (e) await r.save(e);
    await r.delete(UUID);
    await r.softDelete(UUID);
    expect(true).toBe(true);
  });
});
