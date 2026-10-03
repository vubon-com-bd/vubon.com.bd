/**
 * Profile Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileResponseDto {
  @ApiProperty() userId!: string;
  @ApiPropertyOptional() firstName?: string;
  @ApiPropertyOptional() lastName?: string;
  @ApiPropertyOptional() displayName?: string;
  @ApiPropertyOptional() bio?: string;
  @ApiPropertyOptional() avatarUrl?: string;
  @ApiPropertyOptional() coverUrl?: string;
  @ApiPropertyOptional() gender?: string;
  @ApiPropertyOptional() dateOfBirth?: string;
  @ApiPropertyOptional() website?: string;
  @ApiPropertyOptional() company?: string;
  @ApiPropertyOptional() designation?: string;
  @ApiProperty() visibility!: string;
  @ApiProperty() updatedAt!: string;
}
