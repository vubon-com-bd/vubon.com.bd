/**
 * Metric Swagger Documentation
 */
import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MetricResponseDto, MetricAggregationResponseDto } from '../dtos/responses/metric.response.dto.js';

export const ApiMetricTag = (): MethodDecorator & ClassDecorator =>
  ApiTags('Analytics — Metrics');

export const ApiGetMetric = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Get metric by ID' }),
    ApiResponse({ status: HttpStatus.OK, type: MetricResponseDto }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Metric not found' })
  );

export const ApiQueryMetric = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({ summary: 'Query metric over a period' }),
    ApiResponse({ status: HttpStatus.OK, type: MetricAggregationResponseDto }),
    ApiResponse({
      status: HttpStatus.UNPROCESSABLE_ENTITY,
      description: 'Invalid query',
    })
  );

export const ApiAggregateMetric = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: 'Aggregate a metric (sum, avg, min, max, count)',
      description: 'Analytics aggregation — uses OLAP backend when available.',
    }),
    ApiResponse({ status: HttpStatus.OK, type: MetricAggregationResponseDto }),
    ApiResponse({
      status: HttpStatus.REQUEST_TIMEOUT,
      description: 'Query timed out',
    })
  );
