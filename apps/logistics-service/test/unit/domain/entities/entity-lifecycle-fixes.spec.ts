/**
 * Entity lifecycle — corrected Delivery/Fulfillment/Insurance tests.
 * Uses `reconstitute` to set exact starting status where needed.
 */
import { describe, it, expect } from '@jest/globals';

import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { FulfillmentEntity } from '@domain/entities/fulfillment.entity.js';
import { InsuranceEntity } from '@domain/entities/insurance.entity.js';
import { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '@domain/value-objects/primitives/order-id.vo.js';
import { DeliveryStatusVO } from '@domain/value-objects/primitives/delivery-status.vo.js';
import { FulfillmentStatusVO } from '@domain/value-objects/primitives/fulfillment-status.vo.js';
import { InsuranceStatusVO } from '@domain/value-objects/primitives/insurance-status.vo.js';

const NOW = new Date().toISOString();
const UUID = '550e8400-e29b-41d4-a716-446655440000';
const UUID2 = '550e8400-e29b-41d4-a716-446655440001';
const UUID3 = '550e8400-e29b-41d4-a716-446655440002';
const ADDR = { line1: '12 Main', city: 'Dhaka', country: 'BD' };

// ═══════════════════════════════════════════════════════════════
// Delivery
// ═══════════════════════════════════════════════════════════════
function mkDeliveryWithStatus(status: string): DeliveryEntity {
  const deliveredAt = status === 'delivered' ? NOW : undefined;
  const proofOfDelivery = status === 'delivered'
    ? { type: 'contactless', capturedAt: NOW } as never
    : undefined;
  return DeliveryEntity.reconstitute({
    id: UUID, createdAt: NOW, updatedAt: NOW,
    props: {
      shipmentId: ShipmentIdVO.reconstitute(UUID2),
      orderId: OrderIdVO.reconstitute(UUID3),
      status: DeliveryStatusVO.reconstitute(status),
      type: { value: 'standard' } as never,
      deliveryAddress: { toAddress: () => ADDR } as never,
      recipientName: 'R',
      attempts: [],
      deliveredAt,
      proofOfDelivery,
    } as never,
  });
}

describe('DeliveryEntity — corrected tests', () => {
  it('create initial scheduled', () => {
    const d = DeliveryEntity.create({
      id: UUID, now: NOW,
      props: {
        shipmentId: ShipmentIdVO.reconstitute(UUID2),
        orderId: OrderIdVO.reconstitute(UUID3),
        type: { value: 'standard' } as never,
        deliveryAddress: { toAddress: () => ADDR } as never,
        recipientName: 'R',
      } as never,
    });
    expect(d.isScheduled()).toBe(true);
    expect(d.attemptCount).toBe(0);
    expect(d.remainingAttempts).toBe(3);
  });

  it('assignDriver sets driver (getter not method)', () => {
    const d = mkDeliveryWithStatus('out_for_delivery');
    d.assignDriver({ value: UUID2 } as never);
    expect(d.hasDriver).toBe(true);
  });

  it('addAttempt failure auto-transitions', () => {
    const d = mkDeliveryWithStatus('out_for_delivery');
    d.addAttempt({ id: UUID, status: 'failed', reason: 'no answer' });
    expect(d.isFailed()).toBe(true);
    expect(d.attemptCount).toBe(1);
  });

  it('addAttempt success', () => {
    const d = mkDeliveryWithStatus('out_for_delivery');
    d.addAttempt({ id: UUID, status: 'success' });
    expect(d.attemptSummary.success).toBe(1);
  });

  it('max attempts enforced', () => {
    const d = mkDeliveryWithStatus('out_for_delivery');
    d.addAttempt({ id: UUID, status: 'failed' });
    // After fail, need to go back to a state that allows attempts
    const d2 = mkDeliveryWithStatus('out_for_delivery');
    // Manually set multiple attempts via reconstitute
    const dFull = DeliveryEntity.reconstitute({
      id: UUID, createdAt: NOW, updatedAt: NOW,
      props: {
        shipmentId: ShipmentIdVO.reconstitute(UUID2),
        orderId: OrderIdVO.reconstitute(UUID3),
        status: DeliveryStatusVO.reconstitute('out_for_delivery'),
        type: { value: 'standard' } as never,
        deliveryAddress: { toAddress: () => ADDR } as never,
        attempts: [
          { id: UUID, attemptNumber: { value: 1 }, status: { value: 'failed' }, attemptedAt: NOW, images: [], wasSuccessful: () => false } as never,
          { id: UUID2, attemptNumber: { value: 2 }, status: { value: 'failed' }, attemptedAt: NOW, images: [], wasSuccessful: () => false } as never,
          { id: UUID3, attemptNumber: { value: 3 }, status: { value: 'failed' }, attemptedAt: NOW, images: [], wasSuccessful: () => false } as never,
        ],
      } as never,
    });
    expect(() => dFull.addAttempt({ id: UUID3, status: 'failed' })).toThrow();
    // silence unused var
    void d2;
  });

  it('cannot add attempt after delivered', () => {
    const d = mkDeliveryWithStatus('delivered');
    expect(() => d.addAttempt({ id: UUID, status: 'failed' })).toThrow();
  });

  it('cancel from scheduled', () => {
    const d = mkDeliveryWithStatus('scheduled');
    d.cancel('x');
    expect(d.isCancelled()).toBe(true);
  });

  it('reschedule from failed', () => {
    const d = mkDeliveryWithStatus('failed');
    d.reschedule('retry');
    expect(d.isRescheduled()).toBe(true);
  });

  it('reschedule from delivered throws', () => {
    const d = mkDeliveryWithStatus('delivered');
    expect(() => d.reschedule('y')).toThrow();
  });

  it('updateNotes + lastAttempt + attemptSummary', () => {
    const d = mkDeliveryWithStatus('out_for_delivery');
    d.updateNotes({ value: 'note' } as never);
    expect(d.notes?.value).toBe('note');
    expect(d.lastAttempt).toBeUndefined();
    expect(d.attemptSummary).toBeDefined();
  });

  it('reconstitute preserves status', () => {
    const d = mkDeliveryWithStatus('in_transit');
    expect(d.isInTransit()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════
// Fulfillment
// ═══════════════════════════════════════════════════════════════
function mkF(status = 'pending'): FulfillmentEntity {
  return FulfillmentEntity.reconstitute({
    id: UUID, createdAt: NOW, updatedAt: NOW,
    props: {
      orderId: OrderIdVO.reconstitute(UUID2),
      status: FulfillmentStatusVO.reconstitute(status),
      type: { value: 'standard' } as never,
      priority: { value: 'normal' } as never,
      itemIds: ['i1', 'i2'],
    } as never,
  });
}

describe('FulfillmentEntity — corrected tests', () => {
  it('create + workflow to fulfilled', () => {
    const f = FulfillmentEntity.create({
      id: UUID, now: NOW,
      props: {
        orderId: OrderIdVO.reconstitute(UUID2),
        type: { value: 'standard' } as never,
        priority: { value: 'normal' } as never,
        itemIds: ['i1', 'i2'],
      } as never,
    });
    expect(f.isPending()).toBe(true);
    f.startProcessing();
    f.startPicking();
    f.startPacking();
    f.markReadyToShip();
    f.ship();
    f.markFulfilled();
    expect(f.isFulfilled()).toBe(true);
  });

  it('assign + changePriority + recordSlaBreach', () => {
    const f = mkF();
    f.assign(UUID2 as never);
    expect(f.isAssigned).toBe(true);  // getter
    f.changePriority({ value: 'high' } as never);
    expect(f.priority.value).toBe('high');
    f.recordSlaBreach();
  });

  it('putOnHold + release', () => {
    const f = mkF('processing');
    f.putOnHold('reason');
    expect(f.isOnHold()).toBe(true);
    f.release();
    expect(f.isProcessing()).toBe(true);
  });

  it('fail from processing', () => {
    const f = mkF('processing');
    f.fail('oops');
    expect(f.isFailed()).toBe(true);
  });

  it('cancel from pending', () => {
    const f = mkF('pending');
    f.cancel('x');
    expect(f.isCancelled()).toBe(true);
  });

  it('rejects > MAX_ITEMS', () => {
    expect(() => FulfillmentEntity.create({
      id: UUID, now: NOW,
      props: {
        orderId: OrderIdVO.reconstitute(UUID2),
        type: { value: 'standard' } as never,
        priority: { value: 'normal' } as never,
        itemIds: Array.from({ length: 200 }, (_, i) => `i${i}`),
      } as never,
    })).toThrow();
  });

  it('rejects empty items', () => {
    expect(() => FulfillmentEntity.create({
      id: UUID, now: NOW,
      props: {
        orderId: OrderIdVO.reconstitute(UUID2),
        type: { value: 'standard' } as never,
        priority: { value: 'normal' } as never,
        itemIds: [],
      } as never,
    })).toThrow();
  });

  it('changePriority after shipped throws', () => {
    const f = mkF('shipped');
    expect(() => f.changePriority({ value: 'urgent' } as never)).toThrow();
  });
});

// ═══════════════════════════════════════════════════════════════
// Insurance
// ═══════════════════════════════════════════════════════════════
function mkI(overrides: Record<string, unknown> = {}): InsuranceEntity {
  return InsuranceEntity.create({
    id: UUID, now: NOW,
    props: {
      shipmentId: ShipmentIdVO.reconstitute(UUID2),
      type: { value: 'standard', premiumPercent: 1 } as never,
      coverages: [{ value: 'loss' } as never],
      declaredValue: { amount: 5000, currency: 'BDT' } as never,
      startsAt: NOW,
      expiresAt: new Date(Date.now() + 86400_000).toISOString(),
      ...overrides,
    } as never,
  });
}

describe('InsuranceEntity — corrected tests', () => {
  it('create + premium auto', () => {
    const i = mkI();
    expect(i.isPending()).toBe(true);
    expect(i.premium.amount).toBeGreaterThan(0);
  });

  it('activate + isCovering via status VO', () => {
    const i = mkI();
    i.activate();
    expect(i.isActive()).toBe(true);
    expect(i.status.isCovering()).toBe(true);  // on status VO
  });

  it('expire', () => {
    const i = mkI();
    i.activate();
    i.expire();
    expect(i.isExpired()).toBe(true);
    expect(i.canFileClaim()).toBe(true);
  });

  it('cancel', () => {
    const i = mkI();
    i.cancel('test');
    expect(i.isCancelled()).toBe(true);
    expect(i.isFinal()).toBe(true);
  });

  it('fileClaim auto-approve when under threshold', () => {
    const i = mkI();
    i.activate();
    i.fileClaim({
      id: UUID2, claimNumber: 'CLM1', reason: { value: 'damage' } as never,
      amount: 500, currency: 'BDT', images: [{ value: 'http://x' } as never],
    });
    expect(i.isClaimed).toBe(true);
    expect(i.claim?.status.value).toBe('approved');
  });

  it('fileClaim above threshold → submitted', () => {
    const i = mkI();
    i.activate();
    i.fileClaim({
      id: UUID2, claimNumber: 'CLM1', reason: { value: 'damage' } as never,
      amount: 3000, currency: 'BDT', images: [{ value: 'http://x' } as never],
    });
    expect(i.claim?.status.value).toBe('submitted');
  });

  it('claim lifecycle submitted → review → approved → paid', () => {
    const i = mkI();
    i.activate();
    i.fileClaim({
      id: UUID2, claimNumber: 'CLM1', reason: { value: 'damage' } as never,
      amount: 3000, currency: 'BDT', images: [{ value: 'http://x' } as never],
    });
    i.startClaimReview();
    expect(i.claim?.status.value).toBe('under_review');
    i.approveClaim(2500);
    expect(i.claim?.status.value).toBe('approved');
    i.payClaim();
    expect(i.claim?.status.value).toBe('paid');
  });

  it('claim reject → appeal', () => {
    const i = mkI();
    i.activate();
    i.fileClaim({
      id: UUID2, claimNumber: 'CLM1', reason: { value: 'damage' } as never,
      amount: 3000, currency: 'BDT', images: [{ value: 'http://x' } as never],
    });
    i.startClaimReview();
    i.rejectClaim('no proof');
    expect(i.claim?.status.value).toBe('rejected');
    i.appealClaim('please review');
    expect(i.claim?.status.value).toBe('appealed');
  });

  it('fileClaim before activation throws', () => {
    const i = mkI();
    expect(() => i.fileClaim({
      id: UUID2, claimNumber: 'CLM1',
      reason: { value: 'damage' } as never, amount: 100, currency: 'BDT',
    })).toThrow();
  });

  it('approveClaim rejects amount > claim', () => {
    const i = mkI();
    i.activate();
    i.fileClaim({
      id: UUID2, claimNumber: 'CLM1', reason: { value: 'damage' } as never,
      amount: 3000, currency: 'BDT', images: [{ value: 'http://x' } as never],
    });
    i.startClaimReview();
    expect(() => i.approveClaim(9999)).toThrow();
  });

  it('covers()', () => {
    const i = mkI();
    expect(i.covers('loss')).toBe(true);
    expect(i.covers('theft')).toBe(false);
  });

  it('isClaimWindowOpen + isEffective', () => {
    const i = mkI();
    expect(i.isClaimWindowOpen()).toBe(true);
    expect(i.isEffective()).toBe(true);
  });

  it('rejects out of range declaredValue', () => {
    expect(() => mkI({ declaredValue: { amount: 10, currency: 'BDT' } })).toThrow();
  });

  it('rejects empty coverages', () => {
    expect(() => mkI({ coverages: [] })).toThrow();
  });

  it('rejects expires <= starts', () => {
    expect(() => mkI({ expiresAt: NOW, startsAt: NOW })).toThrow();
  });

  it('reconstitute', () => {
    const i = mkI();
    const re = InsuranceEntity.reconstitute({
      id: i.id, createdAt: i.createdAt, updatedAt: i.updatedAt,
      props: {
        policyNumber: i.policyNumber, shipmentId: i.shipmentId,
        status: i.status, type: i.type, coverages: i.coverages,
        declaredValue: i.declaredValue, premium: i.premium,
        startsAt: i.startsAt, expiresAt: i.expiresAt, isClaimed: i.isClaimed,
      } as never,
    });
    expect(re.isPending()).toBe(true);
  });
});
