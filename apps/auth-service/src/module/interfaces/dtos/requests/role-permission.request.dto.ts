/**
 * RolePermissionRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssignRoleRequestDTO {
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty()
  role!: string;

  @ApiPropertyOptional()
  note?: string;
}

export class RevokeRoleRequestDTO {
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiProperty()
  role!: string;
}

export class AssignPermissionRequestDTO {
  @ApiProperty({ format: 'uuid' })
  roleId!: string;

  @ApiProperty()
  permission!: string;
}

export class RevokePermissionRequestDTO {
  @ApiProperty({ format: 'uuid' })
  roleId!: string;

  @ApiProperty()
  permission!: string;
}

export class LifecycleUserRequestDTO {
  @ApiProperty({ format: 'uuid' })
  userId!: string;

  @ApiPropertyOptional()
  reason?: string;

  @ApiPropertyOptional()
  until?: string;
}
