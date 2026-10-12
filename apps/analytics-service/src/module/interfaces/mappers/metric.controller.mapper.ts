/**
 * Metric Controller Mapper
 */
import type { MetricResponseData } from '../../application/dtos/responses/metric-response.dto.js';
import type { MetricAggregationResponseData } from '../../application/dtos/responses/metric-aggregation-response.dto.js';
import {
  MetricResponseDto,
  MetricAggregationResponseDto,
} from '../dtos/responses/metric.response.dto.js';

export class MetricControllerMapper {
  static toHttp(data: MetricResponseData): MetricResponseDto {
    const dto = new MetricResponseDto();
    dto.id = data.id;
    dto.name = data.name;
    dto.value = data.value;
    dto.unit = data.unit;
    dto.type = data.type;
    dto.sampleCount = data.sampleCount;
    dto.min = data.min;
    dto.max = data.max;
    return dto;
  }

  static aggregationToHttp(data: MetricAggregationResponseData): MetricAggregationResponseDto {
    const dto = new MetricAggregationResponseDto();
    dto.metric = data.metric;
    dto.aggregation = data.aggregation;
    dto.value = data.value;
    dto.sampleCount = data.sampleCount;
    dto.fromDate = data.fromDate;
    dto.toDate = data.toDate;
    dto.granularity = data.granularity;
    return dto;
  }

  static toHttpList(data: readonly MetricResponseData[]): MetricResponseDto[] {
    return data.map((d) => MetricControllerMapper.toHttp(d));
  }
}
