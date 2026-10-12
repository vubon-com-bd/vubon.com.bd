/**
 * Dashboard Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { DashboardEntity } from '../../../domain/entities/dashboard.entity.js';
import type { CreateDashboardDto } from '../../dtos/requests/dashboard/create-dashboard.dto.js';
import type { UpdateDashboardDto } from '../../dtos/requests/dashboard/update-dashboard.dto.js';
import type { AddWidgetDto } from '../../dtos/requests/dashboard/add-widget.dto.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

export interface IDashboardService extends BaseServiceInterface<DashboardEntity, string> {
  create(input: CreateDashboardDto, ownerId: string): Promise<DashboardResponseData>;
  update(id: string, input: UpdateDashboardDto, userId: string): Promise<DashboardResponseData>;
  addWidget(id: string, input: AddWidgetDto, userId: string): Promise<DashboardResponseData>;
  removeWidget(id: string, widgetId: string, userId: string): Promise<DashboardResponseData>;
  findById(id: string, userId: string): Promise<DashboardResponseData | null>;
  listByOwner(ownerId: string): Promise<readonly DashboardResponseData[]>;
  listAccessible(userId: string): Promise<readonly DashboardResponseData[]>;
}
