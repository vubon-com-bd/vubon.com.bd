import {
  VENDOR_TEAM_EVENT_TYPE,
  VendorTeamInviteSentEvent,
  VendorTeamInviteAcceptedEvent,
  VendorTeamInviteRejectedEvent,
  VendorTeamInviteCancelledEvent,
  VendorTeamInviteExpiredEvent,
  VendorTeamMemberAddedEvent,
  VendorTeamMemberActivatedEvent,
  VendorTeamMemberRoleChangedEvent,
  VendorTeamMemberSuspendedEvent,
  VendorTeamMemberRemovedEvent,
  VendorTeamPermissionGrantedEvent,
  VendorTeamPermissionRevokedEvent,
} from '../../../../src/module/domain/events/vendor-team.events.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';
const FUTURE = '2026-02-01T00:00:00.000Z';

describe('Vendor team events', () => {
  it('constants defined', () => {
    expect(VENDOR_TEAM_EVENT_TYPE.INVITE_SENT).toBe('vendor.team.invite_sent');
    expect(VENDOR_TEAM_EVENT_TYPE.MEMBER_ADDED).toBe('vendor.team.member_added');
    expect(VENDOR_TEAM_EVENT_TYPE.PERMISSION_GRANTED).toBe('vendor.team.permission_granted');
  });

  it('VendorTeamInviteSentEvent', () => {
    const e = new VendorTeamInviteSentEvent({
      aggregateId: UUID,
      payload: {
        inviteId: UUID, vendorId: UUID, email: 'a@b.com',
        role: 'vendor_viewer', invitedBy: UUID, expiresAt: FUTURE, sentAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.team.invite_sent');
    expect(e.aggregateType).toBe('VendorTeam');
  });

  it('VendorTeamInviteAcceptedEvent', () => {
    const e = new VendorTeamInviteAcceptedEvent({
      aggregateId: UUID,
      payload: { inviteId: UUID, vendorId: UUID, userId: UUID, acceptedAt: NOW },
    });
    expect(e.type).toBe('vendor.team.invite_accepted');
  });

  it('VendorTeamInviteRejectedEvent', () => {
    const e = new VendorTeamInviteRejectedEvent({
      aggregateId: UUID,
      payload: { inviteId: UUID, vendorId: UUID, rejectedAt: NOW },
    });
    expect(e.type).toBe('vendor.team.invite_rejected');
  });

  it('VendorTeamInviteCancelledEvent', () => {
    const e = new VendorTeamInviteCancelledEvent({
      aggregateId: UUID,
      payload: { inviteId: UUID, vendorId: UUID, cancelledAt: NOW },
    });
    expect(e.type).toBe('vendor.team.invite_cancelled');
  });

  it('VendorTeamInviteExpiredEvent', () => {
    const e = new VendorTeamInviteExpiredEvent({
      aggregateId: UUID,
      payload: { inviteId: UUID, vendorId: UUID, expiredAt: NOW },
    });
    expect(e.type).toBe('vendor.team.invite_expired');
  });

  it('VendorTeamMemberAddedEvent', () => {
    const e = new VendorTeamMemberAddedEvent({
      aggregateId: UUID,
      payload: { memberId: UUID, vendorId: UUID, userId: UUID, role: 'vendor_viewer', addedAt: NOW },
    });
    expect(e.type).toBe('vendor.team.member_added');
  });

  it('VendorTeamMemberActivatedEvent', () => {
    const e = new VendorTeamMemberActivatedEvent({
      aggregateId: UUID,
      payload: { memberId: UUID, vendorId: UUID, userId: UUID, activatedAt: NOW },
    });
    expect(e.type).toBe('vendor.team.member_activated');
  });

  it('VendorTeamMemberRoleChangedEvent', () => {
    const e = new VendorTeamMemberRoleChangedEvent({
      aggregateId: UUID,
      payload: {
        memberId: UUID, vendorId: UUID, userId: UUID,
        fromRole: 'vendor_viewer', toRole: 'vendor_manager', changedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.team.member_role_changed');
    expect(e.payload.toRole).toBe('vendor_manager');
  });

  it('VendorTeamMemberSuspendedEvent', () => {
    const e = new VendorTeamMemberSuspendedEvent({
      aggregateId: UUID,
      payload: {
        memberId: UUID, vendorId: UUID, userId: UUID,
        reason: 'policy', suspendedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.team.member_suspended');
  });

  it('VendorTeamMemberRemovedEvent', () => {
    const e = new VendorTeamMemberRemovedEvent({
      aggregateId: UUID,
      payload: { memberId: UUID, vendorId: UUID, userId: UUID, removedBy: UUID, removedAt: NOW },
    });
    expect(e.type).toBe('vendor.team.member_removed');
  });

  it('VendorTeamPermissionGrantedEvent', () => {
    const e = new VendorTeamPermissionGrantedEvent({
      aggregateId: UUID,
      payload: {
        memberId: UUID, vendorId: UUID, userId: UUID,
        permission: 'vendor:product:create', grantedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.team.permission_granted');
  });

  it('VendorTeamPermissionRevokedEvent', () => {
    const e = new VendorTeamPermissionRevokedEvent({
      aggregateId: UUID,
      payload: {
        memberId: UUID, vendorId: UUID, userId: UUID,
        permission: 'vendor:product:create', revokedAt: NOW,
      },
    });
    expect(e.type).toBe('vendor.team.permission_revoked');
  });
});
