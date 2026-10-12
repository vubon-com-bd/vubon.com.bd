/**
 * Compact data-driven tests for ALL 17 Status VOs.
 * Each VO: create/reconstitute + named constructors + predicates + transitions.
 */
import { describe, it, expect } from '@jest/globals';

import { CourierStatusVO } from '@domain/value-objects/primitives/courier-status.vo.js';
import { DeliveryAttemptStatusVO } from '@domain/value-objects/primitives/delivery-attempt-status.vo.js';
import { DispatchStatusVO } from '@domain/value-objects/primitives/dispatch-status.vo.js';
import { DriverStatusVO } from '@domain/value-objects/primitives/driver-status.vo.js';
import { FulfillmentStatusVO } from '@domain/value-objects/primitives/fulfillment-status.vo.js';
import { InsuranceClaimStatusVO } from '@domain/value-objects/primitives/insurance-claim-status.vo.js';
import { InsuranceStatusVO } from '@domain/value-objects/primitives/insurance-status.vo.js';
import { PackagingStatusVO } from '@domain/value-objects/primitives/packaging-status.vo.js';
import { RouteStatusVO } from '@domain/value-objects/primitives/route-status.vo.js';
import { ShippingMethodStatusVO } from '@domain/value-objects/primitives/shipping-method-status.vo.js';
import { TrackingStatusVO } from '@domain/value-objects/primitives/tracking-status.vo.js';
import { VehicleStatusVO } from '@domain/value-objects/primitives/vehicle-status.vo.js';
import { WarehouseStatusVO } from '@domain/value-objects/primitives/warehouse-status.vo.js';
import { ZoneStatusVO } from '@domain/value-objects/primitives/zone-status.vo.js';

// ═══════════════════════════════════════════════════════════════
// Parameterized helpers
// ═══════════════════════════════════════════════════════════════
type StatusVO = {
  create: (raw: string) => { value: string };
  reconstitute: (raw: string) => { value: string };
};

function testCreateReconstitute(name: string, VO: StatusVO, validValue: string) {
  describe(name, () => {
    it('create(valid) works', () => {
      expect(VO.create(validValue).value).toBe(validValue);
    });
    it('create(invalid) throws', () => {
      expect(() => VO.create('__NOPE__')).toThrow();
    });
    it('reconstitute(any) skips validation', () => {
      expect(VO.reconstitute('__ANY__').value).toBe('__ANY__');
    });
  });
}

// ═══ COURIER ═══
testCreateReconstitute('CourierStatusVO', CourierStatusVO, 'pending');
describe('CourierStatusVO named+predicates+transitions', () => {
  it('named constructors', () => {
    expect(CourierStatusVO.active().value).toBe('active');
    expect(CourierStatusVO.inactive().value).toBe('inactive');
    expect(CourierStatusVO.suspended().value).toBe('suspended');
    expect(CourierStatusVO.pending().value).toBe('pending');
    expect(CourierStatusVO.terminated().value).toBe('terminated');
  });
  it('predicates', () => {
    expect(CourierStatusVO.active().isActive()).toBe(true);
    expect(CourierStatusVO.active().isOperational()).toBe(true);
    expect(CourierStatusVO.inactive().isInactive()).toBe(true);
    expect(CourierStatusVO.suspended().isSuspended()).toBe(true);
    expect(CourierStatusVO.pending().isPending()).toBe(true);
    expect(CourierStatusVO.terminated().isTerminated()).toBe(true);
    expect(CourierStatusVO.terminated().isFinal()).toBe(true);
    expect(CourierStatusVO.suspended().isRecoverable()).toBe(true);
    expect(CourierStatusVO.inactive().isRecoverable()).toBe(true);
    expect(CourierStatusVO.active().isRecoverable()).toBe(false);
  });
  it('transitions', () => {
    expect(CourierStatusVO.pending().canTransitionTo('active')).toBe(true);
    expect(CourierStatusVO.active().canTransitionTo('suspended')).toBe(true);
    expect(CourierStatusVO.suspended().canTransitionTo('active')).toBe(true);
    expect(CourierStatusVO.terminated().canTransitionTo('active')).toBe(false);
  });
});

