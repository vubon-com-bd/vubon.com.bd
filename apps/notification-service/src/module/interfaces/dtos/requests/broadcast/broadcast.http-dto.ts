/**
 * Broadcast HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/broadcast
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
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import {
  NOTIFICATION_BROADCAST_TYPE,
  NOTIFICATION_BROADCAST_TARGET,
} from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(NOTIFICATION_BROADCAST_TYPE) as string[];
const TARGET_VALUES = Object.values(NOTIFICATION_BROADCAST_TARGET) as string[];

export class CreateBroadcastHttpDTO {
  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: TARGET_VALUES })
  @IsEnum(TARGET_VALUES)
  readonly target!: string;

  @ApiProperty()
  @IsUUID()
  readonly templateId!: string;

  @ApiProperty({ isArray: true, example: ['email', 'push'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  readonly channels!: readonly string[];

  @ApiPropertyOptional({ example: 10_000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly estimatedRecipients?: number;

  @ApiPropertyOptional({ example: '2026-10-11T09:00:00.000Z' })
  @IsOptional()
  @IsISO8601()
  readonly scheduledAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly segmentFilter?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(1_000_000)
  @IsUUID('all', { each: true })
  readonly customRecipientIds?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  readonly data?: Readonly<Record<string, unknown>>;
}

export class UpdateBroadcastHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly templateId?: string;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly channels?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  readonly estimatedRecipients?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly scheduledAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly segmentFilter?: Readonly<Record<string, unknown>>;
}

export class ScheduleBroadcastHttpDTO {
  @ApiProperty({ example: '2026-10-11T09:00:00.000Z' })
  @IsISO8601()
  readonly scheduledAt!: string;
}

export class StartBroadcastHttpDTO {
  @ApiProperty({ example: 10_000 })
  @IsInt()
  @Min(1)
  readonly totalRecipients!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly approvedBy?: string;
}

export class CancelBroadcastHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly reason?: string;
}

export class TestBroadcastHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsUUID('all', { each: true })
  readonly recipientIds!: readonly string[];
}

export class ListBroadcastsHttpQueryDTO {
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

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly templateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly createdBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'scheduledAt', 'completedAt'] })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  readonly sortDir?: 'asc' | 'desc';
}
