export class TeamMemberResponseDto {
  id!: string;
  vendorId!: string;
  userId!: string;
  role!: string;
  permissions!: readonly string[];
  invitedAt!: string;
  joinedAt!: string | null;
}

export class TeamResponseDto {
  vendorId!: string;
  members!: readonly TeamMemberResponseDto[];
  maxMembers!: number;
  memberCount!: number;
}
