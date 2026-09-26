import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { KpiEntity } from '../../../domain/entities/kpi.entity';
import type { KpiIdVO } from '../../../domain/value-objects/primitives/kpi-id.vo';
import type { CreateKpiDTO, UpdateKpiDTO, EvaluateKpiDTO } from '../../dtos/requests/kpi';
import type { KpiResponseDTO, KpiResultResponseDTO } from '../../dtos/responses';

export interface KpiServiceInterface
  extends BaseServiceInterface<KpiEntity, KpiIdVO> {
  create(input: CreateKpiDTO): Promise<KpiResponseDTO>;
  update(input: UpdateKpiDTO): Promise<KpiResponseDTO>;
  evaluate(input: EvaluateKpiDTO): Promise<KpiResultResponseDTO>;
}
