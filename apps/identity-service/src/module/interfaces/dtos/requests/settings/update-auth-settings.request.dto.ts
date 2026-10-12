/**
 * Update Auth Settings HTTP Request DTO
 * @module identity-service/interfaces/dtos/requests/settings
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateAuthSettingsHttpDTO {
  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  twoFactorRequired?: boolean;

  @ApiPropertyOptional({ example: 86400 })
  @IsOptional()
  @IsInt()
  @Min(300)
  @Max(30 * 24 * 3600)
  sessionTimeoutSeconds?: number;

  @ApiPropertyOptional({ example: 90 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(365)
  passwordExpiryDays?: number;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(20)
  passwordHistoryCount?: number;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  loginAlertsEnabled?: boolean;

  @ApiPropertyOptional({ example: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(20)
  maxLoginAttempts?: number;

  @ApiPropertyOptional({ example: 900 })
  @IsOptional()
  @IsInt()
  @Min(60)
  @Max(24 * 3600)
  lockoutDurationSeconds?: number;

  @ApiPropertyOptional({ example: ['10.0.0.0/8'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedIpRanges?: string[];

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  mfaRequired?: boolean;
}
