/**
 * Widget Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { WidgetEntity } from '../entities/widget.entity.js';
import type { DashboardIdVO } from '../value-objects/primitives/dashboard-id.vo.js';
import type { WidgetIdVO } from '../value-objects/primitives/widget-id.vo.js';

export interface WidgetRepository extends BaseRepository<WidgetEntity, string> {
  findByWidgetId(id: WidgetIdVO): Promise<WidgetEntity | null>;
  findByDashboard(dashboardId: DashboardIdVO): Promise<readonly WidgetEntity[]>;
  countByDashboard(dashboardId: DashboardIdVO): Promise<number>;
  deleteByDashboard(dashboardId: DashboardIdVO): Promise<number>;
}
