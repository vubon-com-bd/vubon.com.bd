/**
 * Remaining command handlers — bulk coverage
 * @module vendor-service/test/unit/application/commands
 */
import { jest } from '@jest/globals';

// Rating
import { SubmitVendorReviewHandler } from '../../../../src/module/application/commands/rating/submit-vendor-review.handler.js';
import { SubmitVendorReviewCommand } from '../../../../src/module/application/commands/rating/submit-vendor-review.command.js';
import { ApproveVendorReviewHandler } from '../../../../src/module/application/commands/rating/approve-vendor-review.handler.js';
import { ApproveVendorReviewCommand } from '../../../../src/module/application/commands/rating/approve-vendor-review.command.js';

// Report
import { RequestReportHandler } from '../../../../src/module/application/commands/report/request-report.handler.js';
import { RequestReportCommand } from '../../../../src/module/application/commands/report/request-report.command.js';
import { MarkReportReadyHandler } from '../../../../src/module/application/commands/report/mark-report-ready.handler.js';
import { MarkReportReadyCommand } from '../../../../src/module/application/commands/report/mark-report-ready.command.js';
import { MarkReportFailedHandler } from '../../../../src/module/application/commands/report/mark-report-failed.handler.js';
import { MarkReportFailedCommand } from '../../../../src/module/application/commands/report/mark-report-failed.command.js';

// Return Policy
import { InitializeReturnPolicyHandler } from '../../../../src/module/application/commands/return-policy/initialize-return-policy.handler.js';
import { InitializeReturnPolicyCommand } from '../../../../src/module/application/commands/return-policy/initialize-return-policy.command.js';
import { UpdateReturnTypeHandler } from '../../../../src/module/application/commands/return-policy/update-return-type.handler.js';
import { UpdateReturnTypeCommand } from '../../../../src/module/application/commands/return-policy/update-return-type.command.js';
import { UpdateReturnWindowHandler } from '../../../../src/module/application/commands/return-policy/update-return-window.handler.js';
import { UpdateReturnWindowCommand } from '../../../../src/module/application/commands/return-policy/update-return-window.command.js';
import { AddReturnExclusionHandler } from '../../../../src/module/application/commands/return-policy/add-return-exclusion.handler.js';
import { AddReturnExclusionCommand } from '../../../../src/module/application/commands/return-policy/add-return-exclusion.command.js';

// Settings
import { InitializeVendorSettingsHandler } from '../../../../src/module/application/commands/settings/initialize-vendor-settings.handler.js';
import { InitializeVendorSettingsCommand } from '../../../../src/module/application/commands/settings/initialize-vendor-settings.command.js';
import { SetVacationModeHandler } from '../../../../src/module/application/commands/settings/set-vacation-mode.handler.js';
import { SetVacationModeCommand } from '../../../../src/module/application/commands/settings/set-vacation-mode.command.js';
import { SetAutoAcceptOrdersHandler } from '../../../../src/module/application/commands/settings/set-auto-accept-orders.handler.js';
import { SetAutoAcceptOrdersCommand } from '../../../../src/module/application/commands/settings/set-auto-accept-orders.command.js';
import { SetAutoPayoutHandler } from '../../../../src/module/application/commands/settings/set-auto-payout.handler.js';
import { SetAutoPayoutCommand } from '../../../../src/module/application/commands/settings/set-auto-payout.command.js';
import { UpdateNotificationsHandler } from '../../../../src/module/application/commands/settings/update-notifications.handler.js';
import { UpdateNotificationsCommand } from '../../../../src/module/application/commands/settings/update-notifications.command.js';
import { UpdateLocaleHandler } from '../../../../src/module/application/commands/settings/update-locale.handler.js';
import { UpdateLocaleCommand } from '../../../../src/module/application/commands/settings/update-locale.command.js';

// Shipping
import { InitializeShippingHandler } from '../../../../src/module/application/commands/shipping/initialize-shipping.handler.js';
import { InitializeShippingCommand } from '../../../../src/module/application/commands/shipping/initialize-shipping.command.js';
import { AddShippingRateHandler } from '../../../../src/module/application/commands/shipping/add-shipping-rate.handler.js';
import { AddShippingRateCommand } from '../../../../src/module/application/commands/shipping/add-shipping-rate.command.js';
import { RemoveShippingRateHandler } from '../../../../src/module/application/commands/shipping/remove-shipping-rate.handler.js';
import { RemoveShippingRateCommand } from '../../../../src/module/application/commands/shipping/remove-shipping-rate.command.js';
import { SetFreeShippingThresholdHandler } from '../../../../src/module/application/commands/shipping/set-free-shipping-threshold.handler.js';
import { SetFreeShippingThresholdCommand } from '../../../../src/module/application/commands/shipping/set-free-shipping-threshold.command.js';

