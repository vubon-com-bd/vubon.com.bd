/**
 * Time Series Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface TimeSeriesPointData {
  readonly timestamp: number;
  readonly value: number;
}

export interface TimeSeriesResponseData {
  readonly metric: string;
  readonly aggregation: string;
  readonly granularity: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly points: readonly TimeSeriesPointData[];
  readonly total: number;
  readonly average: number;
}

export class TimeSeriesResponseDTO extends BaseResponseDTO<TimeSeriesResponseData> {
  static of(data: TimeSeriesResponseData, message?: string): TimeSeriesResponseDTO {
    return BaseResponseDTO.ok(data, message) as TimeSeriesResponseDTO;
  }
}
