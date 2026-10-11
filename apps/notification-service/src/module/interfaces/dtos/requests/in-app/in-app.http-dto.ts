/**
 * In-App notification HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/in-app
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
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
  IN_APP_TYPE,
  IN_APP_POSITION,
} from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(IN_APP_TYPE) as string[];
const POSITION_VALUES = Object.values(IN_APP_POSITION) as string[];

export class InAppActionHttpDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  readonly id!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  readonly label!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  readonly action?: string;
}

export class SendInAppHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiPropertyOptional({ enum: POSITION_VALUES })
  @IsOptional()
  @IsEnum(POSITION_VALUES)
  readonly position?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly title!: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  readonly body!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly iconUrl?: string;

  @ApiPropertyOptional({ type: [InAppActionHttpDTO] })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  @Type(() => InAppActionHttpDTO)
  readonly actions?: readonly InAppActionHttpDTO[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(60)
  readonly displayDurationSeconds?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly autoDismiss?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly expiresAt?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly data?: Readonly<Record<string, unknown>>;
}

export class InAppInboxHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly unreadOnly?: boolean;

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
}

export class MarkInAppReadHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;
}

export class DismissInAppHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;
}

export class InAppClickHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly actionId?: string;
}
