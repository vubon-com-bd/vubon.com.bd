/**
 * RolePermissionResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() resource!: string;
  @ApiProperty() action!: string;
  @ApiProperty() description?: string;
}

export class RoleResponseDTO {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty() description!: string;
  @ApiProperty({ type: [String] }) permissions!: string[];
  @ApiProperty() isSystem!: boolean;
  @ApiProperty() createdAt!: string;
  @ApiProperty() updatedAt!: string;
}

export class UserPermissionResponseDTO {
  @ApiProperty({ type: [String] }) permissions!: string[];
  @ApiProperty({ type: [String] }) roles!: string[];
  @ApiProperty() isSuperAdmin!: boolean;
}
