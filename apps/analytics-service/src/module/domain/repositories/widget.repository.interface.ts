import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { WidgetEntity } from '../entities/widget.entity';
import { WidgetIdVO } from '../value-objects/primitives/widget-id.vo';

export interface WidgetRepository extends BaseRepository<WidgetEntity, WidgetIdVO> {
  findByDashboardId(dashboardId: string): Promise<readonly WidgetEntity[]>;
  countByDashboardId(dashboardId: string): Promise<number>;
}
