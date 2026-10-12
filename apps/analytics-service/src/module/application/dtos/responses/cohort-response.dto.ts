/**
 * Cohort Response DTO
 * @module analytics-service/application/dtos/responses
 */
import { BaseResponseDTO } from '@vubon/shared-kernel/application/dtos';

export interface CohortResponseData {
  readonly id: string;
  readonly name: string;
  readonly period: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly isActive: boolean;
  readonly bucketCount: number;
  readonly cohortSize?: number;
  readonly lastAnalyzedAt?: string;
}

export class CohortResponseDTO extends BaseResponseDTO<CohortResponseData> {
  static of(data: CohortResponseData, message?: string): CohortResponseDTO {
    return BaseResponseDTO.ok(data, message) as CohortResponseDTO;
  }
}
