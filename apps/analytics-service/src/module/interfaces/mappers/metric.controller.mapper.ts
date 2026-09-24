import { Injectable } from '@nestjs/common';
import type {
  MetricResponseDTO as AppMetricDTO,
  MetricAggregationResponseDTO as AppAggDTO,
  TimeSeriesResponseDTO as AppTimeSeriesDTO,
} from '../../application/dtos/responses';
import type {
  MetricResponseDTO,
  MetricAggregationResponseDTO,
  TimeSeriesResponseDTO,
} from '../dtos/responses';

@Injectable()
export class MetricControllerMapper {
  toMetricResponse(appDto: AppMetricDTO): MetricResponseDTO {
    return {
      metricId: appDto.metricId,
      name: appDto.name,
      value: appDto.value,
      unit: appDto.unit,
      type: appDto.type,
      windowStartMs: appDto.window?.startMs,
      windowEndMs: appDto.window?.endMs,
      createdAt: appDto.createdAt,
    };
  }

  toAggregationResponse(
    appDto: AppAggDTO,
  ): MetricAggregationResponseDTO {
    return {
      aggregation: appDto.aggregation,
      value: appDto.value,
      unit: appDto.unit,
      sampleSize: appDto.sampleSize,
      confidenceLevel: appDto.confidenceLevel,
      isReliable: appDto.isReliable,
    };
  }

  toTimeSeriesResponse(appDto: AppTimeSeriesDTO): TimeSeriesResponseDTO {
    return {
      metricName: appDto.metricName,
      interval: appDto.interval,
      points: appDto.points.map((p) => ({ bucketMs: p.bucketMs, value: p.value })),
      sum: appDto.sum,
      avg: appDto.avg,
      min: appDto.min,
      max: appDto.max,
      pointCount: appDto.pointCount,
    };
  }
}
