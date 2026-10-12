/**
 * Report Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type {
  CreateReportDto,
  GenerateReportDto,
  ScheduleReportDto,
  ExportReportDto,
} from '../../../application/dtos/requests/report/index.js';

export class CreateReportRequestDto implements CreateReportDto {
  @ApiProperty({ example: 'Q1 Sales Report' })
  name!: string;

  @ApiProperty({ example: 'overview' })
  type!: string;

  @ApiProperty({ example: 'csv', enum: ['json', 'csv', 'xlsx', 'pdf', 'html'] })
  format!: string;

  @ApiProperty({ example: 'monthly' })
  frequency!: string;

  @ApiPropertyOptional()
  fromDate?: string;

  @ApiPropertyOptional()
  toDate?: string;

  @ApiPropertyOptional({ type: Object })
  filters?: Record<string, unknown>;

  @ApiPropertyOptional()
  description?: string;
}

export class GenerateReportRequestDto implements GenerateReportDto {
  @ApiPropertyOptional()
  fromDate?: string;

  @ApiPropertyOptional()
  toDate?: string;

  @ApiPropertyOptional({ type: Object })
  filters?: Record<string, unknown>;

  @ApiPropertyOptional({ default: false })
  force?: boolean;
}

export class ScheduleReportRequestDto implements ScheduleReportDto {
  @ApiProperty({ example: 'weekly' })
  frequency!: string;

  @ApiPropertyOptional()
  startAt?: string;

  @ApiPropertyOptional({ default: 'UTC' })
  timezone?: string;

  @ApiPropertyOptional({ type: [String] })
  recipients?: string[];
}

export class ExportReportRequestDto implements ExportReportDto {
  @ApiProperty({ example: 'csv' })
  format!: string;

  @ApiPropertyOptional({ default: true })
  includeTotals?: boolean;

  @ApiPropertyOptional({ default: true })
  maskPii?: boolean;

  @ApiPropertyOptional({ default: false })
  compress?: boolean;

  @ApiPropertyOptional({ default: 10000 })
  rowLimit?: number;
}
