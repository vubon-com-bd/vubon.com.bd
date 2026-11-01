/**
 * Role Response DTO
 * @module identity-service/interfaces/dtos/responses/role
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly name!: string;
  @ApiProperty() readonly description!: string;
  @ApiProperty() readonly level!: number;
  @ApiProperty() readonly isSystem!: boolean;
  @ApiProperty({ example: ['auth:login', 'user:view'], type: [String] })
  readonly permissions!: readonly string[];
  @ApiProperty() readonly createdAt!: string;
}
