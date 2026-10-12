/**
 * KPI Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface KpiResponseData {
  readonly id: string;
  readonly name: string;
  readonly metric: string;
  readonly target: number;
  readonly thresholdPercent: number;
  readonly higherIsBetter: boolean;
  readonly isActive: boolean;
  readonly lastActualValue?: number;
  readonly lastEvaluatedAt?: string;
}

export class KpiResponseDTO extends BaseResponseDTO<KpiResponseData> {
  static of(data: KpiResponseData, message?: string): KpiResponseDTO {
    return BaseResponseDTO.ok(data, message) as KpiResponseDTO;
  }
}
