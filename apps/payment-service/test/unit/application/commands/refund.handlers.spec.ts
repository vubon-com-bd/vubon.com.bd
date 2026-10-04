import { jest } from '@jest/globals';
import { RequestRefundHandler } from '../../../../src/module/application/commands/refund/request-refund.handler.js';
import { ApproveRefundHandler } from '../../../../src/module/application/commands/refund/approve-refund.handler.js';
import { ProcessRefundHandler } from '../../../../src/module/application/commands/refund/process-refund.handler.js';
import { CompleteRefundHandler } from '../../../../src/module/application/commands/refund/complete-refund.handler.js';
import { FailRefundHandler } from '../../../../src/module/application/commands/refund/fail-refund.handler.js';
import { CancelRefundHandler } from '../../../../src/module/application/commands/refund/cancel-refund.handler.js';
import { RequestRefundCommand } from '../../../../src/module/application/commands/refund/request-refund.command.js';
import { ApproveRefundCommand } from '../../../../src/module/application/commands/refund/approve-refund.command.js';
import { ProcessRefundCommand } from '../../../../src/module/application/commands/refund/process-refund.command.js';
import { CompleteRefundCommand } from '../../../../src/module/application/commands/refund/complete-refund.command.js';
import { FailRefundCommand } from '../../../../src/module/application/commands/refund/fail-refund.command.js';
import { CancelRefundCommand } from '../../../../src/module/application/commands/refund/cancel-refund.command.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function mockService() {
  return {
    request: jest.fn(async () => ({
      success: true,
      refundId: UUID,
      status: 'pending',
      refundedAmount: 500,
    })),
    approve: jest.fn(async () => ({ id: UUID, status: 'pending' })),
    process: jest.fn(async () => ({ id: UUID, status: 'processing' })),
    complete: jest.fn(async () => ({ id: UUID, status: 'succeeded' })),
    fail: jest.fn(async () => ({ id: UUID, status: 'failed' })),
    cancel: jest.fn(async () => ({ id: UUID, status: 'cancelled' })),
  };
}

describe('Refund command handlers', () => {
  let svc: ReturnType<typeof mockService>;

  beforeEach(() => {
    svc = mockService();
  });

  it('RequestRefundHandler', async () => {
    const h = new RequestRefundHandler(svc as never);
    const out = await h.execute(
      new RequestRefundCommand({ paymentId: UUID, amount: 500 }),
    );
    expect(svc.request).toHaveBeenCalled();
    expect(out.success).toBe(true);
  });

  it('ApproveRefundHandler', async () => {
    const h = new ApproveRefundHandler(svc as never);
    const out = await h.execute(new ApproveRefundCommand({ refundId: UUID }));
    expect(out.status).toBe('pending');
  });

  it('ProcessRefundHandler', async () => {
    const h = new ProcessRefundHandler(svc as never);
    const out = await h.execute(new ProcessRefundCommand({ refundId: UUID }));
    expect(out.status).toBe('processing');
  });

  it('CompleteRefundHandler', async () => {
    const h = new CompleteRefundHandler(svc as never);
    const out = await h.execute(new CompleteRefundCommand({ refundId: UUID }));
    expect(out.status).toBe('succeeded');
  });

  it('FailRefundHandler', async () => {
    const h = new FailRefundHandler(svc as never);
    const out = await h.execute(new FailRefundCommand({ refundId: UUID, reason: 'x' }));
    expect(out.status).toBe('failed');
  });

  it('CancelRefundHandler', async () => {
    const h = new CancelRefundHandler(svc as never);
    const out = await h.execute(new CancelRefundCommand({ refundId: UUID }));
    expect(out.status).toBe('cancelled');
  });
});
