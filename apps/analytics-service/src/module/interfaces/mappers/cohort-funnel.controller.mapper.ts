import { Injectable } from '@nestjs/common';
import type {
  CohortResponseDTO as AppCohortDTO,
  CohortAnalysisResponseDTO as AppCohortAnalysisDTO,
  FunnelResponseDTO as AppFunnelDTO,
  FunnelAnalysisResponseDTO as AppFunnelAnalysisDTO,
} from '../../application/dtos/responses';
import type {
  CohortResponseDTO,
  CohortAnalysisResponseDTO,
  FunnelResponseDTO,
  FunnelAnalysisResponseDTO,
} from '../dtos/responses';

@Injectable()
export class CohortFunnelControllerMapper {
  toCohortResponse(appDto: AppCohortDTO): CohortResponseDTO {
    return {
      cohortId: appDto.cohortId,
      name: appDto.name,
      period: appDto.period,
      startDate: appDto.startDate,
      endDate: appDto.endDate,
      size: appDto.size,
      bucketKey: appDto.bucketKey,
      durationDays: appDto.durationDays,
    };
  }

  toCohortAnalysisResponse(
    appDto: AppCohortAnalysisDTO,
  ): CohortAnalysisResponseDTO {
    return {
      cohortId: appDto.cohortId,
      initialSize: appDto.initialSize,
      retainedSizes: [...appDto.retainedSizes],
      retentionRates: [...appDto.retentionRates],
      day1Retention: appDto.day1Retention,
      day7Retention: appDto.day7Retention,
      day30Retention: appDto.day30Retention,
      isHealthy: appDto.isHealthy,
    };
  }

  toFunnelResponse(appDto: AppFunnelDTO): FunnelResponseDTO {
    return {
      funnelId: appDto.funnelId,
      steps: [...appDto.steps],
      stepCount: appDto.stepCount,
      createdAt: appDto.createdAt,
    };
  }

  toFunnelAnalysisResponse(
    appDto: AppFunnelAnalysisDTO,
  ): FunnelAnalysisResponseDTO {
    return {
      funnelId: appDto.funnelId,
      steps: [...appDto.steps],
      counts: [...appDto.counts],
      conversionRates: [...appDto.conversionRates],
      dropOffRates: [...appDto.dropOffRates],
      initialCount: appDto.initialCount,
      finalCount: appDto.finalCount,
      overallConversionRate: appDto.overallConversionRate,
      biggestDropOffStepIndex: appDto.biggestDropOffStepIndex,
    };
  }
}
