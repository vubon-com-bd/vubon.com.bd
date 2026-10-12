/**
 * Widget Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { WidgetEntity } from '../../../domain/entities/widget.entity.js';
import type { AddWidgetDto } from '../../dtos/requests/dashboard/add-widget.dto.js';
import type { WidgetResponseData } from '../../dtos/responses/widget-response.dto.js';

export interface IWidgetService extends BaseServiceInterface<WidgetEntity, string> {
  create(dashboardId: string, input: AddWidgetDto): Promise<WidgetResponseData>;
  findById(id: string): Promise<WidgetResponseData | null>;
  listByDashboard(dashboardId: string): Promise<readonly WidgetResponseData[]>;
  delete(id: string): Promise<void>;
}
