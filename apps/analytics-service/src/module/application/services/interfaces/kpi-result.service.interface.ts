/**
 * KPI Result Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { KpiResultEntity } from '../../../domain/entities/kpi-result.entity.js';

export interface IKpiResultService extends BaseServiceInterface<KpiResultEntity, string> {
  findByKpiId(kpiId: string): Promise<readonly KpiResultEntity[]>;
  findLatestByKpi(kpiId: string): Promise<KpiResultEntity | null>;
  findBreached(limit: number): Promise<readonly KpiResultEntity[]>;
}