// ═══ DELIVERY ATTEMPT (terminal) ═══
testCreateReconstitute('DeliveryAttemptStatusVO', DeliveryAttemptStatusVO, 'success');
describe('DeliveryAttemptStatusVO predicates', () => {
  it('named constructors', () => {
    expect(DeliveryAttemptStatusVO.success().value).toBe('success');
    expect(DeliveryAttemptStatusVO.failed().value).toBe('failed');
    expect(DeliveryAttemptStatusVO.rescheduled().value).toBe('rescheduled');
    expect(DeliveryAttemptStatusVO.refused().value).toBe('refused');
    expect(DeliveryAttemptStatusVO.noOneAvailable().value).toBe('no_one_available');
    expect(DeliveryAttemptStatusVO.wrongAddress().value).toBe('wrong_address');
    expect(DeliveryAttemptStatusVO.accessDenied().value).toBe('access_denied');
  });
  it('predicates', () => {
    expect(DeliveryAttemptStatusVO.success().isSuccess()).toBe(true);
    expect(DeliveryAttemptStatusVO.failed().isFailed()).toBe(true);
    expect(DeliveryAttemptStatusVO.rescheduled().isRescheduled()).toBe(true);
    expect(DeliveryAttemptStatusVO.refused().isRefused()).toBe(true);
    expect(DeliveryAttemptStatusVO.noOneAvailable().isNoOneAvailable()).toBe(true);
    expect(DeliveryAttemptStatusVO.wrongAddress().isWrongAddress()).toBe(true);
    expect(DeliveryAttemptStatusVO.accessDenied().isAccessDenied()).toBe(true);
    expect(DeliveryAttemptStatusVO.success().isFinal()).toBe(true);
    expect(DeliveryAttemptStatusVO.failed().shouldRetry()).toBe(true);
    expect(DeliveryAttemptStatusVO.noOneAvailable().shouldRetry()).toBe(true);
    expect(DeliveryAttemptStatusVO.rescheduled().shouldRetry()).toBe(true);
    expect(DeliveryAttemptStatusVO.wrongAddress().requiresAddressCorrection()).toBe(true);
    expect(DeliveryAttemptStatusVO.success().canTransitionTo()).toBe(false);
  });
});

// ═══ DISPATCH ═══
testCreateReconstitute('DispatchStatusVO', DispatchStatusVO, 'pending');
describe('DispatchStatusVO', () => {
  it('named constructors + predicates', () => {
    expect(DispatchStatusVO.pending().isPending()).toBe(true);
    expect(DispatchStatusVO.assigned().isAssigned()).toBe(true);
    expect(DispatchStatusVO.dispatched().isDispatched()).toBe(true);
    expect(DispatchStatusVO.inTransit().isInTransit()).toBe(true);
    expect(DispatchStatusVO.delivered().isDelivered()).toBe(true);
    expect(DispatchStatusVO.failed().isFailed()).toBe(true);
    expect(DispatchStatusVO.returned().isReturned()).toBe(true);
    expect(DispatchStatusVO.cancelled().isCancelled()).toBe(true);
    expect(DispatchStatusVO.delivered().isFinal()).toBe(true);
    expect(DispatchStatusVO.dispatched().isInFlight()).toBe(true);
    expect(DispatchStatusVO.pending().canBeAssigned()).toBe(true);
    expect(DispatchStatusVO.pending().canBeStarted()).toBe(true);
  });
  it('transitions', () => {
    expect(DispatchStatusVO.pending().canTransitionTo('assigned')).toBe(true);
    expect(DispatchStatusVO.assigned().canTransitionTo('dispatched')).toBe(true);
    expect(DispatchStatusVO.dispatched().canTransitionTo('in_transit')).toBe(true);
    expect(DispatchStatusVO.inTransit().canTransitionTo('delivered')).toBe(true);
    expect(DispatchStatusVO.delivered().canTransitionTo('pending')).toBe(false);
    expect(DispatchStatusVO.failed().canTransitionTo('pending')).toBe(true);
  });
});

