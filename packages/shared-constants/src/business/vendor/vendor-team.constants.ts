export const VENDOR_TEAM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  INVITED: 'invited',
  SUSPENDED: 'suspended',
  REMOVED: 'removed',
} as const;

export const VENDOR_TEAM = {
  MAX_MEMBERS: 50,
  MAX_MEMBERS_PREMIUM: 200,
  MAX_MEMBERS_ENTERPRISE: 1000,
  INVITE_EXPIRY_DAYS: 7,
  REQUIRE_OWNER_APPROVAL: true,
  ALLOW_MULTIPLE_ROLES: false,
  MAX_INVITES_PER_DAY: 10,
} as const;

export const VENDOR_TEAM_INVITE_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export type VendorTeamStatusType = (typeof VENDOR_TEAM_STATUS)[keyof typeof VENDOR_TEAM_STATUS];
export type VendorTeamInviteStatusType =
  (typeof VENDOR_TEAM_INVITE_STATUS)[keyof typeof VENDOR_TEAM_INVITE_STATUS];
