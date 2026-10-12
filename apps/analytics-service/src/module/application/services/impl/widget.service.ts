/**
 * Widget Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import type { WidgetEntity } from '../../../domain/entities/widget.entity.js';
import { WidgetEntity as WidgetEntityClass } from '../../../domain/entities/widget.entity.js';
import type { WidgetRepository } from '../../../domain/repositories/widget.repository.interface.js';
import { WidgetIdVO } from '../../../domain/value-objects/primitives/widget-id.vo.js';
import { WidgetTypeVO } from '../../../domain/value-objects/primitives/widget-type.vo.js';
import { WidgetConfigVO } from '../../../domain/value-objects/primitives/widget-config.vo.js';
import { DashboardIdVO } from '../../../domain/value-objects/primitives/dashboard-id.vo.js';
import type { IWidgetService } from '../interfaces/widget.service.interface.js';
import type { AddWidgetDto } from '../../dtos/requests/dashboard/add-widget.dto.js';
import type { WidgetResponseData } from '../../dtos/responses/widget-response.dto.js';

export class WidgetService extends BaseService<WidgetEntity, string> implements IWidgetService {
  readonly name = 'WidgetService';

  constructor(private readonly repository: WidgetRepository) {
    super();
  }

  async create(dashboardId: string, input: AddWidgetDto): Promise<WidgetResponseData> {
    const now = new Date().toISOString();
    const entity = WidgetEntityClass.create({
      widgetId: WidgetIdVO.create(`w_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
      dashboardId: DashboardIdVO.create(dashboardId),
      type: WidgetTypeVO.create(input.type),
      title: input.title,
      config: WidgetConfigVO.create(input.config ?? {}),
      position: input.position,
      now,
    });
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async findById(id: string): Promise<WidgetResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async listByDashboard(dashboardId: string): Promise<readonly WidgetResponseData[]> {
    const entities = await this.repository.findByDashboard(DashboardIdVO.create(dashboardId));
    return entities.map((e) => this.toResponse(e));
  }

  async delete(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Widget', id);
    await this.repository.delete(id);
  }

  private toResponse(entity: WidgetEntity): WidgetResponseData {
    return {
      id: entity.id,
      dashboardId: entity.dashboardId.value,
      type: entity.type.value,
      title: entity.title,
      position: entity.position,
      hasError: false,
    };
  }
}
