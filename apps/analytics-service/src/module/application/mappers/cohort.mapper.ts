import { Injectable } from '@nestjs/common';
import { CohortEntity } from '../../domain/entities/cohort.entity';
import { CohortAnalysisVO } from '../../domain/value-objects/composites/cohort-analysis.vo';
import type {
  CohortResponseDTO,
  CohortAnalysisResponseDTO,
} from '../dtos/responses';
import {
  toCohortResponse,
  toCohortAnalysisResponse,
} from '../dtos/responses';

@Injectable()
export class CohortMapper {
  toResponse(entity: CohortEntity): CohortResponseDTO {
    return toCohortResponse(entity);
  }

  analysisToResponse(vo: CohortAnalysisVO): CohortAnalysisResponseDTO {
    return toCohortAnalysisResponse(vo);
  }
}