// Stats
import { InitializeStatsPeriodHandler } from '../../../../src/module/application/commands/stats/initialize-stats-period.handler.js';
import { InitializeStatsPeriodCommand } from '../../../../src/module/application/commands/stats/initialize-stats-period.command.js';
import { RecordOrderStatsHandler } from '../../../../src/module/application/commands/stats/record-order-stats.handler.js';
import { RecordOrderStatsCommand } from '../../../../src/module/application/commands/stats/record-order-stats.command.js';

// Subscription
import { CreateSubscriptionHandler } from '../../../../src/module/application/commands/subscription/create-subscription.handler.js';
import { CreateSubscriptionCommand } from '../../../../src/module/application/commands/subscription/create-subscription.command.js';
import { ChangeSubscriptionPlanHandler } from '../../../../src/module/application/commands/subscription/change-subscription-plan.handler.js';
import { ChangeSubscriptionPlanCommand } from '../../../../src/module/application/commands/subscription/change-subscription-plan.command.js';
import { CancelSubscriptionHandler } from '../../../../src/module/application/commands/subscription/cancel-subscription.handler.js';
import { CancelSubscriptionCommand } from '../../../../src/module/application/commands/subscription/cancel-subscription.command.js';
import { RenewSubscriptionHandler } from '../../../../src/module/application/commands/subscription/renew-subscription.handler.js';
import { RenewSubscriptionCommand } from '../../../../src/module/application/commands/subscription/renew-subscription.command.js';

// Team
import { InviteTeamMemberHandler } from '../../../../src/module/application/commands/team/invite-team-member.handler.js';
import { InviteTeamMemberCommand } from '../../../../src/module/application/commands/team/invite-team-member.command.js';
import { AcceptTeamInviteHandler } from '../../../../src/module/application/commands/team/accept-team-invite.handler.js';
import { AcceptTeamInviteCommand } from '../../../../src/module/application/commands/team/accept-team-invite.command.js';
import { RemoveTeamMemberHandler } from '../../../../src/module/application/commands/team/remove-team-member.handler.js';
import { RemoveTeamMemberCommand } from '../../../../src/module/application/commands/team/remove-team-member.command.js';
import { ChangeTeamMemberRoleHandler } from '../../../../src/module/application/commands/team/change-team-member-role.handler.js';
import { ChangeTeamMemberRoleCommand } from '../../../../src/module/application/commands/team/change-team-member-role.command.js';
import { SuspendTeamMemberHandler } from '../../../../src/module/application/commands/team/suspend-team-member.handler.js';
import { SuspendTeamMemberCommand } from '../../../../src/module/application/commands/team/suspend-team-member.command.js';

// Warranty
import { InitializeWarrantyHandler } from '../../../../src/module/application/commands/warranty/initialize-warranty.handler.js';
import { InitializeWarrantyCommand } from '../../../../src/module/application/commands/warranty/initialize-warranty.command.js';
import { UpdateWarrantyTypeHandler } from '../../../../src/module/application/commands/warranty/update-warranty-type.handler.js';
import { UpdateWarrantyTypeCommand } from '../../../../src/module/application/commands/warranty/update-warranty-type.command.js';
import { UpdateWarrantyPeriodHandler } from '../../../../src/module/application/commands/warranty/update-warranty-period.handler.js';
import { UpdateWarrantyPeriodCommand } from '../../../../src/module/application/commands/warranty/update-warranty-period.command.js';
import { AddWarrantyExclusionHandler } from '../../../../src/module/application/commands/warranty/add-warranty-exclusion.handler.js';
import { AddWarrantyExclusionCommand } from '../../../../src/module/application/commands/warranty/add-warranty-exclusion.command.js';
import { RemoveWarrantyExclusionHandler } from '../../../../src/module/application/commands/warranty/remove-warranty-exclusion.handler.js';
import { RemoveWarrantyExclusionCommand } from '../../../../src/module/application/commands/warranty/remove-warranty-exclusion.command.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const OK = { id: UUID };

