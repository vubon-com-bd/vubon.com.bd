import { ApiProperty } from '@nestjs/swagger';

export class RoleAssignRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  role!: string;
}

export class RoleRevokeRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  role!: string;
}
