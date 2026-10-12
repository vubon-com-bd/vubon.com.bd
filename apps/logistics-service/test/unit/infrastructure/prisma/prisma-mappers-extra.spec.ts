/**
 * Prisma mappers round-trip for route, fulfillment, dispatch, return-shipment, insurance.
 */
import { describe, it, expect } from '@jest/globals';

import { RoutePrismaMapper } from '@infrastructure/persistence/prisma/route.prisma.mapper.js';
import { FulfillmentPrismaMapper } from '@infrastructure/persistence/prisma/fulfillment.prisma.mapper.js';
import { DispatchPrismaMapper } from '@infrastructure/persistence/prisma/dispatch.prisma.mapper.js';
import { ReturnShipmentPrismaMapper } from '@infrastructure/persistence/prisma/return-shipment.prisma.mapper.js';
import { InsurancePrismaMapper } from '@infrastructure/persistence/prisma/insurance.prisma.mapper.js';

const NOW = new Date('2026-01-15T10:00:00.000Z');
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const UUID3 = '550e8400-e29b-41d4-a716-446655440002';

// ═══════════════════════════════════════════════════════════════
// ROUTE (31% → 85%+)
// ═══════════════════════════════════════════════════════════════
const routeRow = () => ({
  id: UUID, name: 'R1', code: 'RT-01', type: 'delivery', status: 'draft',
  optimization: 'balanced',
  totalDistanceKm: 50, totalDurationMinutes: 60,
  warehouseId: UUID, vehicleId: UUID2, driverId: UUID3,
  scheduledDate: NOW, startedAt: null, completedAt: null,
  isOptimized: true, isRecurring: false, recurrenceRule: null,
  stops: [
    { id: UUID, order: 0, location: 'A', address: 'St A', latitude: 23.8, longitude: 90.4,
      shipmentIds: ['s1'], estimatedArrivalAt: null, actualArrivalAt: null, completed: false, notes: null },
    { id: UUID2, order: 1, location: 'B', address: 'St B', latitude: null, longitude: null,
      shipmentIds: ['s2'], estimatedArrivalAt: NOW.toISOString(), actualArrivalAt: NOW.toISOString(), completed: true, notes: 'note' },
  ],
  version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('RoutePrismaMapper', () => {
  it('toDomain — full row with stops', () => {
    const e = RoutePrismaMapper.toDomain(routeRow() as never);
    expect(e.name).toBe('R1');
    expect(e.code.value).toBe('RT-01');
    expect(e.type.value).toBe('delivery');
    expect(e.status.value).toBe('draft');
    expect(e.stopCount).toBe(2);
    expect(e.totalDistanceKm?.value).toBe(50);
    expect(e.isOptimized).toBe(true);
    expect(e.warehouseId?.value).toBe(UUID);
  });

  it('toDomain — empty stops', () => {
    const row = { ...routeRow(), stops: [], totalDistanceKm: null, totalDurationMinutes: null };
    const e = RoutePrismaMapper.toDomain(row as never);
    expect(e.stopCount).toBe(0);
    expect(e.totalDistanceKm).toBeUndefined();
  });

  it('toDomain — stops with missing fields', () => {
    const row = { ...routeRow(), stops: [{ id: 'x', order: 0, location: 'A', address: 'B', shipmentIds: [], completed: false }] };
    const e = RoutePrismaMapper.toDomain(row as never);
    expect(e.stopCount).toBe(1);
  });

  it('toDomain — invalid stops (non-array) → empty', () => {
    const row = { ...routeRow(), stops: 'not-an-array' };
    const e = RoutePrismaMapper.toDomain(row as never);
    expect(e.stopCount).toBe(0);
  });

  it('toPersistence', () => {
    const e = RoutePrismaMapper.toDomain(routeRow() as never);
    const p = RoutePrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['name']).toBe('R1');
    expect(p['code']).toBe('RT-01');
    expect(p['scheduledDate']).toBeInstanceOf(Date);
  });
});

// ═══════════════════════════════════════════════════════════════
// FULFILLMENT (55% → 85%+)
// ═══════════════════════════════════════════════════════════════
const ffRow = () => ({
  id: UUID, orderId: UUID2, vendorId: UUID3, warehouseId: UUID,
  status: 'pending', type: 'standard', priority: 'normal',
  assignedTo: null, itemIds: ['i1', 'i2'],
  pickedAt: null, packedAt: null, shippedAt: null, cancelledAt: null,
  notes: 'urgent order', slaDueAt: NOW, slaBreachedAt: null,
  version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('FulfillmentPrismaMapper', () => {
  it('toDomain — basic', () => {
    const e = FulfillmentPrismaMapper.toDomain(ffRow() as never);
    expect(e.orderId.value).toBe(UUID2);
    expect(e.status.value).toBe('pending');
    expect(e.itemCount).toBe(2);
    expect(e.notes?.value).toBe('urgent order');
  });

  it('toDomain — with SLA due', () => {
    const e = FulfillmentPrismaMapper.toDomain(ffRow() as never);
    expect(e.sla?.dueAt).toBeDefined();
  });

  it('toDomain — SLA breached', () => {
    const row = { ...ffRow(), slaBreachedAt: NOW };
    const e = FulfillmentPrismaMapper.toDomain(row as never);
    expect(e.sla?.breachedAt).toBeDefined();
  });

  it('toDomain — no SLA', () => {
    const row = { ...ffRow(), slaDueAt: null, slaBreachedAt: null, vendorId: null, warehouseId: null, notes: null, assignedTo: null };
    const e = FulfillmentPrismaMapper.toDomain(row as never);
    expect(e.sla).toBeUndefined();
    expect(e.notes).toBeUndefined();
    expect(e.vendorId).toBeUndefined();
  });

  it('toDomain — assigned to user', () => {
    const row = { ...ffRow(), assignedTo: UUID3 };
    const e = FulfillmentPrismaMapper.toDomain(row as never);
    expect(e.assignedTo).toBe(UUID3);
  });

  it('toPersistence', () => {
    const e = FulfillmentPrismaMapper.toDomain(ffRow() as never);
    const p = FulfillmentPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['orderId']).toBe(UUID2);
    expect(p['status']).toBe('pending');
    expect(p['itemIds']).toEqual(['i1', 'i2']);
  });
});

// ═══════════════════════════════════════════════════════════════
// DISPATCH (33% → 85%+)
// ═══════════════════════════════════════════════════════════════
const dspRow = () => ({
  id: UUID, dispatchNumber: 'DSP-20260115-0001', status: 'pending', type: 'single',
  shipmentIds: ['s1', 's2'], courierId: UUID, vehicleId: UUID2, driverId: UUID3,
  warehouseId: null, manifestUrl: 'http://manifest.pdf', itemCount: 2, totalWeight: 10,
  dispatchedAt: null, estimatedArrivalAt: NOW, deliveredAt: null, cancelledAt: null,
  notes: 'bulk', version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('DispatchPrismaMapper', () => {
  it('toDomain — basic', () => {
    const e = DispatchPrismaMapper.toDomain(dspRow() as never);
    expect(e.dispatchNumber.value).toBe('DSP-20260115-0001');
    expect(e.status.value).toBe('pending');
    expect(e.type.value).toBe('single');
    expect(e.shipmentCount).toBe(2);
    expect(e.itemCount).toBe(2);
    expect(e.totalWeight?.value).toBe(10);
    expect(e.hasCourier).toBe(true);
    expect(e.hasManifest).toBe(true);
  });

  it('toDomain — minimal (nulls)', () => {
    const row = {
      ...dspRow(),
      courierId: null, vehicleId: null, driverId: null, warehouseId: null,
      manifestUrl: null, totalWeight: null, estimatedArrivalAt: null, notes: null,
    };
    const e = DispatchPrismaMapper.toDomain(row as never);
    expect(e.hasCourier).toBe(false);
    expect(e.hasManifest).toBe(false);
    expect(e.totalWeight).toBeUndefined();
    expect(e.notes).toBeUndefined();
  });

  it('toDomain — Decimal-like totalWeight', () => {
    const row = { ...dspRow(), totalWeight: { toNumber: () => 15.5 } };
    const e = DispatchPrismaMapper.toDomain(row as never);
    expect(e.totalWeight?.value).toBe(15.5);
  });

  it('toPersistence', () => {
    const e = DispatchPrismaMapper.toDomain(dspRow() as never);
    const p = DispatchPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['dispatchNumber']).toBe('DSP-20260115-0001');
    expect(p['shipmentIds']).toEqual(['s1', 's2']);
  });
});

// ═══════════════════════════════════════════════════════════════
// RETURN SHIPMENT (35% → 85%+)
// ═══════════════════════════════════════════════════════════════
const rsRow = () => ({
  id: UUID, rmaNumber: 'RMA-2026-000123', orderId: UUID2, originalShipmentId: UUID3,
  userId: UUID, status: 'requested', type: 'customer_return', reason: 'defective',
  description: 'broken screen',
  images: ['http://img1.png'], itemIds: ['i1'],
  pickupLine1: '12 Main', pickupLine2: null, pickupCity: 'Dhaka',
  pickupState: null, pickupDistrict: null, pickupDivision: null,
  pickupPostalCode: null, pickupCountry: 'BD',
  pickupScheduledAt: null, pickedUpAt: null, receivedAt: null,
  inspectedAt: null, inspectedBy: null, restockable: false,
  refundAmount: null, refundCurrency: null, restockFeeAmount: null,
  trackingNumber: null, notes: null,
  version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('ReturnShipmentPrismaMapper', () => {
  it('toDomain — basic', () => {
    const e = ReturnShipmentPrismaMapper.toDomain(rsRow() as never);
    expect(e.rmaNumber.value).toBe('RMA-2026-000123');
    expect(e.status.value).toBe('requested');
    expect(e.type.value).toBe('customer_return');
    expect(e.reason.value).toBe('defective');
    expect(e.description?.value).toBe('broken screen');
    expect(e.itemCount).toBe(1);
    expect(e.imageCount).toBe(1);
    expect(e.pickupAddress.toAddress().city).toBe('Dhaka');
  });

  it('toDomain — changed_mind reason without images', () => {
    const row = { ...rsRow(), reason: 'changed_mind', images: [] };
    const e = ReturnShipmentPrismaMapper.toDomain(row as never);
    expect(e.reason.value).toBe('changed_mind');
    expect(e.imageCount).toBe(0);
  });

  it('toDomain — with refund', () => {
    const row = {
      ...rsRow(),
      status: 'inspected', restockable: true,
      refundAmount: 500, refundCurrency: 'BDT', restockFeeAmount: 50,
      inspectedBy: UUID3,
    };
    const e = ReturnShipmentPrismaMapper.toDomain(row as never);
    expect(e.refundAmount?.amount).toBe(500);
    expect(e.restockable).toBe(true);
    expect(e.restockFeeAmount).toBe(50);
    expect(e.inspectedBy?.value).toBe(UUID3);
  });

  it('toDomain — minimal nulls', () => {
    const row = {
      ...rsRow(),
      reason: 'changed_mind',
      description: null, images: [], originalShipmentId: null,
      refundAmount: null, refundCurrency: null, notes: null, trackingNumber: null,
    };
    const e = ReturnShipmentPrismaMapper.toDomain(row as never);
    expect(e.description).toBeUndefined();
    expect(e.originalShipmentId).toBeUndefined();
    expect(e.refundAmount).toBeUndefined();
  });

  it('toPersistence', () => {
    const e = ReturnShipmentPrismaMapper.toDomain(rsRow() as never);
    const p = ReturnShipmentPrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['rmaNumber']).toBe('RMA-2026-000123');
    expect(p['pickupLine1']).toBe('12 Main');
  });
});

// ═══════════════════════════════════════════════════════════════
// INSURANCE (58% → 85%+)
// ═══════════════════════════════════════════════════════════════
const insRow = () => ({
  id: UUID, policyNumber: 'POL-2026-000005',
  shipmentId: UUID2, orderId: UUID3, userId: UUID,
  status: 'active', type: 'standard', coverages: ['loss', 'damage'],
  declaredValue: 5000, premium: 50, currency: 'BDT',
  startsAt: NOW, expiresAt: new Date(NOW.getTime() + 86400000),
  isClaimed: false,
  claimId: null, claimNumber: null, claimStatus: null, claimReason: null,
  claimDescription: null, claimImages: [],
  claimAmount: null, claimApprovedAmount: null,
  claimSubmittedAt: null, claimReviewedAt: null, claimApprovedAt: null,
  claimRejectedAt: null, claimRejectionReason: null, claimPaidAt: null,
  version: 0, createdAt: NOW, updatedAt: NOW, deletedAt: null,
});

describe('InsurancePrismaMapper', () => {
  it('toDomain — basic no claim', () => {
    const e = InsurancePrismaMapper.toDomain(insRow() as never);
    expect(e.policyNumber.value).toBe('POL-2026-000005');
    expect(e.status.value).toBe('active');
    expect(e.type.value).toBe('standard');
    expect(e.declaredValue.amount).toBe(5000);
    expect(e.premium.amount).toBe(50);
    expect(e.coverages).toHaveLength(2);
    expect(e.isClaimed).toBe(false);
    expect(e.claim).toBeUndefined();
  });

  it('toDomain — with full claim', () => {
    const row = {
      ...insRow(),
      status: 'claimed', isClaimed: true,
      claimId: UUID, claimNumber: 'CLM-1', claimStatus: 'approved',
      claimReason: 'damage', claimDescription: 'desc', claimImages: ['http://x.png'],
      claimAmount: 1000, claimApprovedAmount: 800,
      claimSubmittedAt: NOW, claimReviewedAt: NOW, claimApprovedAt: NOW,
    };
    const e = InsurancePrismaMapper.toDomain(row as never);
    expect(e.claim).toBeDefined();
    expect(e.claim?.status.value).toBe('approved');
    expect(e.claim?.amount).toBe(1000);
    expect(e.claim?.approvedAmount).toBe(800);
  });

  it('toDomain — no claim when missing claimId', () => {
    const row = { ...insRow(), claimId: null, claimNumber: 'CLM', claimStatus: 'submitted' };
    const e = InsurancePrismaMapper.toDomain(row as never);
    expect(e.claim).toBeUndefined();
  });

  it('toDomain — minimal (no shipment/order/user)', () => {
    const row = { ...insRow(), shipmentId: null, orderId: null, userId: null };
    const e = InsurancePrismaMapper.toDomain(row as never);
    expect(e.shipmentId).toBeUndefined();
    expect(e.orderId).toBeUndefined();
    expect(e.userId).toBeUndefined();
  });

  it('toPersistence — no claim', () => {
    const e = InsurancePrismaMapper.toDomain(insRow() as never);
    const p = InsurancePrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['policyNumber']).toBe('POL-2026-000005');
    expect(p['claimId']).toBeNull();
    expect(p['declaredValue']).toBe(5000);
  });

  it('toPersistence — with claim', () => {
    const row = {
      ...insRow(),
      status: 'claimed', isClaimed: true,
      claimId: UUID, claimNumber: 'CLM-1', claimStatus: 'approved',
      claimReason: 'damage', claimAmount: 1000, claimApprovedAmount: 800,
      claimSubmittedAt: NOW,
    };
    const e = InsurancePrismaMapper.toDomain(row as never);
    const p = InsurancePrismaMapper.toPersistence(e) as Record<string, unknown>;
    expect(p['claimId']).toBe(UUID);
    expect(p['claimStatus']).toBe('approved');
  });
});
