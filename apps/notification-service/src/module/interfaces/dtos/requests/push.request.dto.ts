/**
 * Push HTTP Request DTOs
 * @module notification-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { PUSH_PRIORITY } from '@vubon/shared-constants/platform';

const PRIORITY_VALUES = Object.values(PUSH_PRIORITY) as string[];

export class SendPushHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  @IsString({ each: true })
  readonly tokens!: readonly string[];

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(65)
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(240)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly iconUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly silent?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(2419200)
  readonly ttl?: number;
}

export class SendBulkPushHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10000)
  @IsString({ each: true })
  readonly tokens!: readonly string[];

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(65)
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(240)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly silent?: boolean;
}
