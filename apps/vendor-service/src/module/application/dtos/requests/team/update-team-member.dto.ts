export class UpdateTeamMemberRequestDto {
  memberId!: string;
  role?: string;
  permissions?: readonly string[];
}
