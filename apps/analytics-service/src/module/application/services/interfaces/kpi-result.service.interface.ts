import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { KpiResultEntity } from '../../../domain/entities/kpi-result.entity';

export interface KpiResultServiceInterface
  extends BaseServiceInterface<KpiResultEntity, string> {
  findByKpiId(kpiId: string): Promise<readonly KpiResultEntity[]>;
}