// Generic factory
function makeMock(overrides: Record<string, unknown> = {}) {
  const base: Record<string, jest.Mock> = {};
  const fns = [
    'submit','approve','reject','flag','hide','restore','getById','listByVendor','listPublicByVendor',
    'request','startGenerating','markReady','markFailed','listDownloadableByVendor','listByVendor',
    'initialize','updateType','updateWindow','updatePeriod','updateTerms','addExclusion','removeExclusion',
    'setVacation','setAutoAccept','setAutoPayout','updateNotifications','updateLocale','getByVendorId',
    'addRate','removeRate','setFreeShippingThreshold','calculateShipping',
    'initializePeriod','recordOrder','recordRefund','recordPayout','recordCancellation','getLatestByVendorId',
    'create','changePlan','cancel','renew','resume','getPublic','getActiveByVendorId','getActiveCommission',
    'invite','acceptInvite','removeMember','changeRole','suspendMember','getMember',
    'create','send','markViewed','markPaid',
  ];
  for (const fn of fns) base[fn] = jest.fn().mockResolvedValue(OK);
  return { ...base, ...overrides } as never;
}

describe('Rating command handlers', () => {
  it('SubmitVendorReviewHandler delegates', async () => {
    const svc = makeMock();
    const h = new SubmitVendorReviewHandler(svc);
    await h.execute(new SubmitVendorReviewCommand({ vendorId: UUID } as never, UUID));
    expect((svc as { submit: jest.Mock }).submit).toHaveBeenCalled();
  });
  it('ApproveVendorReviewHandler delegates', async () => {
    const svc = makeMock();
    const h = new ApproveVendorReviewHandler(svc);
    await h.execute(new ApproveVendorReviewCommand(UUID, UUID));
    expect((svc as { approve: jest.Mock }).approve).toHaveBeenCalledWith(UUID, UUID);
  });
});

describe('Report command handlers', () => {
  it('RequestReportHandler delegates', async () => {
    const svc = makeMock();
    const h = new RequestReportHandler(svc);
    await h.execute(new RequestReportCommand({ vendorId: UUID } as never, UUID, UUID));
    expect((svc as { request: jest.Mock }).request).toHaveBeenCalled();
  });
  it('MarkReportReadyHandler delegates', async () => {
    const svc = makeMock();
    const h = new MarkReportReadyHandler(svc);
    await h.execute(new MarkReportReadyCommand(UUID, 'https://x.com/r.pdf', 1024, UUID));
    expect((svc as { markReady: jest.Mock }).markReady).toHaveBeenCalled();
  });
  it('MarkReportFailedHandler delegates', async () => {
    const svc = makeMock();
    const h = new MarkReportFailedHandler(svc);
    await h.execute(new MarkReportFailedCommand(UUID, 'reason', UUID));
    expect((svc as { markFailed: jest.Mock }).markFailed).toHaveBeenCalled();
  });
});

describe('Return policy command handlers', () => {
  it('InitializeReturnPolicyHandler delegates', async () => {
    const svc = makeMock();
    const h = new InitializeReturnPolicyHandler(svc);
    await h.execute(new InitializeReturnPolicyCommand(UUID, UUID));
    expect((svc as { initialize: jest.Mock }).initialize).toHaveBeenCalledWith(UUID, UUID);
  });
  it('UpdateReturnTypeHandler delegates', async () => {
    const svc = makeMock();
    const h = new UpdateReturnTypeHandler(svc);
    await h.execute(new UpdateReturnTypeCommand(UUID, 'exchange_only', UUID));
    expect((svc as { updateType: jest.Mock }).updateType).toHaveBeenCalledWith(UUID, 'exchange_only', UUID);
  });
  it('UpdateReturnWindowHandler delegates', async () => {
    const svc = makeMock();
    const h = new UpdateReturnWindowHandler(svc);
    await h.execute(new UpdateReturnWindowCommand(UUID, 14, UUID));
    expect((svc as { updateWindow: jest.Mock }).updateWindow).toHaveBeenCalledWith(UUID, 14, UUID);
  });
  it('AddReturnExclusionHandler delegates', async () => {
    const svc = makeMock();
    const h = new AddReturnExclusionHandler(svc);
    await h.execute(new AddReturnExclusionCommand(UUID, 'custom-made', UUID));
    expect((svc as { addExclusion: jest.Mock }).addExclusion).toHaveBeenCalled();
  });
});

