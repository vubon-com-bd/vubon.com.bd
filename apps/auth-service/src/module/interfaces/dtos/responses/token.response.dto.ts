/**
 * TokenResponseDTO
 * @module auth-service/interfaces/dtos/responses
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TokenResponseDTO {
  @ApiProperty() accessToken!: string;
  @ApiProperty() refreshToken!: string;
  @ApiProperty({ example: 'Bearer' }) tokenType!: 'Bearer';
  @ApiProperty({ example: 900 }) expiresIn!: number;
  @ApiProperty({ example: 1735689600000 }) expiresAt!: number;
  @ApiPropertyOptional() scope?: string;
}
