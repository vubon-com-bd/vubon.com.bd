/**
 * SessionRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SessionRequestDTO {
  @ApiPropertyOptional({ description: 'Filter by user id' })
  userId?: string;

  @ApiPropertyOptional({ example: 50 })
  limit?: number;
}
