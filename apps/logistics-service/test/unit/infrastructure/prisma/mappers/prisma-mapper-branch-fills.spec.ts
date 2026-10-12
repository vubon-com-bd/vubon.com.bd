/**
 * Prisma mapper branch fills — pass full-populated AND null fields
 * to trigger `?? undefined` and optional-field branches.
 */
import { describe, it, expect } from '@jest/globals';

import { DeliveryPrismaMapper } from '@infrastructure/persistence/prisma/delivery.prisma.mapper.js';
import { TrackingPrismaMapper } from '@infrastructure/persistence/prisma/tracking.prisma.mapper.js';
import { InsurancePrismaMapper } from '@infrastructure/persistence/prisma/insurance.prisma.mapper.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const TS = new Date('2026-01-01T00:00:00.000Z');

function deliveryRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, shipmentId: UUID, orderId: UUID, userId: UUID,
    status: 'scheduled', type: 'standard',
    driverId: UUID2, vehicleId: UUID2, routeId: UUID2,
    recipientName: 'R', recipientPhone: '+8801700000000',
    deliveryLine1: '12 Main', deliveryLine2: 'Apt 4', deliveryCity: 'Dhaka',
    deliveryState: 'Dhaka', deliveryDistrict: 'Dhaka', deliveryDivision: 'Dhaka',
    deliveryPostalCode: '1200', deliveryCountry: 'BD', deliveryLandmark: 'near park',
    latitude: 23.8, longitude: 90.4,
    scheduledAt: TS, pickedUpAt: TS, arrivedAt: TS, deliveredAt: null,
    failedAt: null, cancelledAt: null,
    proofType: null, proofSignatureUrl: null, proofPhotoUrl: null,
    proofOtp: null, proofIdNumber: null, proofRecipientName: null, proofCapturedAt: null,
    notes: 'note', version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    attempts: [],
    ...overrides,
  };
}

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

function insuranceRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, policyNumber: 'POL-2026-000001',
    shipmentId: UUID, orderId: UUID, userId: UUID,
    status: 'active', type: 'basic', coverages: ['loss', 'damage'],
    declaredValue: 5000, premium: 50, currency: 'BDT',
    startsAt: TS, expiresAt: new Date('2027-01-01T00:00:00.000Z'),
    isClaimed: false,
    claimId: null, claimNumber: null, claimStatus: null, claimReason: null,
    claimDescription: null, claimImages: [], claimAmount: null,
    claimApprovedAmount: null, claimSubmittedAt: null, claimReviewedAt: null,
    claimApprovedAt: null, claimRejectedAt: null, claimRejectionReason: null,
    claimPaidAt: null,
    version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    ...overrides,
  };
}

describe('DeliveryPrismaMapper — branch fills', () => {
  it('toDomain full-populated row', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow() as never);
    expect(e.recipientName).toBe('R');
    expect(e.driverId?.value).toBe(UUID2);
  });

  it('toDomain all-null optional fields', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow({
      userId: null, driverId: null, vehicleId: null, routeId: null,
      recipientName: null, recipientPhone: null,
      deliveryLine2: null, deliveryState: null, deliveryDistrict: null,
      deliveryDivision: null, deliveryPostalCode: null, deliveryLandmark: null,
      latitude: null, longitude: null,
      scheduledAt: null, pickedUpAt: null, arrivedAt: null,
      notes: null,
    }) as never);
    expect(e.recipientName).toBeUndefined();
    expect(e.driverId).toBeUndefined();
  });

  it('toDomain with attempts populated + proof present', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow({
      status: 'delivered', deliveredAt: TS,
      attempts: [{
        id: UUID2, deliveryId: UUID, attemptNumber: 1, status: 'failed',
        reason: 'no one', driverId: UUID2, location: 'L',
        latitude: 23.8, longitude: 90.4, images: ['https://x/1.png'],
        notes: 'attempt note', attemptedAt: TS, createdAt: TS,
      }],
      proofType: 'signature', proofSignatureUrl: 'https://x/s.png',
      proofRecipientName: 'R', proofCapturedAt: TS,
    }) as never);
    expect(e.attemptCount).toBe(1);
    expect(e.proofOfDelivery).toBeDefined();
  });

  it('toDomain with attempts null-fields', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow({
      attempts: [{
        id: UUID2, deliveryId: UUID, attemptNumber: 1, status: 'failed',
        reason: null, driverId: null, location: null,
        latitude: null, longitude: null, images: [],
        notes: null, attemptedAt: TS, createdAt: TS,
      }],
    }) as never);
    expect(e.attempts[0]?.reason).toBeUndefined();
  });

  it('toPersistence with all optional entity fields missing', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow({
      userId: null, driverId: null, vehicleId: null, routeId: null,
      recipientName: null, recipientPhone: null,
      deliveryLine2: null, deliveryState: null, deliveryDistrict: null,
      deliveryDivision: null, deliveryPostalCode: null, deliveryLandmark: null,
      scheduledAt: null, pickedUpAt: null, arrivedAt: null, notes: null,
    }) as never);
    const row = DeliveryPrismaMapper.toPersistence(e);
    expect(row.userId).toBeNull();
    expect(row.driverId).toBeNull();
  });

  it('toPersistence with all optional entity fields present', () => {
    const e = DeliveryPrismaMapper.toDomain(deliveryRow() as never);
    const row = DeliveryPrismaMapper.toPersistence(e);
    expect(row.userId).toBe(UUID);
    expect(row.driverId).toBe(UUID2);
  });
});

