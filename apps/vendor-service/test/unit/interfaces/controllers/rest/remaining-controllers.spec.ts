/**
 * Remaining controllers — bulk tests with mocked buses
 */
import { jest } from '@jest/globals';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { VendorDocumentController } from '../../../../../src/module/interfaces/controllers/rest/vendor-document.controller.js';
import { VendorVerificationController } from '../../../../../src/module/interfaces/controllers/rest/vendor-verification.controller.js';
import { VendorApprovalController } from '../../../../../src/module/interfaces/controllers/rest/vendor-approval.controller.js';
import { VendorSuspensionController } from '../../../../../src/module/interfaces/controllers/rest/vendor-suspension.controller.js';
import { VendorTeamController } from '../../../../../src/module/interfaces/controllers/rest/vendor-team.controller.js';
import { VendorPayoutController } from '../../../../../src/module/interfaces/controllers/rest/vendor-payout.controller.js';
import { VendorSettlementController } from '../../../../../src/module/interfaces/controllers/rest/vendor-settlement.controller.js';
import { VendorInvoiceController } from '../../../../../src/module/interfaces/controllers/rest/vendor-invoice.controller.js';
import { VendorSubscriptionController } from '../../../../../src/module/interfaces/controllers/rest/vendor-subscription.controller.js';
import { VendorCommissionController } from '../../../../../src/module/interfaces/controllers/rest/vendor-commission.controller.js';
import { VendorRatingController } from '../../../../../src/module/interfaces/controllers/rest/vendor-rating.controller.js';
import { VendorReviewController } from '../../../../../src/module/interfaces/controllers/rest/vendor-review.controller.js';
import { VendorPerformanceController } from '../../../../../src/module/interfaces/controllers/rest/vendor-performance.controller.js';
import { VendorShippingController } from '../../../../../src/module/interfaces/controllers/rest/vendor-shipping.controller.js';
import { VendorWarrantyController } from '../../../../../src/module/interfaces/controllers/rest/vendor-warranty.controller.js';
import { VendorReturnPolicyController } from '../../../../../src/module/interfaces/controllers/rest/vendor-return-policy.controller.js';
import { VendorSettingsController } from '../../../../../src/module/interfaces/controllers/rest/vendor-settings.controller.js';
import { VendorStatsController } from '../../../../../src/module/interfaces/controllers/rest/vendor-stats.controller.js';
import { VendorReportController } from '../../../../../src/module/interfaces/controllers/rest/vendor-report.controller.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = { userId: UUID, sessionId: 'sess-1' };

function makeCommandBus(): jest.Mocked<CommandBus> {
  return { execute: jest.fn().mockResolvedValue({ id: UUID }) } as unknown as jest.Mocked<CommandBus>;
}
function makeQueryBus(): jest.Mocked<QueryBus> {
  return { execute: jest.fn().mockResolvedValue({ id: UUID }) } as unknown as jest.Mocked<QueryBus>;
}

