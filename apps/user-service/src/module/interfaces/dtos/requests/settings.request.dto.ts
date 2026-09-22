import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsRequestDto {
  @ApiPropertyOptional()
  theme?: string;

  @ApiPropertyOptional()
  language?: string;

  @ApiPropertyOptional()
  timezone?: string;

  @ApiPropertyOptional()
  currency?: string;

  @ApiPropertyOptional()
  notifications?: boolean;
}

export class ResetSettingsRequestDto {
  @ApiProperty()
  userId!: string;
}
