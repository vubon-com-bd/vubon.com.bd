/**
 * Permission Response DTO
 * @module identity-service/interfaces/dtos/responses/permission
 */
import { ApiProperty } from '@nestjs/swagger';

export class PermissionHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly action!: string;
  @ApiProperty() readonly resource!: string;
  @ApiProperty() readonly description!: string;
  @ApiProperty() readonly isSensitive!: boolean;
}
