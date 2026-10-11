/**
 * Notification list HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/notification
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import {
  NOTIFICATION_TYPE,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_STATUS,
  NOTIFICATION_PRIORITY,
} from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(NOTIFICATION_TYPE) as string[];
const CATEGORY_VALUES = Object.values(NOTIFICATION_CATEGORY) as string[];
const CHANNEL_VALUES = Object.values(NOTIFICATION_CHANNEL) as string[];
const STATUS_VALUES = Object.values(NOTIFICATION_STATUS) as string[];
const PRIORITY_VALUES = Object.values(NOTIFICATION_PRIORITY) as string[];

export class ListNotificationsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  readonly limit?: number;

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional({ enum: CATEGORY_VALUES })
  @IsOptional()
  @IsEnum(CATEGORY_VALUES)
  readonly category?: string;

  @ApiPropertyOptional({ enum: CHANNEL_VALUES })
  @IsOptional()
  @IsEnum(CHANNEL_VALUES)
  readonly channel?: string;

  @ApiPropertyOptional({ enum: STATUS_VALUES })
  @IsOptional()
  @IsEnum(STATUS_VALUES)
  readonly status?: string;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiPropertyOptional({ example: 'true' })
  @IsOptional()
  @IsBooleanString()
  readonly isRead?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;

  @ApiPropertyOptional({ example: 'order' })
  @IsOptional()
  @IsString()
  readonly referenceType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly referenceId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiPropertyOptional({ enum: ['createdAt', 'updatedAt', 'sentAt', 'priority'] })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  readonly sortDir?: 'asc' | 'desc';
}

export class GetNotificationHttpParamDTO {
  @ApiPropertyOptional()
  @IsUUID()
  readonly notificationId!: string;
}

export class NotificationStatsHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;
}
