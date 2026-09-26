import { Injectable } from '@nestjs/common';
import type {
  DashboardResponseDTO as AppDashboardDTO,
  WidgetResponseDTO as AppWidgetDTO,
} from '../../application/dtos/responses';
import type {
  DashboardResponseDTO,
  WidgetResponseDTO,
} from '../dtos/responses';

@Injectable()
export class DashboardControllerMapper {
  toDashboardResponse(appDto: AppDashboardDTO): DashboardResponseDTO {
    return {
      dashboardId: appDto.dashboardId,
      name: appDto.name,
      layout: appDto.layout,
      ownerId: appDto.ownerId,
      widgetCount: appDto.widgetCount,
      createdAt: appDto.createdAt,
    };
  }

  toWidgetResponse(appDto: AppWidgetDTO): WidgetResponseDTO {
    return {
      widgetId: appDto.widgetId,
      type: appDto.type,
      metricName: appDto.metricName,
      position: appDto.position,
      dashboardId: appDto.dashboardId,
      configKeys: [...appDto.configKeys],
    };
  }
}
