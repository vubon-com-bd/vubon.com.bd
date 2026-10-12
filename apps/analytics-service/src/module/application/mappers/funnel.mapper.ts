/**
 * Funnel Mapper
 */
import type { FunnelEntity } from '../../domain/entities/funnel.entity.js';
import type { FunnelResponseData } from '../dtos/responses/funnel-response.dto.js';

export class FunnelMapper {
  static toResponse(entity: FunnelEntity): FunnelResponseData {
    return {
      id: entity.id,
      name: entity.name,
      stepCount: entity.stepCount(),
      isActive: entity.isActive,
      lastAnalyzedAt: entity.lastAnalyzedAt,
    };
  }

  static toResponseList(entities: readonly FunnelEntity[]): readonly FunnelResponseData[] {
    return entities.map((e) => FunnelMapper.toResponse(e));
  }
}
