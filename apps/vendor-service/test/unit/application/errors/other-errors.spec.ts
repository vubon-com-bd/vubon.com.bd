/**
 * Application approval/commission/payout/team/subscription errors — unit tests
 */
import {
  ApprovalNotFoundError,
  ApprovalNotActionableError,
  ResubmissionLimitExceededError,
  AppealWindowClosedError,
} from '../../../../src/module/application/errors/approval.errors.js';
import {
  CommissionConfigNotFoundError,
  CommissionConfigConflictError,
  CommissionCalculationFailedError,
} from '../../../../src/module/application/errors/commission.errors.js';
import {
  PayoutNotFoundError,
  PayoutNotProcessableError,
  InsufficientBalanceError,
  PayoutLimitExceededError,
  BankAccountNotVerifiedError,
  SettlementNotFoundError,
  SettlementNotDueError,
} from '../../../../src/module/application/errors/payout.errors.js';
import {
  TeamMemberNotFoundError,
  TeamMemberAlreadyExistsError,
  TeamLimitExceededError,
  CannotRemoveOwnerError,
  InviteAlreadyAcceptedError,
} from '../../../../src/module/application/errors/team.errors.js';
import {
  SubscriptionNotFoundError,
  SubscriptionAlreadyExistsError,
  SubscriptionPlanNotChangeableError,
  ProductLimitExceededError,
  SubscriptionExpiredError,
} from '../../../../src/module/application/errors/subscription.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

describe('Approval errors', () => {
  it('ApprovalNotFoundError has 404', () => {
    const e = new ApprovalNotFoundError('v-1');
    expect(e).toBeInstanceOf(ApplicationError);
    expect(e.httpStatus).toBe(404);
    expect(e.message).toContain('v-1');
  });

  it('ApprovalNotActionableError has 400', () => {
    const e = new ApprovalNotActionableError('approved', 'reject');
    expect(e.httpStatus).toBe(400);
    expect(e.message).toContain('approved');
    expect(e.message).toContain('reject');
  });

  it('ResubmissionLimitExceededError has 409', () => {
    const e = new ResubmissionLimitExceededError(3, 3);
    expect(e.httpStatus).toBe(409);
    expect(e.message).toContain('3');
  });

  it('AppealWindowClosedError has 410', () => {
    const e = new AppealWindowClosedError('2026-01-01T00:00:00Z');
    expect(e.httpStatus).toBe(410);
  });
});

describe('Commission errors', () => {
  it('CommissionConfigNotFoundError has 404', () => {
    const e = new CommissionConfigNotFoundError('v-1');
    expect(e.httpStatus).toBe(404);
    expect(e.message).toContain('v-1');
  });

  it('CommissionConfigConflictError has 409', () => {
    const e = new CommissionConfigConflictError('v-1');
    expect(e.httpStatus).toBe(409);
  });

  it('CommissionCalculationFailedError has 400', () => {
    const e = new CommissionCalculationFailedError('bad amount');
    expect(e.httpStatus).toBe(400);
    expect(e.message).toContain('bad amount');
  });
});

describe('Payout errors', () => {
  it('PayoutNotFoundError has 404', () => {
    const e = new PayoutNotFoundError('p-1');
    expect(e.httpStatus).toBe(404);
    expect(e.message).toContain('p-1');
  });

  it('PayoutNotProcessableError has 400', () => {
    const e = new PayoutNotProcessableError('p-1', 'cancelled');
    expect(e.httpStatus).toBe(400);
  });

  it('InsufficientBalanceError has 422', () => {
    const e = new InsufficientBalanceError(5000, 1000, 'BDT');
    expect(e.httpStatus).toBe(422);
    expect(e.message).toContain('5000');
    expect(e.message).toContain('1000');
    expect(e.message).toContain('BDT');
  });

  it('PayoutLimitExceededError has 422 for all kinds', () => {
    expect(new PayoutLimitExceededError('min', 50, 100).httpStatus).toBe(422);
    expect(new PayoutLimitExceededError('max', 20000000, 10000000).httpStatus).toBe(422);
    expect(new PayoutLimitExceededError('daily-count', 2, 1).httpStatus).toBe(422);
  });

  it('BankAccountNotVerifiedError has 403', () => {
    const e = new BankAccountNotVerifiedError('v-1');
    expect(e.httpStatus).toBe(403);
    expect(e.message).toContain('v-1');
  });

  it('SettlementNotFoundError has 404', () => {
    const e = new SettlementNotFoundError('s-1');
    expect(e.httpStatus).toBe(404);
    expect(e.message).toContain('s-1');
  });

  it('SettlementNotDueError has 400', () => {
    const e = new SettlementNotDueError('s-1');
    expect(e.httpStatus).toBe(400);
  });
});

