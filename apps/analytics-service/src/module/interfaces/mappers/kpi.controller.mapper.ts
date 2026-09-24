import { Injectable } from '@nestjs/common';
import type {
  KpiResponseDTO as AppKpiDTO,
  KpiResultResponseDTO as AppKpiResultDTO,
} from '../../application/dtos/responses';
import type {
  KpiResponseDTO,
  KpiResultResponseDTO,
} from '../dtos/responses';

@Injectable()
export class KpiControllerMapper {
  toKpiResponse(appDto: AppKpiDTO): KpiResponseDTO {
    return {
      kpiId: appDto.kpiId,
      name: appDto.name,
      metricName: appDto.metricName,
      target: appDto.target,
      threshold: appDto.threshold,
      createdAt: appDto.createdAt,
    };
  }

  toKpiResultResponse(appDto: AppKpiResultDTO): KpiResultResponseDTO {
    return {
      kpiId: appDto.kpiId,
      actual: appDto.actual,
      target: appDto.target,
      achievementPercent: appDto.achievementPercent,
      variance: appDto.variance,
      isAchieved: appDto.isAchieved,
      isBreached: appDto.isBreached,
      status: appDto.status,
      evaluatedAt: appDto.evaluatedAt,
    };
  }
}
