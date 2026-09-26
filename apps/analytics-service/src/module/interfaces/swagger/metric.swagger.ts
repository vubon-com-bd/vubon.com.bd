import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  QueryMetricRequestDTO,
  AggregateMetricRequestDTO,
} from '../dtos/requests';
import {
  MetricResponseDTO,
  MetricAggregationResponseDTO,
  TimeSeriesResponseDTO,
} from '../dtos/responses';

export const MetricSwagger = {
  Tag: () => ApiTags('Analytics — Metrics'),

  Query: () =>
    applyDecorators(
      ApiOperation({ summary: 'Query metrics with filters' }),
      ApiBody({ type: QueryMetricRequestDTO }),
      ApiResponse({ status: 200, type: [MetricResponseDTO] }),
    ),

  Aggregate: () =>
    applyDecorators(
      ApiOperation({ summary: 'Aggregate metrics (sum, avg, min, max, ...)' }),
      ApiBody({ type: AggregateMetricRequestDTO }),
      ApiResponse({ status: 200, type: [MetricAggregationResponseDTO] }),
    ),

  TimeSeries: () =>
    applyDecorators(
      ApiOperation({ summary: 'Query a metric as a time-series' }),
      ApiQuery({ name: 'metricName', required: true, type: String }),
      ApiQuery({ name: 'interval', required: true, type: String }),
      ApiResponse({ status: 200, type: TimeSeriesResponseDTO }),
    ),
};
