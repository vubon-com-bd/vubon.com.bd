import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ANALYTICS_REPORT_FORMAT,
  ANALYTICS_REPORT_TYPE,
  ANALYTICS_REPORT_FREQUENCY,
} from '@vubon/shared-constants/platform/analytics';

export class CreateReportRequestDTO {
  @ApiProperty({
    example: 'revenue',
    enum: Object.values(ANALYTICS_REPORT_TYPE),
  })
  type!: string;

  @ApiProperty({
    example: 'json',
    enum: Object.values(ANALYTICS_REPORT_FORMAT),
  })
  format!: string;

  @ApiProperty({ example: 'user-123' })
  ownerId!: string;
}

export class GenerateReportRequestDTO {
  @ApiProperty({ example: '2026-09-01T00:00:00Z' })
  fromDate!: string;

  @ApiProperty({ example: '2026-09-30T23:59:59Z' })
  toDate!: string;

  @ApiPropertyOptional()
  filters?: Record<string, unknown>;
}

export class ScheduleReportRequestDTO {
  @ApiProperty({
    example: 'weekly',
    enum: Object.values(ANALYTICS_REPORT_FREQUENCY),
  })
  frequency!: string;

  @ApiPropertyOptional({ example: '0 9 * * 1' })
  cronExpression?: string;

  @ApiPropertyOptional({ example: ['admin@vubon.com'], isArray: true })
  recipients?: string[];
}

export class ExportReportRequestDTO {
  @ApiProperty({
    example: 'csv',
    enum: Object.values(ANALYTICS_REPORT_FORMAT),
  })
  format!: string;

  @ApiPropertyOptional({ example: 'monthly-report' })
  filename?: string;
}
