/**
 * DeliveryPrismaMapper — targeted null branches (proof fields,
 * persistence optionals, every `??`).
 */
import { describe, it, expect } from '@jest/globals';

import { DeliveryPrismaMapper } from '@infrastructure/persistence/prisma/delivery.prisma.mapper.js';

const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const TS = new Date('2026-01-01T00:00:00.000Z');

function row(overrides: Record<string, unknown> = {}): Record<string, unknown> {
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
    proofOtp: null, proofIdNumber: null, proofRecipientName: null,
    proofCapturedAt: null,
    notes: null, version: 1, createdAt: TS, updatedAt: TS, deletedAt: null,
    attempts: [],
    ...overrides,
  };
}

describe('DeliveryPrismaMapper — proof field branches', () => {
  it('proofType present but proofCapturedAt null → no proof', () => {
    const e = DeliveryPrismaMapper.toDomain(row({ proofType: 'signature', proofCapturedAt: null }) as never);
    expect(e.proofOfDelivery).toBeUndefined();
  });

  it('proofType null but proofCapturedAt present → no proof', () => {
    const e = DeliveryPrismaMapper.toDomain(row({ proofType: null, proofCapturedAt: TS }) as never);
    expect(e.proofOfDelivery).toBeUndefined();
  });

  it('proofType signature with all fields → proof populated', () => {
    const e = DeliveryPrismaMapper.toDomain(row({
      proofType: 'signature',
      proofSignatureUrl: 'https://x/s.png',
      proofPhotoUrl: 'https://x/p.png',
      proofOtp: '123456',
      proofIdNumber: 'ID1',
      proofRecipientName: 'R',
      proofCapturedAt: TS,
    }) as never);
    expect(e.proofOfDelivery?.type).toBe('signature');
    expect(e.proofOfDelivery?.otp).toBe('123456');
  });

  it('proofType otp with null signatureUrl', () => {
    const e = DeliveryPrismaMapper.toDomain(row({
      proofType: 'otp', proofOtp: '123456', proofCapturedAt: TS,
      proofSignatureUrl: null,
    }) as never);
    expect(e.proofOfDelivery?.signatureUrl).toBeUndefined();
  });
});

describe('DeliveryPrismaMapper — attempts branches', () => {
  it('attempt with all fields populated', () => {
    const e = DeliveryPrismaMapper.toDomain(row({
      attempts: [{
        id: UUID2, deliveryId: UUID, attemptNumber: 1, status: 'failed',
        reason: 'no answer', driverId: UUID2, location: 'Dhaka',
        latitude: 23.8, longitude: 90.4, images: ['https://x/1.png'],
        notes: 'n', attemptedAt: TS, createdAt: TS,
      }],
    }) as never);
    expect(e.attempts[0]?.reason).toBe('no answer');
  });

  it('attempt with all fields null', () => {
    const e = DeliveryPrismaMapper.toDomain(row({
      attempts: [{
        id: UUID2, deliveryId: UUID, attemptNumber: 1, status: 'failed',
        reason: null, driverId: null, location: null,
        latitude: null, longitude: null, images: [],
        notes: null, attemptedAt: TS, createdAt: TS,
      }],
    }) as never);
    expect(e.attempts[0]?.reason).toBeUndefined();
  });
});

describe('DeliveryPrismaMapper — toPersistence branches', () => {
  it('entity without optional persistence fields (all null)', () => {
    const e = DeliveryPrismaMapper.toDomain(row() as never);
    const out = DeliveryPrismaMapper.toPersistence(e);
    expect(out.userId).toBeNull();
    expect(out.driverId).toBeNull();
    expect(out.deliveryLine2).toBeNull();
  });

  it('entity with all optional persistence fields', () => {
    const e = DeliveryPrismaMapper.toDomain(row({
      userId: UUID, driverId: UUID2, vehicleId: UUID2, routeId: UUID2,
      recipientName: 'R', recipientPhone: '+8801700000000',
      deliveryLine2: 'Apt 4', deliveryState: 'Dhaka', deliveryDistrict: 'D',
      deliveryDivision: 'D', deliveryPostalCode: '1200', deliveryLandmark: 'near park',
      latitude: 23.8, longitude: 90.4,
      scheduledAt: TS, pickedUpAt: TS, arrivedAt: TS, notes: 'x',
    }) as never);
    const out = DeliveryPrismaMapper.toPersistence(e);
    expect(out.userId).toBe(UUID);
    expect(out.deliveryLine2).toBe('Apt 4');
  });
});
