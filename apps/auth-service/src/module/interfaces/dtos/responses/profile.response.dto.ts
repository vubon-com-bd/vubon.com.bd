/**
 * ProfileResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileResponseDTO {
  @ApiProperty() userId!: string;
  @ApiProperty() displayName!: string;
  @ApiPropertyOptional() bio?: string;
  @ApiPropertyOptional() avatarUrl?: string;
  @ApiProperty() locale!: string;
  @ApiProperty() updatedAt!: string;
}
