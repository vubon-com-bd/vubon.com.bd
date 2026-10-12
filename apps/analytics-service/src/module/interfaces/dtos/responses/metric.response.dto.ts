/**
 * Metric Response DTOs
 */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { MetricResponseData } from '../../../application/dtos/responses/metric-response.dto.js';
import type { MetricAggregationResponseData } from '../../../application/dtos/responses/metric-aggregation-response.dto.js';

export class MetricResponseDto implements MetricResponseData {
  @ApiProperty()
  id!: string;

  @ApiProperty({ example: 'users' })
  name!: string;

  @ApiProperty({ example: 15234.5 })
  value!: number;

  @ApiProperty({ example: 'count' })
  unit!: string;

  @ApiProperty({ example: 'counter' })
  type!: string;

  @ApiProperty({ example: 100 })
  sampleCount!: number;

  @ApiPropertyOptional()
  min?: number;

  @ApiPropertyOptional()
  max?: number;
}

export class MetricAggregationResponseDto implements MetricAggregationResponseData {
  @ApiProperty()
  metric!: string;

  @ApiProperty({ example: 'sum' })
  aggregation!: string;

  @ApiProperty({ example: 45230.75 })
  value!: number;

  @ApiPropertyOptional()
  sampleCount?: number;

  @ApiProperty()
  fromDate!: string;

  @ApiProperty()
  toDate!: string;

  @ApiPropertyOptional()
  granularity?: string;
}
