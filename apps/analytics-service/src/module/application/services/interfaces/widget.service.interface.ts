import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { WidgetEntity } from '../../../domain/entities/widget.entity';
import type { WidgetIdVO } from '../../../domain/value-objects/primitives/widget-id.vo';

export interface WidgetServiceInterface
  extends BaseServiceInterface<WidgetEntity, WidgetIdVO> {
  findByDashboardId(dashboardId: string): Promise<readonly WidgetEntity[]>;
}