describe('Team errors', () => {
  it('TeamMemberNotFoundError has 404', () => {
    const e = new TeamMemberNotFoundError('m-1');
    expect(e.httpStatus).toBe(404);
    expect(e.message).toContain('m-1');
  });

  it('TeamMemberAlreadyExistsError has 409', () => {
    const e = new TeamMemberAlreadyExistsError('a@b.com', 'v-1');
    expect(e.httpStatus).toBe(409);
    expect(e.message).toContain('a@b.com');
  });

  it('TeamLimitExceededError has 422', () => {
    const e = new TeamLimitExceededError(50, 50);
    expect(e.httpStatus).toBe(422);
  });

  it('CannotRemoveOwnerError has 403', () => {
    const e = new CannotRemoveOwnerError('v-1');
    expect(e.httpStatus).toBe(403);
  });

  it('InviteAlreadyAcceptedError has 409', () => {
    const e = new InviteAlreadyAcceptedError('inv-1');
    expect(e.httpStatus).toBe(409);
    expect(e.message).toContain('inv-1');
  });
});

describe('Subscription errors', () => {
  it('SubscriptionNotFoundError has 404', () => {
    const e = new SubscriptionNotFoundError('v-1');
    expect(e.httpStatus).toBe(404);
  });

  it('SubscriptionAlreadyExistsError has 409', () => {
    const e = new SubscriptionAlreadyExistsError('v-1');
    expect(e.httpStatus).toBe(409);
  });

  it('SubscriptionPlanNotChangeableError has 400', () => {
    const e = new SubscriptionPlanNotChangeableError('expired', 'basic', 'premium');
    expect(e.httpStatus).toBe(400);
    expect(e.message).toContain('expired');
    expect(e.message).toContain('basic');
    expect(e.message).toContain('premium');
  });

  it('ProductLimitExceededError has 422', () => {
    const e = new ProductLimitExceededError(100, 50);
    expect(e.httpStatus).toBe(422);
  });

  it('SubscriptionExpiredError has 410', () => {
    const e = new SubscriptionExpiredError('v-1');
    expect(e.httpStatus).toBe(410);
    expect(e.message).toContain('v-1');
  });
});

describe('all application errors have standard shape', () => {
  const allErrors = [
    new ApprovalNotFoundError('v'),
    new CommissionConfigNotFoundError('v'),
    new PayoutNotFoundError('p'),
    new TeamMemberNotFoundError('m'),
    new SubscriptionNotFoundError('v'),
  ];

  it('each has code + httpStatus + name', () => {
    for (const e of allErrors) {
      expect(typeof e.code).toBe('string');
      expect(typeof e.httpStatus).toBe('number');
      expect(typeof e.name).toBe('string');
      expect(e.name.length).toBeGreaterThan(0);
    }
  });

  it('each has toJSON', () => {
    for (const e of allErrors) {
      const json = e.toJSON();
      expect(json).toHaveProperty('name');
      expect(json).toHaveProperty('code');
      expect(json).toHaveProperty('httpStatus');
      expect(json).toHaveProperty('message');
    }
  });
});