describe('Document controller', () => {
  let c: VendorDocumentController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorDocumentController(cb, qb); });
  it('upload dispatches command', async () => {
    await c.upload(UUID, { type: 'identity_proof' } as never, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
  it('list dispatches query', async () => {
    await c.list(UUID);
    expect(qb.execute).toHaveBeenCalled();
  });
  it('listPublic dispatches query', async () => {
    await c.listPublic(UUID);
    expect(qb.execute).toHaveBeenCalled();
  });
  it('getById dispatches query', async () => {
    await c.getById(UUID, UUID);
    expect(qb.execute).toHaveBeenCalled();
  });
  it('verify dispatches command', async () => {
    await c.verify(UUID, UUID, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
  it('reject dispatches command', async () => {
    await c.reject(UUID, UUID, { reason: 'bad' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
});

describe('Verification controller', () => {
  let c: VendorVerificationController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorVerificationController(cb, qb); });
  it('submit dispatches command', async () => {
    await c.submit(UUID, { documents: [] }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
  it('get dispatches query', async () => {
    await c.get(UUID);
    expect(qb.execute).toHaveBeenCalled();
  });
  it('approve dispatches command', async () => {
    await c.approve(UUID, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
  it('reject dispatches command', async () => {
    await c.reject(UUID, { reason: 'incomplete' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
});

describe('Approval controller', () => {
  let c: VendorApprovalController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorApprovalController(cb, qb); });
  it('get dispatches query', async () => { await c.get(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('approve dispatches command', async () => { await c.approve(UUID, {}, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('reject dispatches command', async () => { await c.reject(UUID, { reason: 'invalid' } as never, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('requestInfo returns ok', async () => { const r = await c.requestInfo(UUID, { note: 'x' }, USER); expect(r).toBeDefined(); });
  it('resubmit dispatches command', async () => { await c.resubmit(UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
});

describe('Suspension controller', () => {
  let c: VendorSuspensionController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorSuspensionController(cb, qb); });
  it('suspend dispatches command', async () => { await c.suspend(UUID, { reason: 'policy', durationDays: 30 }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('lift dispatches command', async () => { await c.lift(UUID, {}, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('appeal returns ok', async () => { const r = await c.appeal(UUID, UUID, { appealReason: 'text' } as never, USER); expect(r).toBeDefined(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getActive dispatches query', async () => { await c.getActive(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getById dispatches query', async () => { await c.getById(UUID, UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Team controller', () => {
  let c: VendorTeamController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorTeamController(cb, qb); });
  it('invite dispatches command', async () => { await c.invite(UUID, { email: 'a@b.com', role: 'vendor_viewer' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('acceptInvite dispatches command', async () => { await c.acceptInvite({ token: 'ABCDEFGHIJKLMNOP1234', name: 'X' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getMember dispatches query', async () => { await c.getMember(UUID, UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('changeRole dispatches command', async () => { await c.changeRole(UUID, UUID, { newRole: 'vendor_manager' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('suspend dispatches command', async () => { await c.suspend(UUID, UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('remove dispatches command', async () => { await c.remove(UUID, UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
});

describe('Payout controller', () => {
  let c: VendorPayoutController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorPayoutController(cb, qb); });
  it('request dispatches command', async () => { await c.request(UUID, { amount: 5000, currency: 'BDT' }, USER, 'req-12345678'); expect(cb.execute).toHaveBeenCalled(); });
  it('approve dispatches command', async () => { await c.approve(UUID, UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('reject dispatches command', async () => { await c.reject(UUID, UUID, { reason: 'x' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('process dispatches command', async () => { await c.process(UUID, UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('markPaid dispatches command', async () => { await c.markPaid(UUID, UUID, { transactionId: 'txn' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('fail dispatches command', async () => { await c.fail(UUID, UUID, { reason: 'x' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('cancel dispatches command', async () => { await c.cancel(UUID, UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('summary dispatches query', async () => { await c.summary(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getById dispatches query', async () => { await c.getById(UUID, UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Settlement controller', () => {
  let c: VendorSettlementController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorSettlementController(cb, qb); });
  it('create dispatches command', async () => { await c.create(UUID, { periodStart: 'x', periodEnd: 'y', grossAmount: 100, commissionAmount: 10, netAmount: 90, currency: 'BDT', orderCount: 1 } as never, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('complete dispatches command', async () => { await c.complete(UUID, UUID, { payoutId: UUID }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getById dispatches query', async () => { await c.getById(UUID, UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Invoice controller', () => {
  let c: VendorInvoiceController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorInvoiceController(cb, qb); });
  it('create dispatches command', async () => { await c.create(UUID, { type: 'commission', amount: 1000, totalAmount: 1000, currency: 'BDT', issueDate: 'x', dueDate: 'y' } as never, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('send dispatches command', async () => { await c.send(UUID, UUID, {}, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('markPaid dispatches command', async () => { await c.markPaid(UUID, UUID, {}, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getById dispatches query', async () => { await c.getById(UUID, UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Subscription controller', () => {
  let c: VendorSubscriptionController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorSubscriptionController(cb, qb); });
  it('create dispatches command', async () => { await c.create(UUID, { plan: 'basic', cycle: 'monthly', price: 500, currency: 'BDT' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('changePlan dispatches command', async () => { await c.changePlan(UUID, { newPlan: 'premium', newPrice: 2000, immediate: false }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('cancel dispatches command', async () => { await c.cancel(UUID, { immediate: false }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('renew dispatches command', async () => { await c.renew(UUID, {}, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('get dispatches query', async () => { await c.get(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getPublic dispatches query', async () => { await c.getPublic(UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Commission controller', () => {
  let c: VendorCommissionController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorCommissionController(cb, qb); });
  it('configure dispatches command', async () => { await c.configure(UUID, { type: 'percentage', percent: 10, currency: 'BDT', applyOnShipping: false, applyOnTax: false }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('calculate dispatches command', async () => { await c.calculate(UUID, { orderAmount: 1000, currency: 'BDT' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('getActive dispatches query', async () => { await c.getActive(UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Rating controller', () => {
  let c: VendorRatingController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorRatingController(cb, qb); });
  it('get dispatches query', async () => { await c.get(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('recalculate returns ok', async () => { const r = await c.recalculate(UUID, USER); expect(r).toBeDefined(); });
});

describe('Review controller', () => {
  let c: VendorReviewController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorReviewController(cb, qb); });
  it('submit dispatches command', async () => { await c.submit(UUID, { orderId: UUID, rating: 5, comment: 'great' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('listPublic dispatches query', async () => { await c.listPublic(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getById dispatches query', async () => { await c.getById(UUID, UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('approve dispatches command', async () => { await c.approve(UUID, UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('reject returns ok', async () => { const r = await c.reject(UUID, UUID, { reason: 'x' }, USER); expect(r).toBeDefined(); });
  it('flag returns ok', async () => { const r = await c.flag(UUID, UUID, { reason: 'x' }, USER); expect(r).toBeDefined(); });
});

describe('Performance controller', () => {
  let c: VendorPerformanceController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorPerformanceController(cb, qb); });
  it('getLatest dispatches query', async () => { await c.getLatest(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('evaluate returns ok', async () => { const r = await c.evaluate(UUID, { evaluationPeriodStart: 'x', evaluationPeriodEnd: 'y', orderCount: 10 }, USER); expect(r).toBeDefined(); });
  it('issueWarning returns ok', async () => { const r = await c.issueWarning(UUID, USER); expect(r).toBeDefined(); });
  it('clearWarning returns ok', async () => { const r = await c.clearWarning(UUID, USER); expect(r).toBeDefined(); });
  it('recalculate returns ok', async () => { const r = await c.recalculate(UUID, USER); expect(r).toBeDefined(); });
});

describe('Shipping controller', () => {
  let c: VendorShippingController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorShippingController(cb, qb); });
  it('initialize dispatches command', async () => { await c.initialize(UUID, { defaultMethod: 'standard' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('addRate dispatches command', async () => { await c.addRate(UUID, { method: 'standard', zone: 'inside_city', cost: 60, currency: 'BDT', minDeliveryDays: 1, maxDeliveryDays: 3 }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('removeRate dispatches command', async () => { await c.removeRate(UUID, 'express', 'inside_city', USER); expect(cb.execute).toHaveBeenCalled(); });
  it('setThreshold dispatches command', async () => { await c.setThreshold(UUID, { amount: 1000 }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('get dispatches query', async () => { await c.get(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('calculate dispatches query', async () => { await c.calculate(UUID, 'inside_city', '500', undefined); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Warranty controller', () => {
  let c: VendorWarrantyController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorWarrantyController(cb, qb); });
  it('initialize dispatches command', async () => { await c.initialize(UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('updateType dispatches command', async () => { await c.updateType(UUID, { warrantyType: 'manufacturer' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('updatePeriod dispatches command', async () => { await c.updatePeriod(UUID, { days: 90 }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('addExclusion dispatches command', async () => { await c.addExclusion(UUID, { term: 'abuse' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('removeExclusion dispatches command', async () => { await c.removeExclusion(UUID, { term: 'abuse' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('get dispatches query', async () => { await c.get(UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Return policy controller', () => {
  let c: VendorReturnPolicyController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorReturnPolicyController(cb, qb); });
  it('initialize dispatches command', async () => { await c.initialize(UUID, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('updateType dispatches command', async () => { await c.updateType(UUID, { returnType: 'exchange_only' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('updateWindow dispatches command', async () => { await c.updateWindow(UUID, { days: 14 }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('addExclusion dispatches command', async () => { await c.addExclusion(UUID, { term: 'custom' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('get dispatches query', async () => { await c.get(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('checkEligibility dispatches query', async () => { await c.checkEligibility(UUID, '2026-01-01T00:00:00Z'); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Settings controller', () => {
  let c: VendorSettingsController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorSettingsController(cb, qb); });
  it('initialize dispatches command', async () => { await c.initialize(UUID, { currency: 'BDT' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('setVacation dispatches command', async () => { await c.setVacation(UUID, { enabled: true, message: 'x' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('setAutoAccept dispatches command', async () => { await c.setAutoAccept(UUID, { enabled: true }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('setAutoPayout dispatches command', async () => { await c.setAutoPayout(UUID, { enabled: true }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('updateNotifications dispatches command', async () => { await c.updateNotifications(UUID, { smsEnabled: true }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('updateLocale dispatches command', async () => { await c.updateLocale(UUID, { timezone: 'Asia/Dhaka', locale: 'bn-BD' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('get dispatches query', async () => { await c.get(UUID); expect(qb.execute).toHaveBeenCalled(); });
});

describe('Stats controller', () => {
  let c: VendorStatsController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorStatsController(cb, qb); });
  it('getLatest dispatches query', async () => { await c.getLatest(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('initialize dispatches command', async () => { await c.initialize(UUID, { periodStart: 'x', periodEnd: 'y', currency: 'BDT' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('recordOrder dispatches command', async () => { await c.recordOrder(UUID, { amount: 1000 }, USER); expect(cb.execute).toHaveBeenCalled(); });
});

describe('Report controller', () => {
  let c: VendorReportController; let cb: jest.Mocked<CommandBus>; let qb: jest.Mocked<QueryBus>;
  beforeEach(() => { cb = makeCommandBus(); qb = makeQueryBus(); c = new VendorReportController(cb, qb); });
  it('request dispatches command', async () => { await c.request(UUID, { type: 'sales', format: 'pdf', period: 'last_30_days', periodStart: 'x', periodEnd: 'y' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('markReady dispatches command', async () => { await c.markReady(UUID, UUID, { fileUrl: 'https://x.com/r.pdf', fileSize: 1024 }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('markFailed dispatches command', async () => { await c.markFailed(UUID, UUID, { reason: 'x' }, USER); expect(cb.execute).toHaveBeenCalled(); });
  it('list dispatches query', async () => { await c.list(UUID); expect(qb.execute).toHaveBeenCalled(); });
  it('getById dispatches query', async () => { await c.getById(UUID, 'rpt-1'); expect(qb.execute).toHaveBeenCalled(); });
});
