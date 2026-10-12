import {
  VENDOR_SUBSCRIPTION_EVENT_TYPE,
  VendorSubscriptionCreatedEvent,
  VendorSubscriptionPlanChangedEvent,
  VendorSubscriptionRenewedEvent,
  VendorSubscriptionCancelledEvent,
  VendorSubscriptionResumedEvent,
  VendorSubscriptionPastDueEvent,
  VendorSubscriptionExpiredEvent,
} from '../../../../src/module/domain/events/vendor-subscription.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const END = '2026-02-01T00:00:00.000Z';

describe('Vendor subscription events', () => {
  it('constants defined', () => {
    expect(VENDOR_SUBSCRIPTION_EVENT_TYPE.CREATED).toBe('vendor.subscription.created');
    expect(VENDOR_SUBSCRIPTION_EVENT_TYPE.PLAN_CHANGED).toBe('vendor.subscription.plan_changed');
  });

  it('VendorSubscriptionCreatedEvent', () => {
    const e = new VendorSubscriptionCreatedEvent({
      aggregateId: UUID,
      payload: {
        subscriptionId: UUID, vendorId: UUID, plan: 'basic',
        cycle: 'monthly', price: 500, currency: 'BDT', createdAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.subscription.created');
    expect(e.aggregateType).toBe('VendorSubscription');
  });

  it('VendorSubscriptionPlanChangedEvent', () => {
    const e = new VendorSubscriptionPlanChangedEvent({
      aggregateId: UUID,
      payload: {
        subscriptionId: UUID, vendorId: UUID,
        fromPlan: 'basic', toPlan: 'premium',
        newPrice: 2000, currency: 'BDT', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.subscription.plan_changed');
    expect(e.payload.toPlan).toBe('premium');
  });

  it('VendorSubscriptionRenewedEvent', () => {
    const e = new VendorSubscriptionRenewedEvent({
      aggregateId: UUID,
      payload: {
        subscriptionId: UUID, vendorId: UUID,
        periodStart: NOW, periodEnd: END, renewedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.subscription.renewed');
  });

  it('VendorSubscriptionCancelledEvent', () => {
    const e = new VendorSubscriptionCancelledEvent({
      aggregateId: UUID,
      payload: {
        subscriptionId: UUID, vendorId: UUID,
        immediate: false, cancelledAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.subscription.cancelled');
  });

  it('VendorSubscriptionResumedEvent', () => {
    const e = new VendorSubscriptionResumedEvent({
      aggregateId: UUID,
      payload: { subscriptionId: UUID, vendorId: UUID, resumedAt: NOW },
    });
    expect(e.type).toBe('vendor.subscription.resumed');
  });

  it('VendorSubscriptionPastDueEvent', () => {
    const e = new VendorSubscriptionPastDueEvent({
      aggregateId: UUID,
      payload: { subscriptionId: UUID, vendorId: UUID, markedAt: NOW },
    });
    expect(e.type).toBe('vendor.subscription.past_due');
  });

  it('VendorSubscriptionExpiredEvent', () => {
    const e = new VendorSubscriptionExpiredEvent({
      aggregateId: UUID,
      payload: { subscriptionId: UUID, vendorId: UUID, expiredAt: NOW },
    });
    expect(e.type).toBe('vendor.subscription.expired');
  });
});
