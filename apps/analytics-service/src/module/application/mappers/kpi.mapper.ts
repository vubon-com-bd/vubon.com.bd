import { Injectable } from '@nestjs/common';
import { KpiEntity } from '../../domain/entities/kpi.entity';
import { KpiResultVO } from '../../domain/value-objects/composites/kpi-result.vo';
import type { KpiResponseDTO, KpiResultResponseDTO } from '../dtos/responses';
import { toKpiResponse, toKpiResultResponse } from '../dtos/responses';

@Injectable()
export class KpiMapper {
  toResponse(entity: KpiEntity): KpiResponseDTO {
    return toKpiResponse(entity);
  }

  toResponseList(entities: readonly KpiEntity[]): readonly KpiResponseDTO[] {
    return entities.map((e) => toKpiResponse(e));
  }

  resultToResponse(vo: KpiResultVO): KpiResultResponseDTO {
    return toKpiResultResponse(vo);
  }
}
