/**
 * Dashboard Controller Mapper
 */
import type { DashboardResponseData } from '../../application/dtos/responses/dashboard-response.dto.js';
import type { WidgetResponseData } from '../../application/dtos/responses/widget-response.dto.js';
import {
  DashboardResponseDto,
  WidgetResponseDto,
} from '../dtos/responses/dashboard.response.dto.js';

export class DashboardControllerMapper {
  static toHttp(data: DashboardResponseData): DashboardResponseDto {
    const dto = new DashboardResponseDto();
    dto.id = data.id;
    dto.name = data.name;
    dto.layout = data.layout;
    dto.ownerId = data.ownerId;
    dto.widgetCount = data.widgetCount;
    dto.isPublic = data.isPublic;
    dto.isArchived = data.isArchived;
    dto.createdAt = data.createdAt;
    return dto;
  }

  static widgetToHttp(data: WidgetResponseData): WidgetResponseDto {
    const dto = new WidgetResponseDto();
    dto.id = data.id;
    dto.dashboardId = data.dashboardId;
    dto.type = data.type;
    dto.title = data.title;
    dto.position = data.position;
    dto.data = data.data;
    dto.hasError = data.hasError;
    dto.error = data.error;
    return dto;
  }

  static toHttpList(data: readonly DashboardResponseData[]): DashboardResponseDto[] {
    return data.map((d) => DashboardControllerMapper.toHttp(d));
  }

  static widgetListToHttp(data: readonly WidgetResponseData[]): WidgetResponseDto[] {
    return data.map((d) => DashboardControllerMapper.widgetToHttp(d));
  }
}
