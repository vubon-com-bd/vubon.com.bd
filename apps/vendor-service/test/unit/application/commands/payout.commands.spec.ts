import { jest } from '@jest/globals';
import { RequestPayoutHandler } from '../../../../src/module/application/commands/payout/request-payout.handler.js';
import { RequestPayoutCommand } from '../../../../src/module/application/commands/payout/request-payout.command.js';
import { ApprovePayoutHandler } from '../../../../src/module/application/commands/payout/approve-payout.handler.js';
import { ApprovePayoutCommand } from '../../../../src/module/application/commands/payout/approve-payout.command.js';
import { RejectPayoutHandler } from '../../../../src/module/application/commands/payout/reject-payout.handler.js';
import { RejectPayoutCommand } from '../../../../src/module/application/commands/payout/reject-payout.command.js';
import { ProcessPayoutHandler } from '../../../../src/module/application/commands/payout/process-payout.handler.js';
import { ProcessPayoutCommand } from '../../../../src/module/application/commands/payout/process-payout.command.js';
import { MarkPayoutPaidHandler } from '../../../../src/module/application/commands/payout/mark-payout-paid.handler.js';
import { MarkPayoutPaidCommand } from '../../../../src/module/application/commands/payout/mark-payout-paid.command.js';
import { FailPayoutHandler } from '../../../../src/module/application/commands/payout/fail-payout.handler.js';
import { FailPayoutCommand } from '../../../../src/module/application/commands/payout/fail-payout.command.js';
import { CancelPayoutHandler } from '../../../../src/module/application/commands/payout/cancel-payout.handler.js';
import { CancelPayoutCommand } from '../../../../src/module/application/commands/payout/cancel-payout.command.js';
import { CreateSettlementHandler } from '../../../../src/module/application/commands/payout/create-settlement.handler.js';
import { CreateSettlementCommand } from '../../../../src/module/application/commands/payout/create-settlement.command.js';
import { CompleteSettlementHandler } from '../../../../src/module/application/commands/payout/complete-settlement.handler.js';
import { CompleteSettlementCommand } from '../../../../src/module/application/commands/payout/complete-settlement.command.js';
import type { IVendorPayoutService } from '../../../../src/module/application/services/interfaces/vendor-payout.service.interface.js';
import type { IVendorSettlementService } from '../../../../src/module/application/services/interfaces/vendor-settlement.service.interface.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makePayoutMock(): jest.Mocked<IVendorPayoutService> {
  return {
    configure: jest.fn(),
    request: jest.fn().mockResolvedValue({ id: UUID } as never),
    approve: jest.fn().mockResolvedValue({ id: UUID } as never),
    reject: jest.fn().mockResolvedValue({ id: UUID } as never),
    process: jest.fn().mockResolvedValue({ id: UUID } as never),
    markPaid: jest.fn().mockResolvedValue({ id: UUID } as never),
    fail: jest.fn().mockResolvedValue({ id: UUID } as never),
    cancel: jest.fn().mockResolvedValue({ id: UUID } as never),
    getById: jest.fn(),
    listByVendor: jest.fn(),
    list: jest.fn(),
    getSummary: jest.fn(),
  } as unknown as jest.Mocked<IVendorPayoutService>;
}

function makeSettlementMock(): jest.Mocked<IVendorSettlementService> {
  return {
    create: jest.fn().mockResolvedValue({ id: UUID } as never),
    startProcessing: jest.fn(),
    complete: jest.fn().mockResolvedValue({ id: UUID } as never),
    fail: jest.fn(),
    cancel: jest.fn(),
    getById: jest.fn(),
    listByVendor: jest.fn(),
  } as unknown as jest.Mocked<IVendorSettlementService>;
}

describe('Payout command handlers', () => {
  it('RequestPayoutHandler delegates', async () => {
    const svc = makePayoutMock();
    const h = new RequestPayoutHandler(svc);
    await h.execute(new RequestPayoutCommand({ vendorId: UUID } as never, UUID));
    expect(svc.request).toHaveBeenCalled();
  });

  it('ApprovePayoutHandler delegates', async () => {
    const svc = makePayoutMock();
    const h = new ApprovePayoutHandler(svc);
    await h.execute(new ApprovePayoutCommand({ payoutId: UUID, approvedBy: UUID }, UUID));
    expect(svc.approve).toHaveBeenCalled();
  });

  it('RejectPayoutHandler delegates', async () => {
    const svc = makePayoutMock();
    const h = new RejectPayoutHandler(svc);
    await h.execute(new RejectPayoutCommand({ payoutId: UUID, rejectedBy: UUID, reason: 'x' }, UUID));
    expect(svc.reject).toHaveBeenCalled();
  });

  it('ProcessPayoutHandler delegates', async () => {
    const svc = makePayoutMock();
    const h = new ProcessPayoutHandler(svc);
    await h.execute(new ProcessPayoutCommand({ payoutId: UUID, processedBy: UUID }, UUID));
    expect(svc.process).toHaveBeenCalled();
  });

  it('MarkPayoutPaidHandler delegates', async () => {
    const svc = makePayoutMock();
    const h = new MarkPayoutPaidHandler(svc);
    await h.execute(new MarkPayoutPaidCommand({ payoutId: UUID, transactionId: 'txn', paidBy: UUID }, UUID));
    expect(svc.markPaid).toHaveBeenCalled();
  });

  it('FailPayoutHandler delegates', async () => {
    const svc = makePayoutMock();
    const h = new FailPayoutHandler(svc);
    await h.execute(new FailPayoutCommand({ payoutId: UUID, reason: 'x', failedBy: UUID }, UUID));
    expect(svc.fail).toHaveBeenCalled();
  });

  it('CancelPayoutHandler delegates', async () => {
    const svc = makePayoutMock();
    const h = new CancelPayoutHandler(svc);
    await h.execute(new CancelPayoutCommand({ payoutId: UUID, cancelledBy: UUID }, UUID));
    expect(svc.cancel).toHaveBeenCalled();
  });

  it('CreateSettlementHandler delegates', async () => {
    const svc = makeSettlementMock();
    const h = new CreateSettlementHandler(svc);
    await h.execute(new CreateSettlementCommand({ vendorId: UUID } as never, UUID));
    expect(svc.create).toHaveBeenCalled();
  });

  it('CompleteSettlementHandler delegates', async () => {
    const svc = makeSettlementMock();
    const h = new CompleteSettlementHandler(svc);
    await h.execute(new CompleteSettlementCommand({ settlementId: UUID, payoutId: UUID, completedBy: UUID }, UUID));
    expect(svc.complete).toHaveBeenCalled();
  });
});
