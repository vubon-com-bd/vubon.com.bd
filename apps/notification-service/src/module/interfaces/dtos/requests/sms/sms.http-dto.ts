/**
 * SMS HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/sms
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SMS_TYPE, SMS_PROVIDER } from '@vubon/shared-constants/platform/notification';

const TYPE_VALUES = Object.values(SMS_TYPE) as string[];
const PROVIDER_VALUES = Object.values(SMS_PROVIDER) as string[];

export class SendSmsHttpDTO {
  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  readonly to!: string | readonly string[];

  @ApiProperty({ example: 'Your OTP is 123456' })
  @IsString()
  @MinLength(1)
  @MaxLength(1600)
  readonly message!: string;

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(11)
  readonly senderId?: string;

  @ApiPropertyOptional({ enum: PROVIDER_VALUES })
  @IsOptional()
  @IsEnum(PROVIDER_VALUES)
  readonly provider?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly templateId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly templateData?: Readonly<Record<string, unknown>>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(8)
  readonly idempotencyKey?: string;
}

export class SendBulkSmsHttpDTO {
  @ApiProperty({ isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10_000)
  @IsString({ each: true })
  readonly recipients!: readonly string[];

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(1600)
  readonly message!: string;

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly senderId?: string;

  @ApiPropertyOptional({ enum: PROVIDER_VALUES })
  @IsOptional()
  @IsEnum(PROVIDER_VALUES)
  readonly provider?: string;
}

export class ListSmsHttpQueryDTO {
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
  @IsString()
  readonly to?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly provider?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly toDate?: string;
}
