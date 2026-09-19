export type VendorTeamRole = 'owner' | 'manager' | 'staff' | 'viewer';

export interface VendorTeamMember {
  readonly id: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly role: VendorTeamRole;
  readonly joinedAt: string;
}

export interface TeamListResponse {
  readonly members: readonly VendorTeamMember[];
  readonly total: number;
}

export interface InviteTeamRequest {
  readonly email: string;
  readonly role: VendorTeamRole;
}
