import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddTeamMemberRequestDto {
  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty({ example: 'staff' })
  role!: string;

  @ApiPropertyOptional({ type: [String] })
  permissions?: readonly string[];
}

export class UpdateTeamMemberRequestDto {
  @ApiProperty()
  memberId!: string;

  @ApiPropertyOptional()
  role?: string;

  @ApiPropertyOptional({ type: [String] })
  permissions?: readonly string[];
}

export class RemoveTeamMemberRequestDto {
  @ApiProperty()
  memberId!: string;

  @ApiPropertyOptional()
  reason?: string;
}

export class AssignRoleRequestDto {
  @ApiProperty()
  memberId!: string;

  @ApiProperty()
  role!: string;
}
