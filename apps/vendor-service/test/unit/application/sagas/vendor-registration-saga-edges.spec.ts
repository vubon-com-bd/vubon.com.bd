/**
 * VendorRegistrationSaga — Edge cases (lines 53-59, 85, 99)
 * @module vendor-service/test/unit/application/sagas
 */
import { describe, it, expect } from '@jest/globals';

import { VendorRegistrationSaga } from '../../../../src/module/application/sagas/vendor-registration.saga.js';

const UUID = '11111111-1111-4111-8111-111111111111';

describe('VendorRegistrationSaga — edge branches', () => {
  it('execute() throws when unknown step (line 85 default case)', async () => {
    // Subclass that injects an invalid step into STEPS via cast
    const saga = new VendorRegistrationSaga();

    // Access private STEPS via cast and mutate
    const steps = (saga as unknown as { STEPS: readonly string[] }).STEPS;
    (saga as unknown as { STEPS: readonly string[] }).STEPS = [
      ...steps,
      'invalid_step',
    ] as readonly string[];

    await expect(
      saga.execute({ vendorId: UUID, currency: 'BDT' }),
    ).rejects.toThrow(/Unknown saga step/);
  });

  it('execute() populates failedAt in context on throw (lines 53-59)', async () => {
    const saga = new VendorRegistrationSaga();
    const steps = (saga as unknown as { STEPS: readonly string[] }).STEPS;
    (saga as unknown as { STEPS: readonly string[] }).STEPS = [
      'settings',
      'invalid_step',
    ] as readonly string[];

    try {
      await saga.execute({ vendorId: UUID, currency: 'BDT' });
    } catch {
      // expected
    }

    const ctx = saga.getContext();
    expect(ctx).toBeDefined();
    expect(ctx!.failedAt).toBe('invalid_step');
  });

  it('compensate() uses rollbackStep default case (line 99)', async () => {
    const saga = new VendorRegistrationSaga();
    // Inject context with an unknown step
    (saga as unknown as { context: unknown }).context = {
      vendorId: UUID,
      currency: 'BDT',
      completedSteps: ['settings', 'unknown_step'],
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('compensate() handles empty completedSteps array', async () => {
    const saga = new VendorRegistrationSaga();
    (saga as unknown as { context: unknown }).context = {
      vendorId: UUID,
      currency: 'BDT',
      completedSteps: [],
    };
    await expect(saga.compensate()).resolves.toBeUndefined();
  });

  it('execute() stops at failing step (partial completion)', async () => {
    const saga = new VendorRegistrationSaga();
    const steps = (saga as unknown as { STEPS: readonly string[] }).STEPS;
    (saga as unknown as { STEPS: readonly string[] }).STEPS = [
      'settings',
      'shipping',
      'fail_here',
    ] as readonly string[];

    try {
      await saga.execute({ vendorId: UUID, currency: 'BDT' });
    } catch {
      // expected
    }

    const ctx = saga.getContext();
    expect(ctx!.completedSteps).toEqual(['settings', 'shipping']);
    expect(ctx!.failedAt).toBe('fail_here');
  });
});
