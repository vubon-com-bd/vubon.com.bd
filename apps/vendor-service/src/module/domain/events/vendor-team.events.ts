/**
 * Vendor Team (invite + member) domain events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { newEventId, now } from './event.helpers.js';

const AGGREGATE_TYPE = 'VendorTeam';

export const VENDOR_TEAM_EVENT_TYPE = {
  INVITE_SENT: 'vendor.team.invite_sent',
  INVITE_ACCEPTED: 'vendor.team.invite_accepted',
  INVITE_REJECTED: 'vendor.team.invite_rejected',
  INVITE_CANCELLED: 'vendor.team.invite_cancelled',
  INVITE_EXPIRED: 'vendor.team.invite_expired',
  MEMBER_ADDED: 'vendor.team.member_added',
  MEMBER_ACTIVATED: 'vendor.team.member_activated',
  MEMBER_ROLE_CHANGED: 'vendor.team.member_role_changed',
  MEMBER_SUSPENDED: 'vendor.team.member_suspended',
  MEMBER_REMOVED: 'vendor.team.member_removed',
  PERMISSION_GRANTED: 'vendor.team.permission_granted',
  PERMISSION_REVOKED: 'vendor.team.permission_revoked',
} as const;

export interface VendorTeamInviteSentPayload {
  readonly inviteId: string;
  readonly vendorId: string;
  readonly email: string;
  readonly role: string;
  readonly invitedBy: string;
  readonly expiresAt: string;
  readonly sentAt: string;
}
export interface VendorTeamInviteAcceptedPayload {
  readonly inviteId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly acceptedAt: string;
}
export interface VendorTeamInviteRejectedPayload {
  readonly inviteId: string;
  readonly vendorId: string;
  readonly rejectedAt: string;
}
export interface VendorTeamInviteCancelledPayload {
  readonly inviteId: string;
  readonly vendorId: string;
  readonly cancelledAt: string;
}
export interface VendorTeamInviteExpiredPayload {
  readonly inviteId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
}
export interface VendorTeamMemberAddedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly role: string;
  readonly addedAt: string;
}
export interface VendorTeamMemberActivatedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly activatedAt: string;
}
export interface VendorTeamMemberRoleChangedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly fromRole: string;
  readonly toRole: string;
  readonly changedAt: string;
}
export interface VendorTeamMemberSuspendedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly suspendedAt: string;
}
export interface VendorTeamMemberRemovedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly removedBy?: string;
  readonly removedAt: string;
}
export interface VendorTeamPermissionGrantedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly permission: string;
  readonly grantedAt: string;
}
export interface VendorTeamPermissionRevokedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly permission: string;
  readonly revokedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};
function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VendorTeamInviteSentEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.INVITE_SENT, VendorTeamInviteSentPayload> {
  constructor(p: EventParams<VendorTeamInviteSentPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.INVITE_SENT, p)); }
}
export class VendorTeamInviteAcceptedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.INVITE_ACCEPTED, VendorTeamInviteAcceptedPayload> {
  constructor(p: EventParams<VendorTeamInviteAcceptedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.INVITE_ACCEPTED, p)); }
}
export class VendorTeamInviteRejectedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.INVITE_REJECTED, VendorTeamInviteRejectedPayload> {
  constructor(p: EventParams<VendorTeamInviteRejectedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.INVITE_REJECTED, p)); }
}
export class VendorTeamInviteCancelledEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.INVITE_CANCELLED, VendorTeamInviteCancelledPayload> {
  constructor(p: EventParams<VendorTeamInviteCancelledPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.INVITE_CANCELLED, p)); }
}
export class VendorTeamInviteExpiredEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.INVITE_EXPIRED, VendorTeamInviteExpiredPayload> {
  constructor(p: EventParams<VendorTeamInviteExpiredPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.INVITE_EXPIRED, p)); }
}
export class VendorTeamMemberAddedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.MEMBER_ADDED, VendorTeamMemberAddedPayload> {
  constructor(p: EventParams<VendorTeamMemberAddedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.MEMBER_ADDED, p)); }
}
export class VendorTeamMemberActivatedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.MEMBER_ACTIVATED, VendorTeamMemberActivatedPayload> {
  constructor(p: EventParams<VendorTeamMemberActivatedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.MEMBER_ACTIVATED, p)); }
}
export class VendorTeamMemberRoleChangedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.MEMBER_ROLE_CHANGED, VendorTeamMemberRoleChangedPayload> {
  constructor(p: EventParams<VendorTeamMemberRoleChangedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.MEMBER_ROLE_CHANGED, p)); }
}
export class VendorTeamMemberSuspendedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.MEMBER_SUSPENDED, VendorTeamMemberSuspendedPayload> {
  constructor(p: EventParams<VendorTeamMemberSuspendedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.MEMBER_SUSPENDED, p)); }
}
export class VendorTeamMemberRemovedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.MEMBER_REMOVED, VendorTeamMemberRemovedPayload> {
  constructor(p: EventParams<VendorTeamMemberRemovedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.MEMBER_REMOVED, p)); }
}
export class VendorTeamPermissionGrantedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.PERMISSION_GRANTED, VendorTeamPermissionGrantedPayload> {
  constructor(p: EventParams<VendorTeamPermissionGrantedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.PERMISSION_GRANTED, p)); }
}
export class VendorTeamPermissionRevokedEvent extends BaseDomainEvent<typeof VENDOR_TEAM_EVENT_TYPE.PERMISSION_REVOKED, VendorTeamPermissionRevokedPayload> {
  constructor(p: EventParams<VendorTeamPermissionRevokedPayload>) { super(buildParams(VENDOR_TEAM_EVENT_TYPE.PERMISSION_REVOKED, p)); }
}
