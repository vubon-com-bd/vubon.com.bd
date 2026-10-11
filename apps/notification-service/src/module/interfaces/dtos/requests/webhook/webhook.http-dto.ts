/**
 * Webhook HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/webhook
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  WEBHOOK_METHOD,
  WEBHOOK_EVENT,
} from '@vubon/shared-constants/platform/notification';

const METHOD_VALUES = Object.values(WEBHOOK_METHOD) as string[];
const EVENT_VALUES = Object.values(WEBHOOK_EVENT) as string[];

export class CreateWebhookHttpDTO {
  @ApiProperty({ example: 'https://example.com/webhooks/vubon' })
  @IsUrl({ require_protocol: true })
  @MaxLength(2048)
  readonly url!: string;

  @ApiProperty({ enum: METHOD_VALUES, example: 'POST' })
  @IsEnum(METHOD_VALUES)
  readonly method!: string;

  @ApiProperty({ enum: EVENT_VALUES, isArray: true, example: ['order.created'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsEnum(EVENT_VALUES, { each: true })
  readonly events!: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(256)
  readonly secret?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly headers?: Readonly<Record<string, string>>;

  @ApiPropertyOptional()
  @IsOptional()
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class UpdateWebhookHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  readonly url?: string;

  @ApiPropertyOptional({ enum: METHOD_VALUES })
  @IsOptional()
  @IsEnum(METHOD_VALUES)
  readonly method?: string;

  @ApiPropertyOptional({ enum: EVENT_VALUES, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(50)
  @IsEnum(EVENT_VALUES, { each: true })
  readonly events?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(256)
  readonly secret?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly description?: string;
}

export class DeactivateWebhookHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class DisableWebhookHttpDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(500)
  readonly reason!: string;
}

export class TestWebhookHttpDTO {
  @ApiPropertyOptional({ enum: EVENT_VALUES })
  @IsOptional()
  @IsEnum(EVENT_VALUES)
  readonly event?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly payload?: Readonly<Record<string, unknown>>;
}

export class ListWebhooksHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ enum: EVENT_VALUES })
  @IsOptional()
  @IsEnum(EVENT_VALUES)
  readonly event?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'updatedAt', 'lastSuccessAt'] })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  readonly sortDir?: 'asc' | 'desc';
}

export class ListWebhookDeliveriesHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ enum: EVENT_VALUES })
  @IsOptional()
  @IsEnum(EVENT_VALUES)
  readonly event?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;
}
