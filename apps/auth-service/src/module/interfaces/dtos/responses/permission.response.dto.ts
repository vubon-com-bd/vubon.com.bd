import { ApiProperty } from '@nestjs/swagger';
import type { UserPermissionResponseDTO } from '../../../application/dtos/responses/user-permission-response.dto';

export class PermissionResponseDTO {
  @ApiProperty({ type: [String] })
  permissions!: UserPermissionResponseDTO;
}
