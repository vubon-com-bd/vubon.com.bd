/**
 * KPI Result Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface KpiResultResponseData {
  readonly kpiId: string;
  readonly kpiName: string;
  readonly actual: number;
  readonly target: number;
  readonly achievementPercent: number;
  readonly status: string;
  readonly requiresAlert: boolean;
  readonly evaluatedAt: string;
}

export class KpiResultResponseDTO extends BaseResponseDTO<KpiResultResponseData> {
  static of(data: KpiResultResponseData, message?: string): KpiResultResponseDTO {
    return BaseResponseDTO.ok(data, message) as KpiResultResponseDTO;
  }
}
