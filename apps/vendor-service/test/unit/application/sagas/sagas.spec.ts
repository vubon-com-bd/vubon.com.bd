/**
 * All sagas — bulk tests
 */
import { jest } from '@jest/globals';
import { VendorRegistrationSaga } from '../../../../src/module/application/sagas/vendor-registration.saga.js';
import { VendorPayoutSaga } from '../../../../src/module/application/sagas/vendor-payout.saga.js';
import { VendorSuspensionSaga } from '../../../../src/module/application/sagas/vendor-suspension.saga.js';
import { VendorApprovalSaga } from '../../../../src/module/application/sagas/vendor-approval.saga.js';
import { VendorSubscriptionSaga } from '../../../../src/module/application/sagas/vendor-subscription.saga.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('VendorRegistrationSaga', () => {
  let saga: VendorRegistrationSaga;
  beforeEach(() => { saga = new VendorRegistrationSaga(); });

  it('has correct name', () => {
    expect(saga.name).toBe('VendorRegistrationSaga');
  });

  it('execute completes all steps', async () => {
    await saga.execute({ vendorId: UUID, currency: 'BDT' });
    expect(saga.getContext().vendorId).toBe(UUID);
    expect(saga.getContext().completedSteps.length).toBe(5);
  });

  it('compensate does not throw', async () => {
    await saga.execute({ vendorId: UUID, currency: 'BDT' });
    await expect(saga.compensate()).resolves.not.toThrow();
  });

  it('compensate with no context is safe', async () => {
    await expect(saga.compensate()).resolves.not.toThrow();
  });
});

describe('VendorPayoutSaga', () => {
  let saga: VendorPayoutSaga;
  beforeEach(() => { saga = new VendorPayoutSaga(); });

  it('has correct name', () => {
    expect(saga.name).toBe('VendorPayoutSaga');
  });

  it('execute completes steps', async () => {
    await saga.execute({ payoutId: UUID, vendorId: UUID, amount: 5000 });
    const ctx = saga.getContext();
    expect(ctx.approved).toBe(true);
    expect(ctx.notified).toBe(true);
    expect(ctx.statsRecorded).toBe(true);
  });

  it('compensate is safe', async () => {
    await saga.execute({ payoutId: UUID, vendorId: UUID, amount: 5000 });
    await expect(saga.compensate()).resolves.not.toThrow();
  });
});

describe('VendorSuspensionSaga', () => {
  let saga: VendorSuspensionSaga;
  beforeEach(() => { saga = new VendorSuspensionSaga(); });

  it('has correct name', () => {
    expect(saga.name).toBe('VendorSuspensionSaga');
  });

  it('execute completes steps', async () => {
    await saga.execute({ suspensionId: UUID, vendorId: UUID, reason: 'policy' });
    const ctx = saga.getContext();
    expect(ctx.marked).toBe(true);
    expect(ctx.sessionsRevoked).toBe(true);
    expect(ctx.notified).toBe(true);
  });

  it('compensate is safe', async () => {
    await saga.execute({ suspensionId: UUID, vendorId: UUID, reason: 'policy' });
    await expect(saga.compensate()).resolves.not.toThrow();
  });
});

describe('VendorApprovalSaga', () => {
  let saga: VendorApprovalSaga;
  beforeEach(() => { saga = new VendorApprovalSaga(); });

  it('has correct name', () => {
    expect(saga.name).toBe('VendorApprovalSaga');
  });

  it('execute completes steps', async () => {
    await saga.execute({ vendorId: UUID, approvedBy: UUID });
    const ctx = saga.getContext();
    expect(ctx.approved).toBe(true);
    expect(ctx.activated).toBe(true);
    expect(ctx.defaultsSetup).toBe(true);
    expect(ctx.notified).toBe(true);
  });

  it('compensate is safe', async () => {
    await saga.execute({ vendorId: UUID, approvedBy: UUID });
    await expect(saga.compensate()).resolves.not.toThrow();
  });
});

describe('VendorSubscriptionSaga', () => {
  let saga: VendorSubscriptionSaga;
  beforeEach(() => { saga = new VendorSubscriptionSaga(); });

  it('has correct name', () => {
    expect(saga.name).toBe('VendorSubscriptionSaga');
  });

  it('execute completes steps', async () => {
    await saga.execute({
      subscriptionId: UUID,
      vendorId: UUID,
      fromPlan: 'basic',
      toPlan: 'premium',
    });
    const ctx = saga.getContext();
    expect(ctx.planApplied).toBe(true);
    expect(ctx.featuresUpdated).toBe(true);
    expect(ctx.notified).toBe(true);
  });

  it('compensate is safe', async () => {
    await saga.execute({
      subscriptionId: UUID,
      vendorId: UUID,
      fromPlan: 'basic',
      toPlan: 'premium',
    });
    await expect(saga.compensate()).resolves.not.toThrow();
  });
});
