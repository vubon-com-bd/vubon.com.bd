/**
 * User Full Response DTO (admin view)
 * @module identity-service/interfaces/dtos/responses/user
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserHttpResponseDTO {
  @ApiProperty() readonly id!: string;
  @ApiProperty() readonly email!: string;
  @ApiPropertyOptional() readonly firstName?: string;
  @ApiPropertyOptional() readonly lastName?: string;
  @ApiPropertyOptional() readonly username?: string;
  @ApiProperty() readonly status!: string;
  @ApiProperty() readonly type!: string;
  @ApiProperty({ type: [String] }) readonly roles!: readonly string[];
  @ApiProperty() readonly emailVerified!: boolean;
  @ApiProperty() readonly phoneVerified!: boolean;
  @ApiProperty() readonly isMfaEnabled!: boolean;
  @ApiPropertyOptional() readonly lastLoginAt?: string;
  @ApiProperty() readonly createdAt!: string;
  @ApiProperty() readonly updatedAt!: string;
}