// ═══ DRIVER ═══
testCreateReconstitute('DriverStatusVO', DriverStatusVO, 'available');
describe('DriverStatusVO', () => {
  it('named + predicates', () => {
    expect(DriverStatusVO.available().isAvailable()).toBe(true);
    expect(DriverStatusVO.onDuty().isOnDuty()).toBe(true);
    expect(DriverStatusVO.onBreak().isOnBreak()).toBe(true);
    expect(DriverStatusVO.offDuty().isOffDuty()).toBe(true);
    expect(DriverStatusVO.onLeave().isOnLeave()).toBe(true);
    expect(DriverStatusVO.suspended().isSuspended()).toBe(true);
    expect(DriverStatusVO.inactive().isInactive()).toBe(true);
    expect(DriverStatusVO.inactive().isFinal()).toBe(true);
    expect(DriverStatusVO.available().canBeAssigned()).toBe(true);
    expect(DriverStatusVO.onDuty().canBeAssigned()).toBe(true);
    expect(DriverStatusVO.available().isWorking()).toBe(true);
    expect(DriverStatusVO.offDuty().isUnavailable()).toBe(true);
    expect(DriverStatusVO.suspended().isUnavailable()).toBe(true);
  });
  it('transitions', () => {
    expect(DriverStatusVO.available().canTransitionTo('on_duty')).toBe(true);
    expect(DriverStatusVO.onDuty().canTransitionTo('on_break')).toBe(true);
    expect(DriverStatusVO.onBreak().canTransitionTo('on_duty')).toBe(true);
    expect(DriverStatusVO.available().canTransitionTo('suspended')).toBe(true);
    expect(DriverStatusVO.inactive().canTransitionTo('available')).toBe(false);
  });
});

// ═══ FULFILLMENT ═══
testCreateReconstitute('FulfillmentStatusVO', FulfillmentStatusVO, 'pending');
describe('FulfillmentStatusVO', () => {
  it('named constructors', () => {
    expect(FulfillmentStatusVO.pending().value).toBe('pending');
    expect(FulfillmentStatusVO.processing().value).toBe('processing');
    expect(FulfillmentStatusVO.picking().value).toBe('picking');
    expect(FulfillmentStatusVO.packing().value).toBe('packing');
    expect(FulfillmentStatusVO.readyToShip().value).toBe('ready_to_ship');
    expect(FulfillmentStatusVO.shipped().value).toBe('shipped');
    expect(FulfillmentStatusVO.partiallyFulfilled().value).toBe('partially_fulfilled');
    expect(FulfillmentStatusVO.fulfilled().value).toBe('fulfilled');
    expect(FulfillmentStatusVO.cancelled().value).toBe('cancelled');
    expect(FulfillmentStatusVO.failed().value).toBe('failed');
    expect(FulfillmentStatusVO.onHold().value).toBe('on_hold');
  });
  it('predicates', () => {
    expect(FulfillmentStatusVO.pending().isPending()).toBe(true);
    expect(FulfillmentStatusVO.processing().isProcessing()).toBe(true);
    expect(FulfillmentStatusVO.picking().isPicking()).toBe(true);
    expect(FulfillmentStatusVO.packing().isPacking()).toBe(true);
    expect(FulfillmentStatusVO.readyToShip().isReadyToShip()).toBe(true);
    expect(FulfillmentStatusVO.shipped().isShipped()).toBe(true);
    expect(FulfillmentStatusVO.fulfilled().isFulfilled()).toBe(true);
    expect(FulfillmentStatusVO.cancelled().isCancelled()).toBe(true);
    expect(FulfillmentStatusVO.failed().isFailed()).toBe(true);
    expect(FulfillmentStatusVO.onHold().isOnHold()).toBe(true);
    expect(FulfillmentStatusVO.fulfilled().isFinal()).toBe(true);
    expect(FulfillmentStatusVO.processing().isInProgress()).toBe(true);
    expect(FulfillmentStatusVO.readyToShip().canBeShipped()).toBe(true);
    expect(FulfillmentStatusVO.pending().canBeCancelled()).toBe(true);
  });
  it('transitions', () => {
    expect(FulfillmentStatusVO.pending().canTransitionTo('processing')).toBe(true);
    expect(FulfillmentStatusVO.processing().canTransitionTo('picking')).toBe(true);
    expect(FulfillmentStatusVO.picking().canTransitionTo('packing')).toBe(true);
    expect(FulfillmentStatusVO.packing().canTransitionTo('ready_to_ship')).toBe(true);
    expect(FulfillmentStatusVO.readyToShip().canTransitionTo('shipped')).toBe(true);
    expect(FulfillmentStatusVO.shipped().canTransitionTo('fulfilled')).toBe(true);
    expect(FulfillmentStatusVO.fulfilled().canTransitionTo('pending')).toBe(false);
    expect(FulfillmentStatusVO.onHold().canTransitionTo('processing')).toBe(true);
  });
});

