/**
 * ReturnShipmentStatusVO — RMA lifecycle state machine
 */
import { describe, it, expect } from '@jest/globals';
import { ReturnShipmentStatusVO } from '@domain/value-objects/primitives/return-shipment-status.vo.js';

describe('ReturnShipmentStatusVO', () => {
  it('creates requested status', () => {
    expect(ReturnShipmentStatusVO.requested().value).toBe('requested');
  });
  it('throws on invalid status', () => {
    expect(() => ReturnShipmentStatusVO.create('__bad__')).toThrow();
  });

  describe('predicates', () => {
    it('isFinal() for completed/rejected/cancelled/lost', () => {
      expect(ReturnShipmentStatusVO.completed().isFinal()).toBe(true);
      expect(ReturnShipmentStatusVO.rejected().isFinal()).toBe(true);
      expect(ReturnShipmentStatusVO.cancelled().isFinal()).toBe(true);
      expect(ReturnShipmentStatusVO.lost().isFinal()).toBe(true);
      expect(ReturnShipmentStatusVO.pickedUp().isFinal()).toBe(false);
    });
    it('canBeCancelled() before pickup', () => {
      expect(ReturnShipmentStatusVO.requested().canBeCancelled()).toBe(true);
      expect(ReturnShipmentStatusVO.approved().canBeCancelled()).toBe(true);
      expect(ReturnShipmentStatusVO.pickupScheduled().canBeCancelled()).toBe(true);
    });
    it('canBeCancelled() false once picked up', () => {
      expect(ReturnShipmentStatusVO.pickedUp().canBeCancelled()).toBe(false);
      expect(ReturnShipmentStatusVO.inTransit().canBeCancelled()).toBe(false);
    });
    it('isInFlight() for picked_up/in_transit', () => {
      expect(ReturnShipmentStatusVO.pickedUp().isInFlight()).toBe(true);
      expect(ReturnShipmentStatusVO.inTransit().isInFlight()).toBe(true);
      expect(ReturnShipmentStatusVO.received().isInFlight()).toBe(false);
    });
    it('canBeInspected() only after received', () => {
      expect(ReturnShipmentStatusVO.received().canBeInspected()).toBe(true);
      expect(ReturnShipmentStatusVO.inTransit().canBeInspected()).toBe(false);
    });
    it('canBeCompleted() only after inspection', () => {
      expect(ReturnShipmentStatusVO.inspected().canBeCompleted()).toBe(true);
      expect(ReturnShipmentStatusVO.received().canBeCompleted()).toBe(false);
    });
  });

  describe('state machine (happy path)', () => {
    it('requested → approved ✅', () => {
      expect(ReturnShipmentStatusVO.requested().canTransitionTo('approved')).toBe(true);
    });
    it('approved → pickup_scheduled ✅', () => {
      expect(ReturnShipmentStatusVO.approved().canTransitionTo('pickup_scheduled')).toBe(true);
    });
    it('pickup_scheduled → picked_up ✅', () => {
      expect(ReturnShipmentStatusVO.pickupScheduled().canTransitionTo('picked_up')).toBe(true);
    });
    it('picked_up → in_transit ✅', () => {
      expect(ReturnShipmentStatusVO.pickedUp().canTransitionTo('in_transit')).toBe(true);
    });
    it('in_transit → received ✅', () => {
      expect(ReturnShipmentStatusVO.inTransit().canTransitionTo('received')).toBe(true);
    });
    it('received → inspected ✅', () => {
      expect(ReturnShipmentStatusVO.received().canTransitionTo('inspected')).toBe(true);
    });
    it('inspected → completed ✅', () => {
      expect(ReturnShipmentStatusVO.inspected().canTransitionTo('completed')).toBe(true);
    });
  });

  describe('state machine (fail paths)', () => {
    it('requested → rejected ✅', () => {
      expect(ReturnShipmentStatusVO.requested().canTransitionTo('rejected')).toBe(true);
    });
    it('requested → cancelled ✅', () => {
      expect(ReturnShipmentStatusVO.requested().canTransitionTo('cancelled')).toBe(true);
    });
    it('pickup_scheduled → lost ✅', () => {
      expect(ReturnShipmentStatusVO.pickupScheduled().canTransitionTo('lost')).toBe(true);
    });
    it('picked_up → lost ✅', () => {
      expect(ReturnShipmentStatusVO.pickedUp().canTransitionTo('lost')).toBe(true);
    });
    it('in_transit → lost ✅', () => {
      expect(ReturnShipmentStatusVO.inTransit().canTransitionTo('lost')).toBe(true);
    });
    it('completed has NO transitions (final)', () => {
      expect(ReturnShipmentStatusVO.completed().canTransitionTo('requested')).toBe(false);
    });
    it('inspected → rejected ✅ (inspection fail)', () => {
      expect(ReturnShipmentStatusVO.inspected().canTransitionTo('rejected')).toBe(true);
    });
    it('requested → completed ❌ (skipping)', () => {
      expect(ReturnShipmentStatusVO.requested().canTransitionTo('completed')).toBe(false);
    });
  });
});
