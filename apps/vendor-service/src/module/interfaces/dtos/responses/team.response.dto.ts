import { ApiProperty } from '@nestjs/swagger';

export class TeamMemberResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  vendorId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  role!: string;

  @ApiProperty({ type: [String] })
  permissions!: readonly string[];

  @ApiProperty()
  invitedAt!: string;

  @ApiProperty({ nullable: true })
  joinedAt!: string | null;
}