describe('Settings command handlers', () => {
  it('InitializeVendorSettingsHandler delegates', async () => {
    const svc = makeMock();
    const h = new InitializeVendorSettingsHandler(svc);
    await h.execute(new InitializeVendorSettingsCommand(UUID, 'BDT', UUID));
    expect((svc as { initialize: jest.Mock }).initialize).toHaveBeenCalledWith(UUID, 'BDT', UUID);
  });
  it('SetVacationModeHandler delegates', async () => {
    const svc = makeMock();
    const h = new SetVacationModeHandler(svc);
    await h.execute(new SetVacationModeCommand(UUID, true, 'msg', UUID));
    expect((svc as { setVacation: jest.Mock }).setVacation).toHaveBeenCalled();
  });
  it('SetAutoAcceptOrdersHandler delegates', async () => {
    const svc = makeMock();
    const h = new SetAutoAcceptOrdersHandler(svc);
    await h.execute(new SetAutoAcceptOrdersCommand(UUID, true, UUID));
    expect((svc as { setAutoAccept: jest.Mock }).setAutoAccept).toHaveBeenCalled();
  });
  it('SetAutoPayoutHandler delegates', async () => {
    const svc = makeMock();
    const h = new SetAutoPayoutHandler(svc);
    await h.execute(new SetAutoPayoutCommand(UUID, true, UUID));
    expect((svc as { setAutoPayout: jest.Mock }).setAutoPayout).toHaveBeenCalled();
  });
  it('UpdateNotificationsHandler delegates', async () => {
    const svc = makeMock();
    const h = new UpdateNotificationsHandler(svc);
    await h.execute(new UpdateNotificationsCommand(UUID, { smsEnabled: true }, UUID));
    expect((svc as { updateNotifications: jest.Mock }).updateNotifications).toHaveBeenCalled();
  });
  it('UpdateLocaleHandler delegates', async () => {
    const svc = makeMock();
    const h = new UpdateLocaleHandler(svc);
    await h.execute(new UpdateLocaleCommand(UUID, 'Asia/Dhaka', 'bn-BD', UUID));
    expect((svc as { updateLocale: jest.Mock }).updateLocale).toHaveBeenCalled();
  });
});

describe('Shipping command handlers', () => {
  it('InitializeShippingHandler delegates', async () => {
    const svc = makeMock();
    const h = new InitializeShippingHandler(svc);
    await h.execute(new InitializeShippingCommand(UUID, 'standard', UUID));
    expect((svc as { initialize: jest.Mock }).initialize).toHaveBeenCalled();
  });
  it('AddShippingRateHandler delegates', async () => {
    const svc = makeMock();
    const h = new AddShippingRateHandler(svc);
    await h.execute(new AddShippingRateCommand({ vendorId: UUID } as never, UUID));
    expect((svc as { addRate: jest.Mock }).addRate).toHaveBeenCalled();
  });
  it('RemoveShippingRateHandler delegates', async () => {
    const svc = makeMock();
    const h = new RemoveShippingRateHandler(svc);
    await h.execute(new RemoveShippingRateCommand(UUID, 'standard', 'inside_city', UUID));
    expect((svc as { removeRate: jest.Mock }).removeRate).toHaveBeenCalled();
  });
  it('SetFreeShippingThresholdHandler delegates', async () => {
    const svc = makeMock();
    const h = new SetFreeShippingThresholdHandler(svc);
    await h.execute(new SetFreeShippingThresholdCommand(UUID, 1000, UUID));
    expect((svc as { setFreeShippingThreshold: jest.Mock }).setFreeShippingThreshold).toHaveBeenCalled();
  });
});

describe('Stats command handlers', () => {
  it('InitializeStatsPeriodHandler delegates', async () => {
    const svc = makeMock();
    const h = new InitializeStatsPeriodHandler(svc);
    await h.execute(new InitializeStatsPeriodCommand(UUID, '2026-01-01T00:00:00Z', '2026-01-31T00:00:00Z', 'BDT', UUID));
    expect((svc as { initializePeriod: jest.Mock }).initializePeriod).toHaveBeenCalled();
  });
  it('RecordOrderStatsHandler delegates', async () => {
    const svc = makeMock();
    const h = new RecordOrderStatsHandler(svc);
    await h.execute(new RecordOrderStatsCommand(UUID, 1000, UUID));
    expect((svc as { recordOrder: jest.Mock }).recordOrder).toHaveBeenCalled();
  });
});

