/**
 * ProfileRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileRequestDTO {
  @ApiPropertyOptional({ minLength: 2, maxLength: 100 })
  displayName?: string;

  @ApiPropertyOptional({ maxLength: 500 })
  bio?: string;

  @ApiPropertyOptional({ format: 'url' })
  avatarUrl?: string;
}
