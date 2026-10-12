/**
 * Dashboard Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError, AuthorizationError } from '@vubon/shared-kernel/application/errors';
import type { DashboardEntity } from '../../../domain/entities/dashboard.entity.js';
import { DashboardEntity as DashboardEntityClass } from '../../../domain/entities/dashboard.entity.js';
import type { DashboardRepository } from '../../../domain/repositories/dashboard.repository.interface.js';
import { DashboardIdVO } from '../../../domain/value-objects/primitives/dashboard-id.vo.js';
import { DashboardNameVO } from '../../../domain/value-objects/primitives/dashboard-name.vo.js';
import { DashboardLayoutVO } from '../../../domain/value-objects/primitives/dashboard-layout.vo.js';
import { WidgetIdVO } from '../../../domain/value-objects/primitives/widget-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import type { IDashboardService } from '../interfaces/dashboard.service.interface.js';
import type { CreateDashboardDto } from '../../dtos/requests/dashboard/create-dashboard.dto.js';
import type { UpdateDashboardDto } from '../../dtos/requests/dashboard/update-dashboard.dto.js';
import type { AddWidgetDto } from '../../dtos/requests/dashboard/add-widget.dto.js';
import type { DashboardResponseData } from '../../dtos/responses/dashboard-response.dto.js';

export class DashboardService extends BaseService<DashboardEntity, string> implements IDashboardService {
  readonly name = 'DashboardService';

  constructor(private readonly repository: DashboardRepository) {
    super();
  }

  async create(input: CreateDashboardDto, ownerId: string): Promise<DashboardResponseData> {
    const now = new Date().toISOString();
    const entity = DashboardEntityClass.create({
      id: DashboardIdVO.create(`dash_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
      name: DashboardNameVO.create(input.name),
      layout: DashboardLayoutVO.create(input.layout),
      ownerId: UserIdVO.create(ownerId),
      now,
    });

    if (input.isPublic) entity.makePublic();
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async update(id: string, input: UpdateDashboardDto, userId: string): Promise<DashboardResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Dashboard', id);
    if (!entity.isOwnedBy(UserIdVO.create(userId))) {
      throw new AuthorizationError('Not dashboard owner');
    }

    if (input.isPublic === true) entity.makePublic();
    else if (input.isPublic === false) entity.makePrivate();

    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async addWidget(id: string, input: AddWidgetDto, userId: string): Promise<DashboardResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Dashboard', id);
    if (!entity.isOwnedBy(UserIdVO.create(userId))) {
      throw new AuthorizationError('Not dashboard owner');
    }

    const widgetId = WidgetIdVO.create(`widget_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
    entity.addWidget(widgetId, new Date().toISOString());
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async removeWidget(id: string, widgetId: string, userId: string): Promise<DashboardResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Dashboard', id);
    if (!entity.isOwnedBy(UserIdVO.create(userId))) {
      throw new AuthorizationError('Not dashboard owner');
    }

    entity.removeWidget(WidgetIdVO.create(widgetId));
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async findById(id: string, userId: string): Promise<DashboardResponseData | null> {
    const entity = await this.repository.findById(id);
    if (!entity) return null;
    if (!entity.isAccessibleBy(UserIdVO.create(userId))) {
      throw new AuthorizationError('Dashboard not accessible');
    }
    return this.toResponse(entity);
  }

  async listByOwner(ownerId: string): Promise<readonly DashboardResponseData[]> {
    const entities = await this.repository.findByOwner(UserIdVO.create(ownerId));
    return entities.map((e) => this.toResponse(e));
  }

  async listAccessible(userId: string): Promise<readonly DashboardResponseData[]> {
    const entities = await this.repository.findAccessibleBy(UserIdVO.create(userId));
    return entities.map((e) => this.toResponse(e));
  }

  private toResponse(entity: DashboardEntity): DashboardResponseData {
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
}
