/**
 * Subscription Application Errors — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  SubscriptionNotFoundApplicationError,
  SubscriptionCreationError,
  SubscriptionUpgradeError,
  SubscriptionDowngradeError,
  SubscriptionPauseError,
  SubscriptionCancelError,
  SubscriptionAlreadyActiveError,
} from '@application/errors/subscription.errors';

describe('Subscription Application Errors', () => {
  const SUB_ID = '723e4567-e89b-42d3-a456-426614174006';

  it('SubscriptionNotFoundApplicationError — 404', () => {
    const err = new SubscriptionNotFoundApplicationError(SUB_ID);
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain(SUB_ID);
  });

  it('SubscriptionCreationError — 400', () => {
    const err = new SubscriptionCreationError('invalid plan');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('invalid plan');
  });

  it('SubscriptionUpgradeError — 400', () => {
    const err = new SubscriptionUpgradeError(SUB_ID, 'prorate failed');
    expect(err.httpStatus).toBe(400);
  });

  it('SubscriptionDowngradeError — 400', () => {
    const err = new SubscriptionDowngradeError(SUB_ID, 'effective at period end');
    expect(err.httpStatus).toBe(400);
  });

  it('SubscriptionPauseError — 400', () => {
    const err = new SubscriptionPauseError(SUB_ID, 'already paused');
    expect(err.httpStatus).toBe(400);
  });

  it('SubscriptionCancelError — 400', () => {
    const err = new SubscriptionCancelError(SUB_ID, 'expired');
    expect(err.httpStatus).toBe(400);
  });

  it('SubscriptionAlreadyActiveError — 409', () => {
    const err = new SubscriptionAlreadyActiveError(SUB_ID);
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain(SUB_ID);
  });
});
