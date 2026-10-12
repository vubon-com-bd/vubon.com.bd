/**
 * Funnel Analysis Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface FunnelAnalysisResponseData {
  readonly funnelId: string;
  readonly stepCounts: readonly number[];
  readonly entryCount: number;
  readonly finalCount: number;
  readonly overallConversionRate: number;
  readonly averageStepConversion: number;
  readonly biggestDropOffStep: number;
  readonly criticalSteps: readonly string[];
  readonly recommendations: readonly string[];
}

export class FunnelAnalysisResponseDTO extends BaseResponseDTO<FunnelAnalysisResponseData> {
  static of(data: FunnelAnalysisResponseData, message?: string): FunnelAnalysisResponseDTO {
    return BaseResponseDTO.ok(data, message) as FunnelAnalysisResponseDTO;
  }
}
