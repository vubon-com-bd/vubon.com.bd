/**
 * Metric Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface MetricResponseData {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly unit: string;
  readonly type: string;
  readonly sampleCount: number;
  readonly min?: number;
  readonly max?: number;
}

export class MetricResponseDTO extends BaseResponseDTO<MetricResponseData> {
  static of(data: MetricResponseData, message?: string): MetricResponseDTO {
    return BaseResponseDTO.ok(data, message) as MetricResponseDTO;
  }
}
