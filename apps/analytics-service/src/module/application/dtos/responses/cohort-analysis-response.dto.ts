/**
 * Cohort Analysis Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface CohortAnalysisResponseData {
  readonly cohortId: string;
  readonly cohortSize: number;
  readonly retentionRates: readonly number[];
  readonly retention1: number;
  readonly retention7: number;
  readonly retention30: number;
  readonly decayRate: number;
  readonly longTermRetention: number;
  readonly isHealthy: boolean;
}

export class CohortAnalysisResponseDTO extends BaseResponseDTO<CohortAnalysisResponseData> {
  static of(data: CohortAnalysisResponseData, message?: string): CohortAnalysisResponseDTO {
    return BaseResponseDTO.ok(data, message) as CohortAnalysisResponseDTO;
  }
}
