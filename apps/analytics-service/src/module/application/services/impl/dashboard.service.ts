import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { DashboardEntity } from '../../../domain/entities/dashboard.entity';
import { DashboardIdVO } from '../../../domain/value-objects/primitives/dashboard-id.vo';
import { WidgetIdVO } from '../../../domain/value-objects/primitives/widget-id.vo';
import { DashboardComposerService } from '../../../domain/services/dashboard-composer.service';
import type { DashboardRepository } from '../../../domain/repositories/dashboard.repository.interface';
import type { WidgetRepository } from '../../../domain/repositories/widget.repository.interface';
import type { DashboardServiceInterface } from '../interfaces/dashboard.service.interface';
import type {
  CreateDashboardDTO,
  UpdateDashboardDTO,
  AddWidgetDTO,
  RemoveWidgetDTO,
} from '../../dtos/requests/dashboard';
import {
  type DashboardResponseDTO,
  type WidgetResponseDTO,
  toDashboardResponse,
  toWidgetResponse,
} from '../../dtos/responses';
import { WidgetEntity } from '../../../domain/entities/widget.entity';
import { WidgetTypeVO } from '../../../domain/value-objects/primitives/widget-type.vo';
import { WidgetConfigVO } from '../../../domain/value-objects/primitives/widget-config.vo';

@Injectable()
export class DashboardService
  extends BaseService<DashboardEntity, DashboardIdVO>
  implements DashboardServiceInterface
{
  readonly name = 'DashboardService';

  constructor(
    private readonly dashboardRepo: DashboardRepository,
    private readonly widgetRepo: WidgetRepository,
    private readonly composer: DashboardComposerService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateDashboardDTO): Promise<DashboardResponseDTO> {
    const entity = this.composer.compose({
      name: input.name,
      layout: input.layout,
      ownerId: input.ownerId,
    });
    await this.dashboardRepo.save(entity);
    const events = entity.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return toDashboardResponse(entity);
  }

  async update(input: UpdateDashboardDTO): Promise<DashboardResponseDTO> {
    const entity = await this.dashboardRepo.findById(
      DashboardIdVO.create(input.dashboardId),
    );
    if (!entity) throw new Error(`Dashboard not found: ${input.dashboardId}`);
    // In this simplified model, updates only touch name via new instance
    void entity;
    throw new Error('Dashboard update not yet wired');
  }

  async addWidget(input: AddWidgetDTO): Promise<WidgetResponseDTO> {
    const dashboard = await this.dashboardRepo.findById(
      DashboardIdVO.create(input.dashboardId),
    );
    if (!dashboard) throw new Error(`Dashboard not found: ${input.dashboardId}`);

    const widgetId = WidgetIdVO.create(crypto.randomUUID());
    const widget = WidgetEntity.create({
      type: WidgetTypeVO.create(input.widgetType),
      config: WidgetConfigVO.create(input.config),
      position: input.position ?? dashboard.widgetCount,
      metricName: input.metricName,
      dashboardId: input.dashboardId,
    });

    await this.widgetRepo.save(widget);
    const updatedDashboard = dashboard.addWidget(widgetId);
    await this.dashboardRepo.save(updatedDashboard);
    const events = updatedDashboard.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return toWidgetResponse(widget);
  }

  async removeWidget(input: RemoveWidgetDTO): Promise<void> {
    const dashboard = await this.dashboardRepo.findById(
      DashboardIdVO.create(input.dashboardId),
    );
    if (!dashboard) throw new Error(`Dashboard not found: ${input.dashboardId}`);
    const updated = dashboard.removeWidget(WidgetIdVO.create(input.widgetId));
    await this.dashboardRepo.save(updated);
    await this.widgetRepo.delete(WidgetIdVO.create(input.widgetId));
  }
}
