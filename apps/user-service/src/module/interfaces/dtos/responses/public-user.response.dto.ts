/**
 * Public User Response DTO
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublicUserResponseDto {
  @ApiProperty() id!: string;
  @ApiPropertyOptional() username?: string;
  @ApiPropertyOptional() displayName?: string;
  @ApiPropertyOptional() avatarUrl?: string;
  @ApiProperty() status!: string;
  @ApiProperty() type!: string;
}
