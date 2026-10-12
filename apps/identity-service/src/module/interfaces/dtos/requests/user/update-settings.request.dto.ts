/**
 * Update Settings HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/user
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

const THEMES = ['light', 'dark', 'system'] as const;
const TIME_FORMATS = ['12h', '24h'] as const;

export class UpdateSettingsHttpDTO {
  @ApiPropertyOptional({ enum: THEMES })
  @IsOptional()
  @IsEnum(THEMES)
  theme?: (typeof THEMES)[number];

  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  @MaxLength(10)
  language?: string;

  @ApiPropertyOptional({ example: 'en-US' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  locale?: string;

  @ApiPropertyOptional({ example: 'Asia/Dhaka' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  timezone?: string;

  @ApiPropertyOptional({ example: 'BDT' })
  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;

  @ApiPropertyOptional({ example: 'DD/MM/YYYY' })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  dateFormat?: string;

  @ApiPropertyOptional({ enum: TIME_FORMATS })
  @IsOptional()
  @IsEnum(TIME_FORMATS)
  timeFormat?: (typeof TIME_FORMATS)[number];
}
