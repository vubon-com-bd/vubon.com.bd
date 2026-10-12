/**
 * KPI Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { KpiEntity } from '../../../domain/entities/kpi.entity.js';
import type { CreateKpiDto } from '../../dtos/requests/kpi/create-kpi.dto.js';
import type { UpdateKpiDto } from '../../dtos/requests/kpi/update-kpi.dto.js';
import type { KpiResponseData } from '../../dtos/responses/kpi-response.dto.js';
import type { KpiResultResponseData } from '../../dtos/responses/kpi-result-response.dto.js';

export interface IKpiService extends BaseServiceInterface<KpiEntity, string> {
  create(input: CreateKpiDto): Promise<KpiResponseData>;
  update(id: string, input: UpdateKpiDto): Promise<KpiResponseData>;
  evaluate(id: string, actual: number): Promise<KpiResultResponseData>;
  findById(id: string): Promise<KpiResponseData | null>;
  listActive(): Promise<readonly KpiResponseData[]>;
  listAll(): Promise<readonly KpiResponseData[]>;
}