// ═══ INSURANCE CLAIM ═══
testCreateReconstitute('InsuranceClaimStatusVO', InsuranceClaimStatusVO, 'submitted');
describe('InsuranceClaimStatusVO', () => {
  it('named + predicates', () => {
    expect(InsuranceClaimStatusVO.submitted().isSubmitted()).toBe(true);
    expect(InsuranceClaimStatusVO.underReview().isUnderReview()).toBe(true);
    expect(InsuranceClaimStatusVO.approved().isApproved()).toBe(true);
    expect(InsuranceClaimStatusVO.rejected().isRejected()).toBe(true);
    expect(InsuranceClaimStatusVO.paid().isPaid()).toBe(true);
    expect(InsuranceClaimStatusVO.appealed().isAppealed()).toBe(true);
    expect(InsuranceClaimStatusVO.paid().isFinal()).toBe(true);
    expect(InsuranceClaimStatusVO.approved().isFavorable()).toBe(true);
    expect(InsuranceClaimStatusVO.rejected().canBeAppealed()).toBe(true);
  });
  it('transitions', () => {
    expect(InsuranceClaimStatusVO.submitted().canTransitionTo('under_review')).toBe(true);
    expect(InsuranceClaimStatusVO.underReview().canTransitionTo('approved')).toBe(true);
    expect(InsuranceClaimStatusVO.approved().canTransitionTo('paid')).toBe(true);
    expect(InsuranceClaimStatusVO.rejected().canTransitionTo('appealed')).toBe(true);
    expect(InsuranceClaimStatusVO.appealed().canTransitionTo('under_review')).toBe(true);
    expect(InsuranceClaimStatusVO.paid().canTransitionTo('submitted')).toBe(false);
  });
});

// ═══ INSURANCE ═══
testCreateReconstitute('InsuranceStatusVO', InsuranceStatusVO, 'active');
describe('InsuranceStatusVO', () => {
  it('named + predicates', () => {
    expect(InsuranceStatusVO.active().isActive()).toBe(true);
    expect(InsuranceStatusVO.inactive().isInactive()).toBe(true);
    expect(InsuranceStatusVO.expired().isExpired()).toBe(true);
    expect(InsuranceStatusVO.cancelled().isCancelled()).toBe(true);
    expect(InsuranceStatusVO.claimed().isClaimed()).toBe(true);
    expect(InsuranceStatusVO.pending().isPending()).toBe(true);
    expect(InsuranceStatusVO.expired().isFinal()).toBe(true);
    expect(InsuranceStatusVO.active().isCovering()).toBe(true);
    expect(InsuranceStatusVO.active().canFileClaim()).toBe(true);
    expect(InsuranceStatusVO.expired().canFileClaim()).toBe(true);
  });
  it('transitions', () => {
    expect(InsuranceStatusVO.pending().canTransitionTo('active')).toBe(true);
    expect(InsuranceStatusVO.active().canTransitionTo('claimed')).toBe(true);
    expect(InsuranceStatusVO.active().canTransitionTo('expired')).toBe(true);
    expect(InsuranceStatusVO.claimed().canTransitionTo('active')).toBe(false);
  });
});

// ═══ PACKAGING ═══
testCreateReconstitute('PackagingStatusVO', PackagingStatusVO, 'active');
describe('PackagingStatusVO', () => {
  it('named + predicates', () => {
    expect(PackagingStatusVO.active().isActive()).toBe(true);
    expect(PackagingStatusVO.inactive().isInactive()).toBe(true);
    expect(PackagingStatusVO.outOfStock().isOutOfStock()).toBe(true);
    expect(PackagingStatusVO.discontinued().isDiscontinued()).toBe(true);
    expect(PackagingStatusVO.discontinued().isFinal()).toBe(true);
    expect(PackagingStatusVO.active().canBeUsed()).toBe(true);
    expect(PackagingStatusVO.outOfStock().needsRestock()).toBe(true);
  });
  it('transitions', () => {
    expect(PackagingStatusVO.active().canTransitionTo('out_of_stock')).toBe(true);
    expect(PackagingStatusVO.outOfStock().canTransitionTo('active')).toBe(true);
    expect(PackagingStatusVO.discontinued().canTransitionTo('active')).toBe(false);
  });
});

