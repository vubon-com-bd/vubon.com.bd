/**
 * Schedule HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/schedule
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  NOTIFICATION_SCHEDULE_TYPE,
  NOTIFICATION_SCHEDULE_RECURRENCE,
} from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(NOTIFICATION_SCHEDULE_TYPE) as string[];
const RECURRENCE_VALUES = Object.values(NOTIFICATION_SCHEDULE_RECURRENCE) as string[];

export class CreateScheduleHttpDTO {
  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: RECURRENCE_VALUES })
  @IsEnum(RECURRENCE_VALUES)
  readonly recurrence!: string;

  @ApiProperty({ example: '2026-10-11T09:00:00.000Z' })
  @IsISO8601()
  readonly scheduledAt!: string;

  @ApiProperty({ example: 'Asia/Dhaka' })
  @IsString()
  @MinLength(1)
  @MaxLength(60)
  readonly timezone!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly notificationTemplateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10_000)
  readonly maxOccurrences?: number;

  @ApiPropertyOptional()
  @IsOptional()
  readonly data?: Readonly<Record<string, unknown>>;
}

export class UpdateScheduleHttpDTO {
  @ApiPropertyOptional({ example: '2026-10-12T09:00:00.000Z' })
  @IsOptional()
  @IsISO8601()
  readonly scheduledAt?: string;

  @ApiPropertyOptional({ enum: RECURRENCE_VALUES })
  @IsOptional()
  @IsEnum(RECURRENCE_VALUES)
  readonly recurrence?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly timezone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly maxOccurrences?: number;
}

export class TriggerScheduleHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly triggeredNotificationId?: string;
}

export class PauseScheduleHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class CancelScheduleHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class ListSchedulesHttpQueryDTO {
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
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'scheduledAt', 'nextOccurrenceAt'] })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  readonly sortDir?: 'asc' | 'desc';
}

export class GetDueSchedulesHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly at?: string;
}
