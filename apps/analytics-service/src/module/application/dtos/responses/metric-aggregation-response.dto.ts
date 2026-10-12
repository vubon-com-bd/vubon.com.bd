/**
 * Metric Aggregation Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface MetricAggregationResponseData {
  readonly metric: string;
  readonly aggregation: string;
  readonly value: number;
  readonly sampleCount?: number;
  readonly fromDate: string;
  readonly toDate: string;
  readonly granularity?: string;
}

export class MetricAggregationResponseDTO extends BaseResponseDTO<MetricAggregationResponseData> {
  static of(data: MetricAggregationResponseData, message?: string): MetricAggregationResponseDTO {
    return BaseResponseDTO.ok(data, message) as MetricAggregationResponseDTO;
  }
}
