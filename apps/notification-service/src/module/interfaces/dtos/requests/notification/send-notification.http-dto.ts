/**
 * Notification send HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/notification
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  NOTIFICATION_TYPE,
  NOTIFICATION_CATEGORY,
  NOTIFICATION_CHANNEL,
  NOTIFICATION_PRIORITY,
  NOTIFICATION_ACTION,
  NOTIFICATION_ACTION_TYPE,
  NOTIFICATION_LIMIT,
} from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(NOTIFICATION_TYPE) as string[];
const CATEGORY_VALUES = Object.values(NOTIFICATION_CATEGORY) as string[];
const CHANNEL_VALUES = Object.values(NOTIFICATION_CHANNEL) as string[];
const PRIORITY_VALUES = Object.values(NOTIFICATION_PRIORITY) as string[];
const ACTION_VALUES = Object.values(NOTIFICATION_ACTION) as string[];
const ACTION_TYPE_VALUES = Object.values(NOTIFICATION_ACTION_TYPE) as string[];

export class NotificationActionInputHttpDTO {
  @ApiProperty({ enum: ACTION_VALUES, example: 'view' })
  @IsEnum(ACTION_VALUES)
  readonly action!: string;

  @ApiProperty({ enum: ACTION_TYPE_VALUES, example: 'primary' })
  @IsEnum(ACTION_TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ example: 'View Order' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly label!: string;

  @ApiPropertyOptional({ example: 'https://vubon.com.bd/orders/123' })
  @IsOptional()
  @IsString()
  readonly url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly payload?: Readonly<Record<string, unknown>>;
}

export class NotificationReferenceHttpDTO {
  @ApiProperty({ example: 'order' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly type!: string;

  @ApiProperty({ example: '7c9e6679-7425-40de-944b-e07fc1f90ae7' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly id!: string;

  @ApiPropertyOptional({ example: 'https://vubon.com.bd/orders/123' })
  @IsOptional()
  @IsUrl()
  readonly url?: string;
}

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

  @ApiProperty({
    enum: CHANNEL_VALUES,
    isArray: true,
    example: ['email', 'push'],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsEnum(CHANNEL_VALUES, { each: true })
  readonly channels!: readonly string[];

  @ApiPropertyOptional({ enum: PRIORITY_VALUES, example: 'normal' })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiProperty({ example: 'Your order has been confirmed' })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  readonly title!: string;

  @ApiProperty({ example: 'Order #12345 is confirmed and will ship within 24h.' })
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly iconUrl?: string;

  @ApiPropertyOptional({ type: [NotificationActionInputHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => NotificationActionInputHttpDTO)
  readonly actions?: readonly NotificationActionInputHttpDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional({ example: '2026-10-11T09:00:00.000Z' })
  @IsOptional()
  @IsISO8601()
  readonly scheduledAt?: string;

  @ApiPropertyOptional({ example: '2026-11-11T09:00:00.000Z' })
  @IsOptional()
  @IsISO8601()
  readonly expiresAt?: string;

  @ApiPropertyOptional({ type: NotificationReferenceHttpDTO })
  @IsOptional()
  @ValidateNested()
  @Type(() => NotificationReferenceHttpDTO)
  readonly reference?: NotificationReferenceHttpDTO;
}

export class SendNotificationToManyHttpDTO {
  @ApiProperty({ example: ['uuid1', 'uuid2'], maxItems: NOTIFICATION_LIMIT.MAX_RECIPIENTS })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10_000)
  @IsUUID('all', { each: true })
  readonly userIds!: readonly string[];

  @ApiProperty({ enum: TYPE_VALUES, example: 'announcement' })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ enum: CATEGORY_VALUES, example: 'system' })
  @IsEnum(CATEGORY_VALUES)
  readonly category!: string;

  @ApiProperty({ enum: CHANNEL_VALUES, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
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
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly iconUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly data?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly scheduledAt?: string;
}

export class ScheduleNotificationHttpDTO extends SendNotificationHttpDTO {
  @ApiProperty({ example: '2026-10-11T09:00:00.000Z' })
  @IsISO8601()
  declare readonly scheduledAt: string;
}
