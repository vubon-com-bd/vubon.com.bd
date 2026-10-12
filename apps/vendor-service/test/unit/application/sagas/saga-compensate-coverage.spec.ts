/**
 * Saga Compensate Coverage — Branch coverage for compensate() paths
 * @module vendor-service/test/unit/application/sagas
 */
import { describe, it, expect } from '@jest/globals';

import { VendorApprovalSaga } from '../../../../src/module/application/sagas/vendor-approval.saga.js';
import { VendorPayoutSaga } from '../../../../src/module/application/sagas/vendor-payout.saga.js';
import { VendorRegistrationSaga } from '../../../../src/module/application/sagas/vendor-registration.saga.js';
import { VendorSubscriptionSaga } from '../../../../src/module/application/sagas/vendor-subscription.saga.js';
import { VendorSuspensionSaga } from '../../../../src/module/application/sagas/vendor-suspension.saga.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const NOW = '2025-01-01T00:00:00.000Z';

// ═══════════════════════════════════════════════════════════════════
// 1. VendorApprovalSaga — compensate() all branches
// ═══════════════════════════════════════════════════════════════════
describe('VendorApprovalSaga — compensate coverage', () => {
  it('compensate() early return when no context (line 50)', async () => {
    const saga = new VendorApprovalSaga();
    // Never called execute → context undefined
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() cleanup defaults branch (defaultsSetup && !notified)', async () => {
    const saga = new VendorApprovalSaga();
    await saga.execute({ vendorId: UUID, approvedBy: 'admin-1' });
    // Manually set partial context state
    (saga as unknown as { context: unknown }).context = {
      vendorId: UUID,
      approvedBy: 'admin-1',
      approved: true,
      activated: false,
      defaultsSetup: true,
      notified: false,
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() deactivate branch (activated && !notified)', async () => {
    const saga = new VendorApprovalSaga();
    (saga as unknown as { context: unknown }).context = {
      vendorId: UUID,
      approvedBy: 'admin-1',
      approved: true,
      activated: true,
      defaultsSetup: false,
      notified: false,
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() full cleanup (both branches)', async () => {
    const saga = new VendorApprovalSaga();
    (saga as unknown as { context: unknown }).context = {
      vendorId: UUID,
      approvedBy: 'admin-1',
      approved: true,
      activated: true,
      defaultsSetup: true,
      notified: false,
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() no-op when notified (final state)', async () => {
    const saga = new VendorApprovalSaga();
    await saga.execute({ vendorId: UUID, approvedBy: 'admin-1' });
    await expect(saga.compensate()).resolves.toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════════════════
// 2. VendorPayoutSaga — compensate() branches
// ═══════════════════════════════════════════════════════════════════
describe('VendorPayoutSaga — compensate coverage', () => {
  it('compensate() early return when no context (line 54)', async () => {
    const saga = new VendorPayoutSaga();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() partial state (statsRecorded && !notified)', async () => {
    const saga = new VendorPayoutSaga();
    (saga as unknown as { context: unknown }).context = {
      payoutId: 'p-1',
      vendorId: UUID,
      amount: 5000,
      approved: true,
      notified: false,
      statsRecorded: true,
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() with full state (notified=true)', async () => {
    const saga = new VendorPayoutSaga();
    await saga.execute({ payoutId: 'p-1', vendorId: UUID, amount: 5000 });
    await expect(saga.compensate()).resolves.toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════════════════
// 3. VendorSubscriptionSaga — compensate() branches
// ═══════════════════════════════════════════════════════════════════
describe('VendorSubscriptionSaga — compensate coverage', () => {
  it('compensate() early return when no context (line 52)', async () => {
    const saga = new VendorSubscriptionSaga();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() partial revert (planApplied && !notified)', async () => {
    const saga = new VendorSubscriptionSaga();
    (saga as unknown as { context: unknown }).context = {
      subscriptionId: 'sub-1',
      vendorId: UUID,
      fromPlan: 'basic',
      toPlan: 'premium',
      planApplied: true,
      featuresUpdated: false,
      notified: false,
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() full state (notified)', async () => {
    const saga = new VendorSubscriptionSaga();
    await saga.execute({
      subscriptionId: 'sub-1',
      vendorId: UUID,
      fromPlan: 'basic',
      toPlan: 'premium',
    });
    await expect(saga.compensate()).resolves.toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════════════════
// 4. VendorSuspensionSaga — compensate() branches
// ═══════════════════════════════════════════════════════════════════
describe('VendorSuspensionSaga — compensate coverage', () => {
  it('compensate() early return when no context (line 49)', async () => {
    const saga = new VendorSuspensionSaga();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() lift suspension (marked && !notified)', async () => {
    const saga = new VendorSuspensionSaga();
    (saga as unknown as { context: unknown }).context = {
      suspensionId: 'sus-1',
      vendorId: UUID,
      reason: 'policy_violation',
      marked: true,
      sessionsRevoked: false,
      notified: false,
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() full state (notified)', async () => {
    const saga = new VendorSuspensionSaga();
    await saga.execute({
      suspensionId: 'sus-1',
      vendorId: UUID,
      reason: 'policy_violation',
    });
    await expect(saga.compensate()).resolves.toBeUndefined();
  });
});

// ═══════════════════════════════════════════════════════════════════
// 5. VendorRegistrationSaga — compensate + edge cases
// ═══════════════════════════════════════════════════════════════════
describe('VendorRegistrationSaga — compensate + edge coverage', () => {
  it('compensate() early return when no context (line 60)', async () => {
    const saga = new VendorRegistrationSaga();
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() rolls back completed steps', async () => {
    const saga = new VendorRegistrationSaga();
    // Set up partial completion state
    (saga as unknown as { context: unknown }).context = {
      vendorId: UUID,
      currency: 'BDT',
      completedSteps: ['settings', 'shipping', 'return_policy'],
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() with all steps', async () => {
    const saga = new VendorRegistrationSaga();
    (saga as unknown as { context: unknown }).context = {
      vendorId: UUID,
      currency: 'BDT',
      completedSteps: ['settings', 'shipping', 'return_policy', 'warranty', 'rating'],
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('execute() full success path', async () => {
    const saga = new VendorRegistrationSaga();
    await expect(
      saga.execute({ vendorId: UUID, currency: 'BDT' }),
    ).resolves.toBeUndefined();
  });

  it('compensate() after successful execute', async () => {
    const saga = new VendorRegistrationSaga();
    await saga.execute({ vendorId: UUID, currency: 'BDT' });
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('getContext() returns undefined before execute', () => {
    const saga = new VendorRegistrationSaga();
    const ctx = saga.getContext();
    expect(ctx).toBeUndefined();
  });

  it('getContext() returns context after execute', async () => {
    const saga = new VendorRegistrationSaga();
    await saga.execute({ vendorId: UUID, currency: 'BDT' });
    const ctx = saga.getContext();
    expect(ctx).toBeDefined();
    expect(ctx!.vendorId).toBe(UUID);
    expect(ctx!.currency).toBe('BDT');
  });
});

// ═══════════════════════════════════════════════════════════════════
// 6. Saga commands — branch coverage
// ═══════════════════════════════════════════════════════════════════
describe('Saga Commands — instantiation coverage', () => {
  it('InitializeVendorSettingsSagaCommand has type', async () => {
    const { InitializeVendorSettingsSagaCommand } = await import(
      '../../../../src/module/application/sagas/commands/vendor-registration.saga-commands.js'
    );
    const cmd = new InitializeVendorSettingsSagaCommand(UUID, 'BDT', 'saga-1');
    expect(cmd.type).toBe('vendor.saga.initialize_settings');
  });

  it('InitializeVendorShippingSagaCommand has type', async () => {
    const { InitializeVendorShippingSagaCommand } = await import(
      '../../../../src/module/application/sagas/commands/vendor-registration.saga-commands.js'
    );
    const cmd = new InitializeVendorShippingSagaCommand(UUID, 'saga-2');
    expect(cmd.type).toBe('vendor.saga.initialize_shipping');
  });

  it('InitializeVendorReturnPolicySagaCommand has type', async () => {
    const { InitializeVendorReturnPolicySagaCommand } = await import(
      '../../../../src/module/application/sagas/commands/vendor-registration.saga-commands.js'
    );
    const cmd = new InitializeVendorReturnPolicySagaCommand(UUID, 'saga-3');
    expect(cmd.type).toBe('vendor.saga.initialize_return_policy');
  });

  it('InitializeVendorWarrantySagaCommand has type', async () => {
    const { InitializeVendorWarrantySagaCommand } = await import(
      '../../../../src/module/application/sagas/commands/vendor-registration.saga-commands.js'
    );
    const cmd = new InitializeVendorWarrantySagaCommand(UUID, 'saga-4');
    expect(cmd.type).toBe('vendor.saga.initialize_warranty');
  });

  it('InitializeVendorRatingSagaCommand has type', async () => {
    const { InitializeVendorRatingSagaCommand } = await import(
      '../../../../src/module/application/sagas/commands/vendor-registration.saga-commands.js'
    );
    const cmd = new InitializeVendorRatingSagaCommand(UUID, 'saga-5');
    expect(cmd.type).toBe('vendor.saga.initialize_rating');
  });

  it('NotifyVendorPayoutApprovedSagaCommand has type', async () => {
    const { NotifyVendorPayoutApprovedSagaCommand } = await import(
      '../../../../src/module/application/sagas/commands/vendor-payout.saga-commands.js'
    );
    const cmd = new NotifyVendorPayoutApprovedSagaCommand(UUID, 'p-1', 'saga-6');
    expect(cmd.type).toBe('vendor.saga.notify_payout_approved');
  });

  it('RecordPayoutStatsSagaCommand has type', async () => {
    const { RecordPayoutStatsSagaCommand } = await import(
      '../../../../src/module/application/sagas/commands/vendor-payout.saga-commands.js'
    );
    const cmd = new RecordPayoutStatsSagaCommand(UUID, 5000, 'saga-7');
    expect(cmd.type).toBe('vendor.saga.record_payout_stats');
  });
});
