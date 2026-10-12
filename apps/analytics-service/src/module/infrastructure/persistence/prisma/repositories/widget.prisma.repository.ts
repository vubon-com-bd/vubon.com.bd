/**
 * Widget Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { WidgetEntity } from '../../../../domain/entities/widget.entity.js';
import { WidgetIdVO } from '../../../../domain/value-objects/primitives/widget-id.vo.js';
import { WidgetTypeVO } from '../../../../domain/value-objects/primitives/widget-type.vo.js';
import { WidgetConfigVO } from '../../../../domain/value-objects/primitives/widget-config.vo.js';
import { DashboardIdVO } from '../../../../domain/value-objects/primitives/dashboard-id.vo.js';
import type { WidgetRepository as IWidgetRepository } from '../../../../domain/repositories/widget.repository.interface.js';

type PrismaWidgetRow = {
  id: string;
  dashboardId: string;
  type: string;
  title: string;
  config: unknown;
  posX: number;
  posY: number;
  posW: number;
  posH: number;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class WidgetPrismaRepository
  extends AnalyticsBasePrismaRepository<WidgetEntity, PrismaWidgetRow, string>
  implements IWidgetRepository
{
  protected readonly delegateName = 'analyticsWidget';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaWidgetRow): WidgetEntity {
    return WidgetEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        widgetId: WidgetIdVO.create(raw.id),
        dashboardId: DashboardIdVO.create(raw.dashboardId),
        type: WidgetTypeVO.create(raw.type),
        title: raw.title,
        config: WidgetConfigVO.create((raw.config as Record<string, unknown>) ?? {}),
        position: {
          x: raw.posX,
          y: raw.posY,
          w: raw.posW,
          h: raw.posH,
        },
      },
    });
  }

  protected toPersistence(domain: WidgetEntity): Record<string, unknown> {
    return {
      id: domain.id,
      dashboardId: domain.dashboardId.value,
      type: domain.type.value,
      title: domain.title,
      config: domain.config.config,
      posX: domain.position.x,
      posY: domain.position.y,
      posW: domain.position.w,
      posH: domain.position.h,
    };
  }

  protected idOf(domain: WidgetEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByWidgetId(id: WidgetIdVO): Promise<WidgetEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByDashboard(dashboardId: DashboardIdVO): Promise<readonly WidgetEntity[]> {
    const rows = await this.model.findMany({
      where: { dashboardId: dashboardId.value },
      orderBy: [{ posY: 'asc' }, { posX: 'asc' }],
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByDashboard(dashboardId: DashboardIdVO): Promise<number> {
    return this.model.count({ where: { dashboardId: dashboardId.value } });
  }

  async deleteByDashboard(dashboardId: DashboardIdVO): Promise<number> {
    const result = await this.model.deleteMany({
      where: { dashboardId: dashboardId.value },
    });
    return result.count;
  }
}
