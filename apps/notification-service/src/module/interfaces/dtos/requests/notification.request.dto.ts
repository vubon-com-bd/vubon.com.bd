/**
 * Notification HTTP Request DTOs
 * @module notification-service/interfaces/dtos/requests
 *
 * Notification send/bulk/cancel/mark-read/list request bodies.
 * Shape derives from @vubon/shared-schemas — HTTP decorators here.
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import {
  NOTIFICATION_CATEGORY,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_TYPE,
} from '@vubon/shared-constants/platform';

const TYPE_VALUES = Object.values(NOTIFICATION_TYPE) as string[];
const CATEGORY_VALUES = Object.values(NOTIFICATION_CATEGORY) as string[];
const CHANNEL_VALUES = Object.values(NOTIFICATION_CHANNEL) as string[];
const PRIORITY_VALUES = Object.values(NOTIFICATION_PRIORITY) as string[];

// ═══════════════ Send single ═══════════════
export class SendNotificationHttpDTO {
  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ enum: TYPE_VALUES, example: 'transactional' })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: CATEGORY_VALUES, example: 'order' })
  @IsEnum(CATEGORY_VALUES)
  readonly category!: string;

  @ApiProperty({ enum: CHANNEL_VALUES, isArray: true, example: ['email', 'push'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(CHANNEL_VALUES, { each: true })
  readonly channels!: readonly string[];

  @ApiPropertyOptional({ enum: PRIORITY_VALUES, example: 'normal' })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiProperty({ example: 'Your order has been shipped' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  readonly subject!: string;

  @ApiProperty({ example: 'Your order #12345 has been shipped via Sundarban Courier.' })
  @IsString()
  @MinLength(1)
  @MaxLength(50000)
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
  @IsString()
  readonly actionUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: '2026-10-25T10:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  readonly scheduledAt?: string;

  @ApiPropertyOptional({ example: '2026-11-01T00:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  readonly expiresAt?: string;

  // ─── Recipient hints (optional) ─────────
  // If provided → used directly (dev/test, memory mode)
  // If absent → resolved via identity-service (production)

  @ApiPropertyOptional({ example: 'test@example.com' })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiPropertyOptional({ example: 'fcm-token-abc' })
  @IsOptional()
  @IsString()
  readonly deviceToken?: string;

  @ApiPropertyOptional({ example: 'https://example.com/webhook' })
  @IsOptional()
  @IsString()
  readonly webhookUrl?: string;
}

// ═══════════════ Send bulk ═══════════════
export class SendBulkNotificationHttpDTO {
  @ApiProperty({ isArray: true, example: ['uuid1', 'uuid2'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10000)
  @IsUUID('4', { each: true })
  readonly userIds!: readonly string[];

  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: CATEGORY_VALUES })
  @IsEnum(CATEGORY_VALUES)
  readonly category!: string;

  @ApiProperty({ enum: CHANNEL_VALUES, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsEnum(CHANNEL_VALUES, { each: true })
  readonly channels!: readonly string[];

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  readonly subject!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(50000)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly scheduledAt?: string;
}

// ═══════════════ Cancel ═══════════════
export class CancelNotificationHttpDTO {
  @ApiPropertyOptional({ example: 'Customer requested cancellation' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly cancelledBy?: string;
}

// ═══════════════ Mark read ═══════════════
export class MarkNotificationsReadHttpDTO {
  @ApiProperty({ isArray: true, example: ['uuid1', 'uuid2'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsUUID('4', { each: true })
  readonly notificationIds!: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly readAt?: string;
}

export class MarkNotificationsUnreadHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  @IsUUID('4', { each: true })
  readonly notificationIds!: readonly string[];
}

// ═══════════════ Resend ═══════════════
export class ResendNotificationHttpDTO {
  @ApiPropertyOptional({ enum: CHANNEL_VALUES, isArray: true })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsEnum(CHANNEL_VALUES, { each: true })
  readonly channels?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly forceResend?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

// ═══════════════ List query ═══════════════
export class ListNotificationsHttpQueryDTO {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number;

  @ApiPropertyOptional({ example: 20, default: 20, maximum: 100 })
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly isRead?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  readonly toDate?: string;
}
