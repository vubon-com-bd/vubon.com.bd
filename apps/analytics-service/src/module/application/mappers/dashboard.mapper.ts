/**
 * Dashboard Mapper
 */
import type { DashboardEntity } from '../../domain/entities/dashboard.entity.js';
import type { DashboardResponseData } from '../dtos/responses/dashboard-response.dto.js';

export class DashboardMapper {
  static toResponse(entity: DashboardEntity): DashboardResponseData {
    return {
      id: entity.id,
      name: entity.name.value,
      layout: entity.layout.value,
      ownerId: entity.ownerId.value,
      widgetCount: entity.widgetCount(),
      isPublic: entity.isPublic,
      isArchived: entity.isArchived,
      createdAt: entity.createdAt,
    };
  }

  static toResponseList(entities: readonly DashboardEntity[]): readonly DashboardResponseData[] {
    return entities.map((e) => DashboardMapper.toResponse(e));
  }
}
