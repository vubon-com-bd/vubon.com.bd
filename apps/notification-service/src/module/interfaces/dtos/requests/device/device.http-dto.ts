/**
 * Device HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/device
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
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
import { NOTIFICATION_DEVICE_TYPE } from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(NOTIFICATION_DEVICE_TYPE) as string[];

export class RegisterDeviceHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ enum: TYPE_VALUES, example: 'android' })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty()
  @IsString()
  @MinLength(16)
  @MaxLength(500)
  readonly token!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly platform?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly appVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly osVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly deviceName?: string;
}

export class UpdateDeviceHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(16)
  @MaxLength(500)
  readonly token?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  readonly appVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly osVersion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  readonly deviceName?: string;
}

export class RefreshDeviceTokenHttpDTO {
  @ApiProperty()
  @IsString()
  @MinLength(16)
  @MaxLength(500)
  readonly newToken!: string;
}

export class RemoveDeviceHttpDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly reason?: string;
}

export class BlockDeviceHttpDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(500)
  readonly reason!: string;
}

export class ListDevicesHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

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

  @ApiPropertyOptional({ enum: ['createdAt', 'lastActiveAt'] })
  @IsOptional()
  @IsString()
  readonly sortBy?: string;

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  readonly sortDir?: 'asc' | 'desc';
}
