/**
 * Digest HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/digest
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
  Min,
} from 'class-validator';
import {
  NOTIFICATION_DIGEST_FREQUENCY,
  NOTIFICATION_DIGEST_TYPE,
} from '@vubon/shared-constants/platform/notification';

const FREQ_VALUES = Object.values(NOTIFICATION_DIGEST_FREQUENCY) as string[];
const TYPE_VALUES = Object.values(NOTIFICATION_DIGEST_TYPE) as string[];

export class CreateDigestHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ enum: FREQ_VALUES })
  @IsEnum(FREQ_VALUES)
  readonly frequency!: string;

  @ApiProperty({ enum: TYPE_VALUES })
  @IsEnum(TYPE_VALUES)
  readonly type!: string;

  @ApiProperty({ example: '2026-10-04T00:00:00.000Z' })
  @IsISO8601()
  readonly periodStart!: string;

  @ApiProperty({ example: '2026-10-11T00:00:00.000Z' })
  @IsISO8601()
  readonly periodEnd!: string;

  @ApiPropertyOptional({ isArray: true })
  @IsOptional()
  readonly itemIds?: readonly string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly channel?: string;
}

export class UpdateDigestHttpDTO {
  @ApiPropertyOptional({ enum: FREQ_VALUES })
  @IsOptional()
  @IsEnum(FREQ_VALUES)
  readonly frequency?: string;

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;
}

export class GenerateDigestHttpDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ enum: FREQ_VALUES })
  @IsEnum(FREQ_VALUES)
  readonly frequency!: string;

  @ApiPropertyOptional({ enum: TYPE_VALUES })
  @IsOptional()
  @IsEnum(TYPE_VALUES)
  readonly type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly periodStart?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly periodEnd?: string;
}

export class SendDigestHttpDTO {
  @ApiProperty({ example: 'email' })
  @IsString()
  readonly channel!: string;
}

export class DigestPreviewHttpQueryDTO {
  @ApiProperty()
  @IsUUID()
  readonly userId!: string;

  @ApiProperty({ enum: FREQ_VALUES })
  @IsEnum(FREQ_VALUES)
  readonly frequency!: string;
}

export class ListDigestsHttpQueryDTO {
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiPropertyOptional({ enum: FREQ_VALUES })
  @IsOptional()
  @IsEnum(FREQ_VALUES)
  readonly frequency?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  readonly toDate?: string;
}
