import { ApiPropertyOptional } from '@nestjs/swagger';

export class SettingsUpdateRequestDTO {
  @ApiPropertyOptional()
  theme?: string;

  @ApiPropertyOptional()
  language?: string;

  @ApiPropertyOptional()
  timezone?: string;

  @ApiPropertyOptional()
  notifications?: boolean;
}
