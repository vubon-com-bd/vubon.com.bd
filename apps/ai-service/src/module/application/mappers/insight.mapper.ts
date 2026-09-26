import { BaseMapper } from '@vubon/shared-kernel/application/mappers/base.mapper';
import { InsightEntity } from '../../domain/entities/insight.entity';
import type { InsightResponseDTO } from '../dtos/responses/insight-response.dto';

export class InsightMapper extends BaseMapper<InsightEntity, InsightResponseDTO> {
  toTarget(source: InsightEntity): InsightResponseDTO {
    return {
      id: source.id.value,
      type: source.type,
      priority: source.priority,
      status: source.status.value,
      target: source.target,
      summary: source.result.summary,
      confidence: source.result.confidence.value,
      createdAt: source.createdAt,
    } as unknown as InsightResponseDTO;
  }

  toSource(_target: InsightResponseDTO): InsightEntity {
    throw new Error('InsightMapper.toSource not supported');
  }
}
