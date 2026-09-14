/**
 * Vendor Team Types
 * @module shared-types/business/vendor
 *
 * Values আসে shared-constants/business/vendor/vendor-team.constants থেকে।
 */

import type {
  VENDOR_TEAM_STATUS,
  VENDOR_TEAM_INVITE_STATUS,
} from '@vubon/shared-constants/business';
import type { VendorId, UserId, Email } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { VendorRoleValue } from './vendor-role.types';

export type VendorTeamStatusValue = (typeof VENDOR_TEAM_STATUS)[keyof typeof VENDOR_TEAM_STATUS];

export type VendorTeamInviteStatusValue =
  (typeof VENDOR_TEAM_INVITE_STATUS)[keyof typeof VENDOR_TEAM_INVITE_STATUS];

export interface VendorTeamMember extends BaseEntity<string> {
  readonly vendorId: VendorId;
  readonly userId: UserId;
  readonly email: Email;
  readonly name: string;
  readonly role: VendorRoleValue;
  readonly status: VendorTeamStatusValue;
  readonly joinedAt: string;
  readonly lastActiveAt?: string;
  readonly invitedBy?: UserId;
}

export interface VendorTeamMemberPublic {
  readonly userId: UserId;
  readonly name: string;
  readonly email: Email;
  readonly role: VendorRoleValue;
  readonly status: VendorTeamStatusValue;
  readonly joinedAt: string;
}

export interface VendorTeamInvite {
  readonly id: string;
  readonly vendorId: VendorId;
  readonly email: Email;
  readonly role: VendorRoleValue;
  readonly status: VendorTeamInviteStatusValue;
  readonly token: string;
  readonly invitedBy: UserId;
  readonly invitedAt: string;
  readonly expiresAt: string;
  readonly acceptedAt?: string;
}

export interface VendorTeamInviteInput {
  readonly vendorId: VendorId;
  readonly email: Email;
  readonly role: VendorRoleValue;
  readonly message?: string;
}

export interface VendorTeamAcceptInput {
  readonly token: string;
  readonly userId: UserId;
}
