import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ANALYTICS_AGGREGATION,
  ANALYTICS_INTERVAL,
  ANALYTICS_METRIC,
} from '@vubon/shared-constants/platform/analytics';

export class QueryMetricRequestDTO {
  @ApiProperty({
    example: ['users', 'sessions'],
    enum: Object.values(ANALYTICS_METRIC),
    isArray: true,
  })
  metricNames!: string[];

  @ApiPropertyOptional({ example: '2026-09-01T00:00:00Z' })
  fromDate?: string;

  @ApiPropertyOptional({ example: '2026-09-30T23:59:59Z' })
  toDate?: string;

  @ApiPropertyOptional({ example: ['country', 'device'], isArray: true })
  dimensions?: string[];

  @ApiPropertyOptional()
  filters?: readonly {
    readonly field: string;
    readonly operator: string;
    readonly value: string | number | boolean | readonly string[];
  }[];
}

export class AggregateMetricRequestDTO {
  @ApiProperty({ example: ['users'], isArray: true })
  metricNames!: string[];

  @ApiProperty({
    example: 'sum',
    enum: Object.values(ANALYTICS_AGGREGATION),
  })
  aggregation!: string;

  @ApiPropertyOptional({
    example: 'day',
    enum: Object.values(ANALYTICS_INTERVAL),
  })
  interval?: string;

  @ApiProperty({ example: '2026-09-01T00:00:00Z' })
  fromDate!: string;

  @ApiProperty({ example: '2026-09-30T23:59:59Z' })
  toDate!: string;

  @ApiPropertyOptional({ example: ['country'], isArray: true })
  groupBy?: string[];

  @ApiPropertyOptional({ example: 1000 })
  limit?: number;
}
