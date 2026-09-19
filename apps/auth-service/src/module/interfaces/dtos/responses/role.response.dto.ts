import { ApiProperty } from '@nestjs/swagger';
import type { UserRoleResponseDTO } from '../../../application/dtos/responses/user-role-response.dto';

export class RoleResponseDTO {
  @ApiProperty({ type: [String] })
  roles!: UserRoleResponseDTO;
}