// ═══ ROUTE ═══
testCreateReconstitute('RouteStatusVO', RouteStatusVO, 'draft');
describe('RouteStatusVO', () => {
  it('named + predicates', () => {
    expect(RouteStatusVO.draft().isDraft()).toBe(true);
    expect(RouteStatusVO.planned().isPlanned()).toBe(true);
    expect(RouteStatusVO.active().isActive()).toBe(true);
    expect(RouteStatusVO.completed().isCompleted()).toBe(true);
    expect(RouteStatusVO.cancelled().isCancelled()).toBe(true);
    expect(RouteStatusVO.optimizing().isOptimizing()).toBe(true);
    expect(RouteStatusVO.archived().isArchived()).toBe(true);
    expect(RouteStatusVO.completed().isFinal()).toBe(true);
    expect(RouteStatusVO.draft().canBeEdited()).toBe(true);
    expect(RouteStatusVO.planned().canBeStarted()).toBe(true);
    expect(RouteStatusVO.planned().canBeOptimized()).toBe(true);
  });
  it('transitions', () => {
    expect(RouteStatusVO.draft().canTransitionTo('planned')).toBe(true);
    expect(RouteStatusVO.planned().canTransitionTo('active')).toBe(true);
    expect(RouteStatusVO.active().canTransitionTo('completed')).toBe(true);
    expect(RouteStatusVO.completed().canTransitionTo('archived')).toBe(true);
    expect(RouteStatusVO.completed().canTransitionTo('draft')).toBe(false);
  });
});

// ═══ SHIPPING METHOD ═══
testCreateReconstitute('ShippingMethodStatusVO', ShippingMethodStatusVO, 'active');
describe('ShippingMethodStatusVO', () => {
  it('named + predicates', () => {
    expect(ShippingMethodStatusVO.active().isActive()).toBe(true);
    expect(ShippingMethodStatusVO.inactive().isInactive()).toBe(true);
    expect(ShippingMethodStatusVO.seasonal().isSeasonal()).toBe(true);
    expect(ShippingMethodStatusVO.suspended().isSuspended()).toBe(true);
    expect(ShippingMethodStatusVO.active().isFinal()).toBe(false);
    expect(ShippingMethodStatusVO.active().isSelectable()).toBe(true);
    expect(ShippingMethodStatusVO.seasonal().isSelectable()).toBe(true);
    expect(ShippingMethodStatusVO.inactive().isSelectable()).toBe(false);
  });
  it('transitions', () => {
    expect(ShippingMethodStatusVO.active().canTransitionTo('inactive')).toBe(true);
    expect(ShippingMethodStatusVO.inactive().canTransitionTo('active')).toBe(true);
    expect(ShippingMethodStatusVO.suspended().canTransitionTo('active')).toBe(true);
  });
});

// ═══ TRACKING ═══
testCreateReconstitute('TrackingStatusVO', TrackingStatusVO, 'pending');
describe('TrackingStatusVO', () => {
  it('named + predicates', () => {
    expect(TrackingStatusVO.pending().isPending()).toBe(true);
    expect(TrackingStatusVO.active().isActive()).toBe(true);
    expect(TrackingStatusVO.completed().isCompleted()).toBe(true);
    expect(TrackingStatusVO.failed().isFailed()).toBe(true);
    expect(TrackingStatusVO.expired().isExpired()).toBe(true);
    expect(TrackingStatusVO.unknown().isUnknown()).toBe(true);
    expect(TrackingStatusVO.completed().isFinal()).toBe(true);
    expect(TrackingStatusVO.pending().acceptsEvents()).toBe(true);
    expect(TrackingStatusVO.completed().acceptsEvents()).toBe(false);
  });
  it('transitions', () => {
    expect(TrackingStatusVO.pending().canTransitionTo('active')).toBe(true);
    expect(TrackingStatusVO.active().canTransitionTo('completed')).toBe(true);
    expect(TrackingStatusVO.unknown().canTransitionTo('pending')).toBe(true);
    expect(TrackingStatusVO.completed().canTransitionTo('active')).toBe(false);
  });
});

