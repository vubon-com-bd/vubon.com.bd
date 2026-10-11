/**
 * Push notification HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/push
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  PUSH_PLATFORM,
  PUSH_PRIORITY,
  PUSH_PROVIDER,
} from '@vubon/shared-constants/platform/notification';

const PLATFORM_VALUES = Object.values(PUSH_PLATFORM) as string[];
const PRIORITY_VALUES = Object.values(PUSH_PRIORITY) as string[];
const PROVIDER_VALUES = Object.values(PUSH_PROVIDER) as string[];

export class PushActionHttpDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  readonly id!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  readonly title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly icon?: string;
}

export class SendPushHttpDTO {
  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10_000)
  @IsUUID('all', { each: true })
  readonly userIds?: readonly string[];

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10_000)
  @IsString({ each: true })
  readonly tokens?: readonly string[];

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
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ type: [PushActionHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(3)
  @Type(() => PushActionHttpDTO)
  readonly actions?: readonly PushActionHttpDTO[];

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
  @Min(0)
  readonly ttl?: number;

  @ApiPropertyOptional({ enum: PROVIDER_VALUES })
  @IsOptional()
  @IsEnum(PROVIDER_VALUES)
  readonly provider?: string;

  @ApiPropertyOptional({ enum: PLATFORM_VALUES })
  @IsOptional()
  @IsEnum(PLATFORM_VALUES)
  readonly platform?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class SendPushToTopicHttpDTO {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  readonly topic!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(65)
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(240)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;
}

export class RegisterPushSubscriptionHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  readonly token!: string;

  @ApiProperty({ enum: PLATFORM_VALUES })
  @IsEnum(PLATFORM_VALUES)
  readonly platform!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly deviceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly appVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly osVersion?: string;
}

export class ListPushHttpQueryDTO {
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
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly platform?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
