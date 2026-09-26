/**
 * PreferencesRequestDTO
 * @module auth-service/interfaces/dtos/requests
 */
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePreferencesRequestDTO {
  @ApiPropertyOptional({ enum: ['light', 'dark', 'system'] })
  theme?: 'light' | 'dark' | 'system';

  @ApiPropertyOptional({ minLength: 3, maxLength: 3 })
  currency?: string;

  @ApiPropertyOptional()
  dateFormat?: string;

  @ApiPropertyOptional()
  reduceMotion?: boolean;
}