describe('TrackingPrismaMapper — branch fills', () => {
  it('toDomain full-populated', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow() as never);
    expect(e.currentLocation).toBe('Dhaka');
  });

  it('toDomain all-null optionals', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow({
      shipmentId: null, orderId: null, courierCode: null,
      currentLocation: null, estimatedDeliveryAt: null,
    }) as never);
    expect(e.shipmentId).toBeUndefined();
    expect(e.courierCode).toBeUndefined();
  });

  it('toDomain with events populated (null fields)', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow({
      events: [{
        id: UUID, trackingId: UUID, shipmentId: null, orderId: null,
        event: 'in_transit', status: 'active', source: 'courier_api',
        message: 'Moved', location: null, latitude: null, longitude: null,
        occurredAt: TS, receivedAt: TS, metadata: null, createdAt: TS,
      }],
    }) as never);
    expect(e.eventCount).toBe(1);
  });

  it('toDomain with events populated (all fields)', () => {
    const e = TrackingPrismaMapper.toDomain(trackingRow({
      events: [{
        id: UUID, trackingId: UUID, shipmentId: UUID, orderId: UUID,
        event: 'in_transit', status: 'active', source: 'courier_api',
        message: 'Moved', location: 'Dhaka', latitude: 23.8, longitude: 90.4,
        occurredAt: TS, receivedAt: TS, metadata: { x: 1 }, createdAt: TS,
      }],
    }) as never);
    expect(e.events[0]?.metadata).toEqual({ x: 1 });
  });
});

describe('InsurancePrismaMapper — branch fills', () => {
  it('toDomain full-populated claim', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow({
      isClaimed: true, claimId: UUID2, claimNumber: 'CLM-1',
      claimStatus: 'submitted', claimReason: 'damage',
      claimAmount: 500, claimSubmittedAt: TS,
      claimApprovedAmount: null, claimDescription: null,
      claimImages: [],
    }) as never);
    expect(e.claim).toBeDefined();
    expect(e.claim?.reason.value).toBe('damage');
  });

  it('toDomain claim with all-null optionals', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow({
      isClaimed: true, claimId: UUID2, claimNumber: 'CLM-2',
      claimStatus: 'submitted', claimReason: 'damage',
      claimAmount: 500, claimSubmittedAt: TS,
      claimDescription: null, claimImages: [],
      claimReviewedAt: null, claimApprovedAt: null,
      claimRejectedAt: null, claimPaidAt: null,
    }) as never);
    expect(e.claim?.reviewedAt).toBeUndefined();
    expect(e.claim?.paidAt).toBeUndefined();
  });

  it('toDomain without claim', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow() as never);
    expect(e.claim).toBeUndefined();
    expect(e.isClaimed).toBe(false);
  });

  it('toDomain claim with description + images + approved/paid dates', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow({
      isClaimed: true, claimId: UUID2, claimNumber: 'CLM-3',
      claimStatus: 'paid', claimReason: 'damage',
      claimDescription: 'some desc',
      claimImages: ['https://x/1.png'],
      claimAmount: 500, claimApprovedAmount: 450,
      claimSubmittedAt: TS, claimReviewedAt: TS, claimApprovedAt: TS,
      claimPaidAt: TS,
    }) as never);
    expect(e.claim?.approvedAmount).toBe(450);
    expect(e.claim?.paidAt).toBeDefined();
  });

  it('toPersistence without claim', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow() as never);
    const row = InsurancePrismaMapper.toPersistence(e);
    expect(row.claimId).toBeNull();
  });

  it('toPersistence with claim', () => {
    const e = InsurancePrismaMapper.toDomain(insuranceRow({
      isClaimed: true, claimId: UUID2, claimNumber: 'CLM-X',
      claimStatus: 'submitted', claimReason: 'damage',
      claimAmount: 500, claimSubmittedAt: TS,
    }) as never);
    const row = InsurancePrismaMapper.toPersistence(e);
    expect(row.claimId).toBe(UUID2);
  });
});
