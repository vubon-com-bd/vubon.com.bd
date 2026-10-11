/**
 * Notification update HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/notification
 */
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NOTIFICATION_PRIORITY } from '@vubon/shared-constants/platform/notification';

const PRIORITY_VALUES = Object.values(NOTIFICATION_PRIORITY) as string[];

export class UpdateNotificationHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  readonly title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  readonly body?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly iconUrl?: string;

  @ApiPropertyOptional({ enum: PRIORITY_VALUES })
  @IsOptional()
  @IsEnum(PRIORITY_VALUES)
  readonly priority?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly scheduledAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly expiresAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  readonly data?: Readonly<Record<string, unknown>>;
}

export class CancelNotificationHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class DeleteNotificationHttpDTO {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  readonly softDelete?: boolean;
}

export class RetryNotificationHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly force?: boolean;
}
