/**
 * Webhook HTTP Request DTOs
 * @module notification-service/interfaces/dtos/requests
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { WEBHOOK_EVENT, WEBHOOK_STATUS } from '@vubon/shared-constants/platform';

const EVENT_VALUES = Object.values(WEBHOOK_EVENT) as string[];
const STATUS_VALUES = Object.values(WEBHOOK_STATUS) as string[];

export class CreateWebhookHttpDTO {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(150)
  readonly name!: string;

  @ApiProperty()
  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  readonly url!: string;

  @ApiProperty({ enum: EVENT_VALUES, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsEnum(EVENT_VALUES, { each: true })
  readonly events!: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly headers?: Readonly<Record<string, string>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(256)
  readonly secret?: string;
}

export class UpdateWebhookHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(150)
  readonly name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({ require_protocol: true, protocols: ['http', 'https'] })
  readonly url?: string;

  @ApiPropertyOptional({ enum: EVENT_VALUES, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEnum(EVENT_VALUES, { each: true })
  readonly events?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly headers?: Readonly<Record<string, string>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(256)
  readonly secret?: string;

  @ApiPropertyOptional({ enum: STATUS_VALUES })
  @IsOptional()
  @IsEnum(STATUS_VALUES)
  readonly status?: string;
}

export class TestWebhookHttpDTO {
  @ApiProperty({ enum: EVENT_VALUES })
  @IsEnum(EVENT_VALUES)
  readonly event!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly payload?: Readonly<Record<string, unknown>>;
}

export class ListWebhooksHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional({ enum: STATUS_VALUES })
  @IsOptional()
  @IsEnum(STATUS_VALUES)
  readonly status?: string;

  @ApiPropertyOptional({ enum: EVENT_VALUES })
  @IsOptional()
  @IsEnum(EVENT_VALUES)
  readonly event?: string;
}
