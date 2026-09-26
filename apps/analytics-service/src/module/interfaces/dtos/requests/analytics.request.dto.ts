import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ANALYTICS_INTERVAL } from '@vubon/shared-constants/platform/analytics';

export class UserAnalyticsRequestDTO {
  @ApiProperty({ example: '2026-09-01T00:00:00Z' })
  fromDate!: string;

  @ApiProperty({ example: '2026-09-30T23:59:59Z' })
  toDate!: string;
}

export class TimeSeriesQueryRequestDTO {
  @ApiProperty({ example: 'users' })
  metricName!: string;

  @ApiProperty({
    example: 'day',
    enum: Object.values(ANALYTICS_INTERVAL),
  })
  interval!: string;

  @ApiProperty({ example: '2026-09-01T00:00:00Z' })
  fromDate!: string;

  @ApiProperty({ example: '2026-09-30T23:59:59Z' })
  toDate!: string;

  @ApiPropertyOptional({ example: true })
  fillGaps?: boolean;
}

export class RealTimeAnalyticsRequestDTO {
  @ApiPropertyOptional({ example: 5 })
  windowMinutes?: number;
}
