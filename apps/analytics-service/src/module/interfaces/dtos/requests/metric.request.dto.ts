/**
 * Metric Request DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { QueryMetricDto, AggregateMetricDto } from '../../../application/dtos/requests/metric/index.js';

export class QueryMetricRequestDto implements QueryMetricDto {
  @ApiProperty({ description: 'Metric name', example: 'users' })
  metric!: string;

  @ApiProperty({ description: 'Period', example: 'last_30_days' })
  period!: string;

  @ApiPropertyOptional({ description: 'From date (ISO 8601)' })
  fromDate?: string;

  @ApiPropertyOptional({ description: 'To date (ISO 8601)' })
  toDate?: string;

  @ApiPropertyOptional({ type: [String], description: 'Dimensions to group by' })
  dimensions?: string[];
}

export class AggregateMetricRequestDto implements AggregateMetricDto {
  @ApiProperty({ description: 'Metric name' })
  metric!: string;

  @ApiProperty({ description: 'Aggregation type', example: 'sum' })
  aggregation!: string;

  @ApiProperty({ description: 'Period' })
  period!: string;

  @ApiPropertyOptional({ description: 'From date' })
  fromDate?: string;

  @ApiPropertyOptional({ description: 'To date' })
  toDate?: string;

  @ApiPropertyOptional({ type: [String] })
  dimensions?: string[];

  @ApiPropertyOptional({ description: 'Filters' })
  filters?: Record<string, unknown>;
}
