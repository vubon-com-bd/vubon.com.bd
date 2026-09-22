export class AddTeamMemberRequestDto {
  vendorId!: string;
  userId!: string;
  role!: string;
  permissions?: readonly string[];
}
