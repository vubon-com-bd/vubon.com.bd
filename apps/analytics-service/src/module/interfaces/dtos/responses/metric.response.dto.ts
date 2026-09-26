import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MetricResponseDTO {
  @ApiProperty()
  metricId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  unit!: string;

  @ApiProperty()
  type!: string;

  @ApiPropertyOptional()
  windowStartMs?: number;

  @ApiPropertyOptional()
  windowEndMs?: number;

  @ApiProperty()
  createdAt!: string;
}

export class MetricAggregationResponseDTO {
  @ApiProperty()
  aggregation!: string;

  @ApiProperty()
  value!: number;

  @ApiProperty()
  unit!: string;

  @ApiProperty()
  sampleSize!: number;

  @ApiProperty({ enum: ['low', 'medium', 'high'] })
  confidenceLevel!: 'low' | 'medium' | 'high';

  @ApiProperty()
  isReliable!: boolean;
}

export class TimeSeriesPointDTO {
  @ApiProperty()
  bucketMs!: number;

  @ApiProperty()
  value!: number;
}

export class TimeSeriesResponseDTO {
  @ApiProperty()
  metricName!: string;

  @ApiProperty()
  interval!: string;

  @ApiProperty({ type: [TimeSeriesPointDTO] })
  points!: TimeSeriesPointDTO[];

  @ApiProperty()
  sum!: number;

  @ApiProperty()
  avg!: number;

  @ApiProperty()
  min!: number;

  @ApiProperty()
  max!: number;

  @ApiProperty()
  pointCount!: number;
}
