/**
 * Team Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface TeamMemberResponseDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly role: string;
  readonly status: string;
  readonly inviteStatus?: string;
  readonly email: string;
  readonly fullName: string;
  readonly permissions: readonly string[];
  readonly invitedAt: string;
  readonly invitedBy?: string;
  readonly joinedAt?: string;
  readonly lastActiveAt?: string;
  readonly suspendedAt?: string;
  readonly removedAt?: string;
  readonly removedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TeamMemberPublicResponseDTO {
  readonly id: string;
  readonly fullName: string;
  readonly role: string;
  readonly status: string;
  readonly joinedAt?: string;
}

export interface TeamMemberSummaryResponseDTO {
  readonly id: string;
  readonly fullName: string;
  readonly email: string;
  readonly role: string;
  readonly status: string;
  readonly isActive: boolean;
}

export interface TeamListResponseDTO {
  readonly items: readonly TeamMemberSummaryResponseDTO[];
  readonly total: number;
  readonly activeCount: number;
}

export interface TeamInviteResponseDTO {
  readonly success: true;
  readonly inviteId: string;
  readonly email: string;
  readonly role: string;
  readonly expiresAt: string;
}

export interface TeamMemberStatsResponseDTO {
  readonly total: number;
  readonly active: number;
  readonly invited: number;
  readonly suspended: number;
  readonly removed: number;
  readonly byRole: Readonly<Record<string, number>>;
}
