/**
 * ShipmentStatusVO — state machine + predicate test suite
 */
import { describe, it, expect } from '@jest/globals';
import { ShipmentStatusVO } from '@domain/value-objects/primitives/shipment-status.vo.js';

describe('ShipmentStatusVO', () => {
  describe('create()', () => {
    it('accepts a valid status', () => {
      expect(ShipmentStatusVO.create('pending').value).toBe('pending');
    });
    it('throws InvalidShipmentStatusError on bad value', () => {
      expect(() => ShipmentStatusVO.create('__nope__')).toThrow();
    });
  });

  describe('named constructors', () => {
    it('pending() returns pending', () => {
      expect(ShipmentStatusVO.pending().value).toBe('pending');
    });
    it('delivered() returns delivered', () => {
      expect(ShipmentStatusVO.delivered().value).toBe('delivered');
    });
    it('cancelled() returns cancelled', () => {
      expect(ShipmentStatusVO.cancelled().value).toBe('cancelled');
    });
  });

  describe('predicates', () => {
    it('isFinal() true for delivered/returned/cancelled', () => {
      expect(ShipmentStatusVO.delivered().isFinal()).toBe(true);
      expect(ShipmentStatusVO.returned().isFinal()).toBe(true);
      expect(ShipmentStatusVO.cancelled().isFinal()).toBe(true);
    });
    it('isFinal() false for pending/in_transit', () => {
      expect(ShipmentStatusVO.pending().isFinal()).toBe(false);
      expect(ShipmentStatusVO.inTransit().isFinal()).toBe(false);
    });
    it('isInFlight() true for picked_up/in_transit/out_for_delivery', () => {
      expect(ShipmentStatusVO.pickedUp().isInFlight()).toBe(true);
      expect(ShipmentStatusVO.inTransit().isInFlight()).toBe(true);
      expect(ShipmentStatusVO.outForDelivery().isInFlight()).toBe(true);
    });
    it('isInFlight() false for pending/packed/delivered', () => {
      expect(ShipmentStatusVO.pending().isInFlight()).toBe(false);
      expect(ShipmentStatusVO.packed().isInFlight()).toBe(false);
      expect(ShipmentStatusVO.delivered().isInFlight()).toBe(false);
    });
    it('isPreFulfillment() true for pending/confirmed/processing/packed', () => {
      expect(ShipmentStatusVO.pending().isPreFulfillment()).toBe(true);
      expect(ShipmentStatusVO.packed().isPreFulfillment()).toBe(true);
    });
    it('canBeCancelled() true before shipment departs', () => {
      expect(ShipmentStatusVO.pending().canBeCancelled()).toBe(true);
      expect(ShipmentStatusVO.processing().canBeCancelled()).toBe(true);
      expect(ShipmentStatusVO.packed().canBeCancelled()).toBe(true);
    });
    it('canBeCancelled() false once in flight', () => {
      expect(ShipmentStatusVO.pickedUp().canBeCancelled()).toBe(false);
      expect(ShipmentStatusVO.inTransit().canBeCancelled()).toBe(false);
    });
    it('canGenerateLabel() true only for confirmed/processing/packed', () => {
      expect(ShipmentStatusVO.confirmed().canGenerateLabel()).toBe(true);
      expect(ShipmentStatusVO.processing().canGenerateLabel()).toBe(true);
      expect(ShipmentStatusVO.packed().canGenerateLabel()).toBe(true);
      expect(ShipmentStatusVO.pending().canGenerateLabel()).toBe(false);
      expect(ShipmentStatusVO.delivered().canGenerateLabel()).toBe(false);
    });
  });

  describe('state machine (canTransitionTo)', () => {
    it('pending → confirmed ✅', () => {
      expect(ShipmentStatusVO.pending().canTransitionTo('confirmed')).toBe(true);
    });
    it('pending → delivered ❌', () => {
      expect(ShipmentStatusVO.pending().canTransitionTo('delivered')).toBe(false);
    });
    it('confirmed → processing ✅', () => {
      expect(ShipmentStatusVO.confirmed().canTransitionTo('processing')).toBe(true);
    });
    it('processing → packed ✅', () => {
      expect(ShipmentStatusVO.processing().canTransitionTo('packed')).toBe(true);
    });
    it('packed → picked_up ✅', () => {
      expect(ShipmentStatusVO.packed().canTransitionTo('picked_up')).toBe(true);
    });
    it('picked_up → in_transit ✅', () => {
      expect(ShipmentStatusVO.pickedUp().canTransitionTo('in_transit')).toBe(true);
    });
    it('in_transit → out_for_delivery ✅', () => {
      expect(ShipmentStatusVO.inTransit().canTransitionTo('out_for_delivery')).toBe(true);
    });
    it('out_for_delivery → delivered ✅', () => {
      expect(ShipmentStatusVO.outForDelivery().canTransitionTo('delivered')).toBe(true);
    });
    it('delivered has NO transitions (final)', () => {
      expect(ShipmentStatusVO.delivered().canTransitionTo('pending')).toBe(false);
      expect(ShipmentStatusVO.delivered().canTransitionTo('in_transit')).toBe(false);
      expect(ShipmentStatusVO.delivered().canTransitionTo('cancelled')).toBe(false);
    });
    it('cancelled has NO transitions (final)', () => {
      expect(ShipmentStatusVO.cancelled().canTransitionTo('pending')).toBe(false);
    });
    it('on_hold → processing ✅ (release)', () => {
      expect(ShipmentStatusVO.onHold().canTransitionTo('processing')).toBe(true);
    });
    it('delayed → in_transit ✅', () => {
      expect(ShipmentStatusVO.delayed().canTransitionTo('in_transit')).toBe(true);
    });
    it('failed → pending ✅ (retry)', () => {
      expect(ShipmentStatusVO.failed().canTransitionTo('pending')).toBe(true);
    });
  });
});
