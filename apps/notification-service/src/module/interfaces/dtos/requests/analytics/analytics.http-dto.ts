/**
 * Analytics HTTP DTOs
 * @module notification-service/interfaces/dtos/requests/analytics
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class AnalyticsOverviewHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiProperty({ example: '2026-10-01T00:00:00.000Z' })
  @IsISO8601()
  readonly fromDate!: string;

  @ApiProperty({ example: '2026-10-11T00:00:00.000Z' })
  @IsISO8601()
  readonly toDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly channel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly category?: string;
}

export class AnalyticsTimeSeriesHttpQueryDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;

  @ApiProperty()
  @IsISO8601()
  readonly fromDate!: string;

  @ApiProperty()
  @IsISO8601()
  readonly toDate!: string;

  @ApiProperty({ enum: ['hour', 'day', 'week', 'month'] })
  @IsEnum(['hour', 'day', 'week', 'month'])
  readonly interval!: 'hour' | 'day' | 'week' | 'month';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly channel?: string;
}

export class ChannelPerformanceHttpQueryDTO {
  @ApiProperty()
  @IsISO8601()
  readonly fromDate!: string;

  @ApiProperty()
  @IsISO8601()
  readonly toDate!: string;
}

export class GenerateReportHttpDTO {
  @ApiProperty({ example: 'delivery' })
  @IsString()
  readonly reportType!: string;

  @ApiProperty({ enum: ['pdf', 'csv', 'xlsx', 'json', 'html'] })
  @IsEnum(['pdf', 'csv', 'xlsx', 'json', 'html'])
  readonly format!: 'pdf' | 'csv' | 'xlsx' | 'json' | 'html';

  @ApiProperty()
  @IsISO8601()
  readonly fromDate!: string;

  @ApiProperty()
  @IsISO8601()
  readonly toDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  readonly userId?: string;
}