// ═══ VEHICLE ═══
testCreateReconstitute('VehicleStatusVO', VehicleStatusVO, 'available');
describe('VehicleStatusVO', () => {
  it('named + predicates', () => {
    expect(VehicleStatusVO.available().isAvailable()).toBe(true);
    expect(VehicleStatusVO.inUse().isInUse()).toBe(true);
    expect(VehicleStatusVO.maintenance().isMaintenance()).toBe(true);
    expect(VehicleStatusVO.outOfService().isOutOfService()).toBe(true);
    expect(VehicleStatusVO.retired().isRetired()).toBe(true);
    expect(VehicleStatusVO.reserved().isReserved()).toBe(true);
    expect(VehicleStatusVO.retired().isFinal()).toBe(true);
    expect(VehicleStatusVO.available().canBeAssigned()).toBe(true);
    expect(VehicleStatusVO.maintenance().isUnusable()).toBe(true);
  });
  it('transitions', () => {
    expect(VehicleStatusVO.available().canTransitionTo('in_use')).toBe(true);
    expect(VehicleStatusVO.inUse().canTransitionTo('available')).toBe(true);
    expect(VehicleStatusVO.available().canTransitionTo('maintenance')).toBe(true);
    expect(VehicleStatusVO.retired().canTransitionTo('available')).toBe(false);
  });
});

// ═══ WAREHOUSE ═══
testCreateReconstitute('WarehouseStatusVO', WarehouseStatusVO, 'active');
describe('WarehouseStatusVO', () => {
  it('named + predicates', () => {
    expect(WarehouseStatusVO.active().isActive()).toBe(true);
    expect(WarehouseStatusVO.inactive().isInactive()).toBe(true);
    expect(WarehouseStatusVO.maintenance().isMaintenance()).toBe(true);
    expect(WarehouseStatusVO.full().isFull()).toBe(true);
    expect(WarehouseStatusVO.closed().isClosed()).toBe(true);
    expect(WarehouseStatusVO.archived().isArchived()).toBe(true);
    expect(WarehouseStatusVO.archived().isFinal()).toBe(true);
    expect(WarehouseStatusVO.active().canAcceptInbound()).toBe(true);
    expect(WarehouseStatusVO.full().canDispatch()).toBe(true);
    expect(WarehouseStatusVO.inactive().canAcceptInbound()).toBe(false);
  });
  it('transitions', () => {
    expect(WarehouseStatusVO.active().canTransitionTo('full')).toBe(true);
    expect(WarehouseStatusVO.full().canTransitionTo('active')).toBe(true);
    expect(WarehouseStatusVO.active().canTransitionTo('maintenance')).toBe(true);
    expect(WarehouseStatusVO.archived().canTransitionTo('active')).toBe(false);
  });
});

// ═══ ZONE ═══
testCreateReconstitute('ZoneStatusVO', ZoneStatusVO, 'active');
describe('ZoneStatusVO', () => {
  it('named + predicates', () => {
    expect(ZoneStatusVO.active().isActive()).toBe(true);
    expect(ZoneStatusVO.inactive().isInactive()).toBe(true);
    expect(ZoneStatusVO.restricted().isRestricted()).toBe(true);
    expect(ZoneStatusVO.suspended().isSuspended()).toBe(true);
    expect(ZoneStatusVO.archived().isArchived()).toBe(true);
    expect(ZoneStatusVO.archived().isFinal()).toBe(true);
    expect(ZoneStatusVO.active().canAcceptOrders()).toBe(true);
    expect(ZoneStatusVO.suspended().canAcceptOrders()).toBe(false);
  });
  it('transitions', () => {
    expect(ZoneStatusVO.active().canTransitionTo('inactive')).toBe(true);
    expect(ZoneStatusVO.inactive().canTransitionTo('active')).toBe(true);
    expect(ZoneStatusVO.active().canTransitionTo('restricted')).toBe(true);
    expect(ZoneStatusVO.archived().canTransitionTo('active')).toBe(false);
  });
});
