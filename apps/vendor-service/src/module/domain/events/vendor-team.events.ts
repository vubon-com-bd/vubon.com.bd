/**
 * Vendor Team Domain Events
 * @module vendor-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import {
  VENDOR_AGGREGATE_TYPE,
  buildEventParams,
  type EventParams,
} from './event.helpers.js';

export const VENDOR_TEAM_EVENT_TYPE = {
  INVITED: 'vendor.team.invited',
  INVITE_ACCEPTED: 'vendor.team.invite_accepted',
  INVITE_REJECTED: 'vendor.team.invite_rejected',
  INVITE_EXPIRED: 'vendor.team.invite_expired',
  INVITE_CANCELLED: 'vendor.team.invite_cancelled',
  ROLE_CHANGED: 'vendor.team.role_changed',
  SUSPENDED: 'vendor.team.suspended',
  REACTIVATED: 'vendor.team.reactivated',
  REMOVED: 'vendor.team.removed',
  PERMISSIONS_UPDATED: 'vendor.team.permissions_updated',
} as const;

export interface VendorTeamInvitedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly email: string;
  readonly role: string;
  readonly invitedAt: string;
  readonly invitedBy: string;
}

export interface VendorTeamInviteAcceptedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly acceptedAt: string;
}

export interface VendorTeamInviteRejectedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly rejectedAt: string;
  readonly reason?: string;
}

export interface VendorTeamInviteExpiredPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly expiredAt: string;
}

export interface VendorTeamInviteCancelledPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly cancelledAt: string;
  readonly cancelledBy: string;
}

export interface VendorTeamRoleChangedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly fromRole: string;
  readonly toRole: string;
  readonly changedAt: string;
  readonly changedBy: string;
}

export interface VendorTeamSuspendedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly suspendedAt: string;
  readonly suspendedBy: string;
  readonly reason?: string;
}

export interface VendorTeamReactivatedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly reactivatedAt: string;
  readonly reactivatedBy: string;
}

export interface VendorTeamRemovedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly removedAt: string;
  readonly removedBy: string;
  readonly reason?: string;
}

export interface VendorTeamPermissionsUpdatedPayload {
  readonly memberId: string;
  readonly vendorId: string;
  readonly addedPermissions: readonly string[];
  readonly removedPermissions: readonly string[];
  readonly updatedAt: string;
  readonly updatedBy: string;
}

export class VendorTeamInvitedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.INVITED,
  VendorTeamInvitedPayload
> {
  constructor(p: EventParams<VendorTeamInvitedPayload>) {
    super(
      buildEventParams(VENDOR_TEAM_EVENT_TYPE.INVITED, VENDOR_AGGREGATE_TYPE.TEAM, p),
    );
  }
}

export class VendorTeamInviteAcceptedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.INVITE_ACCEPTED,
  VendorTeamInviteAcceptedPayload
> {
  constructor(p: EventParams<VendorTeamInviteAcceptedPayload>) {
    super(
      buildEventParams(
        VENDOR_TEAM_EVENT_TYPE.INVITE_ACCEPTED,
        VENDOR_AGGREGATE_TYPE.TEAM,
        p,
      ),
    );
  }
}

export class VendorTeamInviteRejectedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.INVITE_REJECTED,
  VendorTeamInviteRejectedPayload
> {
  constructor(p: EventParams<VendorTeamInviteRejectedPayload>) {
    super(
      buildEventParams(
        VENDOR_TEAM_EVENT_TYPE.INVITE_REJECTED,
        VENDOR_AGGREGATE_TYPE.TEAM,
        p,
      ),
    );
  }
}

export class VendorTeamInviteExpiredEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.INVITE_EXPIRED,
  VendorTeamInviteExpiredPayload
> {
  constructor(p: EventParams<VendorTeamInviteExpiredPayload>) {
    super(
      buildEventParams(
        VENDOR_TEAM_EVENT_TYPE.INVITE_EXPIRED,
        VENDOR_AGGREGATE_TYPE.TEAM,
        p,
      ),
    );
  }
}

export class VendorTeamInviteCancelledEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.INVITE_CANCELLED,
  VendorTeamInviteCancelledPayload
> {
  constructor(p: EventParams<VendorTeamInviteCancelledPayload>) {
    super(
      buildEventParams(
        VENDOR_TEAM_EVENT_TYPE.INVITE_CANCELLED,
        VENDOR_AGGREGATE_TYPE.TEAM,
        p,
      ),
    );
  }
}

export class VendorTeamRoleChangedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.ROLE_CHANGED,
  VendorTeamRoleChangedPayload
> {
  constructor(p: EventParams<VendorTeamRoleChangedPayload>) {
    super(
      buildEventParams(
        VENDOR_TEAM_EVENT_TYPE.ROLE_CHANGED,
        VENDOR_AGGREGATE_TYPE.TEAM,
        p,
      ),
    );
  }
}

export class VendorTeamSuspendedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.SUSPENDED,
  VendorTeamSuspendedPayload
> {
  constructor(p: EventParams<VendorTeamSuspendedPayload>) {
    super(
      buildEventParams(VENDOR_TEAM_EVENT_TYPE.SUSPENDED, VENDOR_AGGREGATE_TYPE.TEAM, p),
    );
  }
}

export class VendorTeamReactivatedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.REACTIVATED,
  VendorTeamReactivatedPayload
> {
  constructor(p: EventParams<VendorTeamReactivatedPayload>) {
    super(
      buildEventParams(
        VENDOR_TEAM_EVENT_TYPE.REACTIVATED,
        VENDOR_AGGREGATE_TYPE.TEAM,
        p,
      ),
    );
  }
}

export class VendorTeamRemovedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.REMOVED,
  VendorTeamRemovedPayload
> {
  constructor(p: EventParams<VendorTeamRemovedPayload>) {
    super(
      buildEventParams(VENDOR_TEAM_EVENT_TYPE.REMOVED, VENDOR_AGGREGATE_TYPE.TEAM, p),
    );
  }
}

export class VendorTeamPermissionsUpdatedEvent extends BaseDomainEvent<
  typeof VENDOR_TEAM_EVENT_TYPE.PERMISSIONS_UPDATED,
  VendorTeamPermissionsUpdatedPayload
> {
  constructor(p: EventParams<VendorTeamPermissionsUpdatedPayload>) {
    super(
      buildEventParams(
        VENDOR_TEAM_EVENT_TYPE.PERMISSIONS_UPDATED,
        VENDOR_AGGREGATE_TYPE.TEAM,
        p,
      ),
    );
  }
}
