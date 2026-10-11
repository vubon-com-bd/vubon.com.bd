/**
 * Preference HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/preference
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class UpdatePreferenceHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly channelPreferences?: Readonly<Record<string, boolean>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly categoryPreferences?: Readonly<Record<string, boolean>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly frequency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly timezone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  readonly locale?: string;
}

export class ToggleChannelHttpDTO {
  @ApiProperty({ example: 'email' })
  @IsString()
  readonly channel!: string;

  @ApiProperty()
  @IsBoolean()
  readonly enabled!: boolean;
}

export class ToggleCategoryHttpDTO {
  @ApiProperty({ example: 'marketing' })
  @IsString()
  readonly category!: string;

  @ApiProperty()
  @IsBoolean()
  readonly enabled!: boolean;
}

export class UpdateQuietHoursHttpDTO {
  @ApiProperty()
  @IsBoolean()
  readonly enabled!: boolean;

  @ApiPropertyOptional({ example: 22 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(23)
  readonly startHour?: number;

  @ApiPropertyOptional({ example: 8 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(23)
  readonly endHour?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly timezone?: string;
}

export class OptOutHttpDTO {
  @ApiProperty({ example: 'marketing' })
  @IsString()
  readonly scope!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class OptInHttpDTO {
  @ApiProperty({ example: 'marketing' })
  @IsString()
  readonly scope!: string;
}

export class PreferenceUserParamHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;
}
