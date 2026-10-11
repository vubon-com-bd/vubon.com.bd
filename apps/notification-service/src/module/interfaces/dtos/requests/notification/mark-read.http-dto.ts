/**
 * Notification read-state HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/notification
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class MarkNotificationReadHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly notificationId!: string;

  @ApiProperty()
  @IsUUID()
  readonly userId!: string;
}

export class MarkNotificationsReadHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(500)
  @IsUUID('all', { each: true })
  readonly notificationIds!: readonly string[];

  @ApiProperty()
  @IsUUID()
  readonly userId!: string;
}

export class MarkAllReadHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly category?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly channel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;
}

export class ArchiveNotificationHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly notificationId!: string;

  @ApiProperty()
  @IsUUID()
  readonly userId!: string;
}

export class SnoozeNotificationHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly notificationId!: string;

  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ example: '2026-10-11T09:00:00.000Z' })
  @IsISO8601()
  readonly snoozedUntil!: string;
}

export class StarNotificationHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly notificationId!: string;

  @ApiProperty()
  @IsUUID()
  readonly userId!: string;
}
