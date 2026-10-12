/**
 * VendorTeamMemberResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_ROLE,
  VENDOR_TEAM_STATUS,
} from '@vubon/shared-constants/business';

export interface VendorTeamMemberResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly email: string;
  readonly name: string;
  readonly role: (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];
  readonly status: (typeof VENDOR_TEAM_STATUS)[keyof typeof VENDOR_TEAM_STATUS];
  readonly permissions: readonly string[];
  readonly joinedAt: string;
  readonly lastActiveAt?: string;
  readonly invitedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorTeamMemberPublicDto {
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly role: (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];
  readonly status: (typeof VENDOR_TEAM_STATUS)[keyof typeof VENDOR_TEAM_STATUS];
  readonly joinedAt: string;
}
