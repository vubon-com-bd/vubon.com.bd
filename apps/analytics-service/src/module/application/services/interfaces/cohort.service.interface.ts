/**
 * Cohort Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { CohortEntity } from '../../../domain/entities/cohort.entity.js';
import type { CreateCohortDto } from '../../dtos/requests/cohort/create-cohort.dto.js';
import type { CohortResponseData } from '../../dtos/responses/cohort-response.dto.js';
import type { CohortAnalysisResponseData } from '../../dtos/responses/cohort-analysis-response.dto.js';

export interface ICohortService extends BaseServiceInterface<CohortEntity, string> {
  create(input: CreateCohortDto): Promise<CohortResponseData>;
  analyze(id: string, maxPeriods: number): Promise<CohortAnalysisResponseData>;
  findById(id: string): Promise<CohortResponseData | null>;
  listActive(): Promise<readonly CohortResponseData[]>;
  activate(id: string): Promise<void>;
  deactivate(id: string): Promise<void>;
}
