/**
 * Funnel Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface FunnelStepData {
  readonly stepName: string;
  readonly stepOrder: number;
  readonly userCount: number;
  readonly dropOff: number;
  readonly dropOffRate: number;
  readonly conversionRate: number;
}

export interface FunnelResponseData {
  readonly id: string;
  readonly name: string;
  readonly stepCount: number;
  readonly isActive: boolean;
  readonly lastAnalyzedAt?: string;
  readonly steps?: readonly FunnelStepData[];
}

export class FunnelResponseDTO extends BaseResponseDTO<FunnelResponseData> {
  static of(data: FunnelResponseData, message?: string): FunnelResponseDTO {
    return BaseResponseDTO.ok(data, message) as FunnelResponseDTO;
  }
}
