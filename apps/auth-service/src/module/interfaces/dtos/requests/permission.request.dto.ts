import { ApiProperty } from '@nestjs/swagger';

export class PermissionAssignRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  permission!: string;
}

export class PermissionRevokeRequestDTO {
  @ApiProperty()
  userId!: string;

  @ApiProperty()
  permission!: string;
}
