/**
 * KPI Controller Mapper
 */
import type { KpiResponseData } from '../../application/dtos/responses/kpi-response.dto.js';
import type { KpiResultResponseData } from '../../application/dtos/responses/kpi-result-response.dto.js';
import {
  KpiResponseDto,
  KpiResultResponseDto,
} from '../dtos/responses/kpi.response.dto.js';

export class KpiControllerMapper {
  static toHttp(data: KpiResponseData): KpiResponseDto {
    const dto = new KpiResponseDto();
    dto.id = data.id;
    dto.name = data.name;
    dto.metric = data.metric;
    dto.target = data.target;
    dto.thresholdPercent = data.thresholdPercent;
    dto.higherIsBetter = data.higherIsBetter;
    dto.isActive = data.isActive;
    dto.lastActualValue = data.lastActualValue;
    dto.lastEvaluatedAt = data.lastEvaluatedAt;
    return dto;
  }

  static resultToHttp(data: KpiResultResponseData): KpiResultResponseDto {
    const dto = new KpiResultResponseDto();
    dto.kpiId = data.kpiId;
    dto.kpiName = data.kpiName;
    dto.actual = data.actual;
    dto.target = data.target;
    dto.achievementPercent = data.achievementPercent;
    dto.status = data.status;
    dto.requiresAlert = data.requiresAlert;
    dto.evaluatedAt = data.evaluatedAt;
    return dto;
  }

  static toHttpList(data: readonly KpiResponseData[]): KpiResponseDto[] {
    return data.map((d) => KpiControllerMapper.toHttp(d));
  }
}
