/**
 * TokenRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TokenRequestDTO {
  @ApiProperty({ example: 'refresh-token-value' })
  refreshToken!: string;

  @ApiPropertyOptional({ example: 'device-uuid' })
  deviceId?: string;
}