describe('Subscription command handlers', () => {
  it('CreateSubscriptionHandler delegates', async () => {
    const svc = makeMock();
    const h = new CreateSubscriptionHandler(svc);
    await h.execute(new CreateSubscriptionCommand({ vendorId: UUID } as never, UUID));
    expect((svc as { create: jest.Mock }).create).toHaveBeenCalled();
  });
  it('ChangeSubscriptionPlanHandler delegates', async () => {
    const svc = makeMock();
    const h = new ChangeSubscriptionPlanHandler(svc);
    await h.execute(new ChangeSubscriptionPlanCommand({ vendorId: UUID } as never, UUID));
    expect((svc as { changePlan: jest.Mock }).changePlan).toHaveBeenCalled();
  });
  it('CancelSubscriptionHandler delegates', async () => {
    const svc = makeMock();
    const h = new CancelSubscriptionHandler(svc);
    await h.execute(new CancelSubscriptionCommand({ vendorId: UUID } as never, UUID));
    expect((svc as { cancel: jest.Mock }).cancel).toHaveBeenCalled();
  });
  it('RenewSubscriptionHandler delegates', async () => {
    const svc = makeMock();
    const h = new RenewSubscriptionHandler(svc);
    await h.execute(new RenewSubscriptionCommand({ vendorId: UUID } as never, UUID));
    expect((svc as { renew: jest.Mock }).renew).toHaveBeenCalled();
  });
});

describe('Team command handlers', () => {
  it('InviteTeamMemberHandler delegates', async () => {
    const svc = makeMock();
    const h = new InviteTeamMemberHandler(svc);
    await h.execute(new InviteTeamMemberCommand({ vendorId: UUID } as never, UUID));
    expect((svc as { invite: jest.Mock }).invite).toHaveBeenCalled();
  });
  it('AcceptTeamInviteHandler delegates', async () => {
    const svc = makeMock();
    const h = new AcceptTeamInviteHandler(svc);
    await h.execute(new AcceptTeamInviteCommand({ token: 'ABCDEFGHIJKLMNOP1234' } as never, UUID));
    expect((svc as { acceptInvite: jest.Mock }).acceptInvite).toHaveBeenCalled();
  });
  it('RemoveTeamMemberHandler delegates', async () => {
    const svc = makeMock();
    const h = new RemoveTeamMemberHandler(svc);
    await h.execute(new RemoveTeamMemberCommand(UUID, UUID, UUID));
    expect((svc as { removeMember: jest.Mock }).removeMember).toHaveBeenCalled();
  });
  it('ChangeTeamMemberRoleHandler delegates', async () => {
    const svc = makeMock();
    const h = new ChangeTeamMemberRoleHandler(svc);
    await h.execute(new ChangeTeamMemberRoleCommand(UUID, UUID, 'vendor_manager', UUID));
    expect((svc as { changeRole: jest.Mock }).changeRole).toHaveBeenCalled();
  });
  it('SuspendTeamMemberHandler delegates', async () => {
    const svc = makeMock();
    const h = new SuspendTeamMemberHandler(svc);
    await h.execute(new SuspendTeamMemberCommand(UUID, UUID, UUID));
    expect((svc as { suspendMember: jest.Mock }).suspendMember).toHaveBeenCalled();
  });
});

describe('Warranty command handlers', () => {
  it('InitializeWarrantyHandler delegates', async () => {
    const svc = makeMock();
    const h = new InitializeWarrantyHandler(svc);
    await h.execute(new InitializeWarrantyCommand(UUID, UUID));
    expect((svc as { initialize: jest.Mock }).initialize).toHaveBeenCalledWith(UUID, UUID);
  });
  it('UpdateWarrantyTypeHandler delegates', async () => {
    const svc = makeMock();
    const h = new UpdateWarrantyTypeHandler(svc);
    await h.execute(new UpdateWarrantyTypeCommand(UUID, 'manufacturer', UUID));
    expect((svc as { updateType: jest.Mock }).updateType).toHaveBeenCalledWith(UUID, 'manufacturer', UUID);
  });
  it('UpdateWarrantyPeriodHandler delegates', async () => {
    const svc = makeMock();
    const h = new UpdateWarrantyPeriodHandler(svc);
    await h.execute(new UpdateWarrantyPeriodCommand(UUID, 90, UUID));
    expect((svc as { updatePeriod: jest.Mock }).updatePeriod).toHaveBeenCalledWith(UUID, 90, UUID);
  });
  it('AddWarrantyExclusionHandler delegates', async () => {
    const svc = makeMock();
    const h = new AddWarrantyExclusionHandler(svc);
    await h.execute(new AddWarrantyExclusionCommand(UUID, 'abuse', UUID));
    expect((svc as { addExclusion: jest.Mock }).addExclusion).toHaveBeenCalled();
  });
  it('RemoveWarrantyExclusionHandler delegates', async () => {
    const svc = makeMock();
    const h = new RemoveWarrantyExclusionHandler(svc);
    await h.execute(new RemoveWarrantyExclusionCommand(UUID, 'abuse', UUID));
    expect((svc as { removeExclusion: jest.Mock }).removeExclusion).toHaveBeenCalled();
  });
});
