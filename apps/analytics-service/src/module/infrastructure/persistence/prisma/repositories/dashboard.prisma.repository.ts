/**
 * Dashboard Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { DashboardEntity } from '../../../../domain/entities/dashboard.entity.js';
import { DashboardIdVO } from '../../../../domain/value-objects/primitives/dashboard-id.vo.js';
import { DashboardNameVO } from '../../../../domain/value-objects/primitives/dashboard-name.vo.js';
import { DashboardLayoutVO } from '../../../../domain/value-objects/primitives/dashboard-layout.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { WidgetIdVO } from '../../../../domain/value-objects/primitives/widget-id.vo.js';
import type { DashboardRepository as IDashboardRepository } from '../../../../domain/repositories/dashboard.repository.interface.js';

type PrismaDashboardRow = {
  id: string;
  name: string;
  layout: string;
  ownerId: string;
  isPublic: boolean;
  isArchived: boolean;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  widgets?: { id: string }[];
};

@Injectable()
export class DashboardPrismaRepository
  extends AnalyticsBasePrismaRepository<DashboardEntity, PrismaDashboardRow, string>
  implements IDashboardRepository
{
  protected readonly delegateName = 'analyticsDashboard';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaDashboardRow): DashboardEntity {
    return DashboardEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: DashboardNameVO.create(raw.name),
        layout: DashboardLayoutVO.create(raw.layout),
        ownerId: UserIdVO.create(raw.ownerId),
        widgetIds: (raw.widgets ?? []).map((w) => WidgetIdVO.create(w.id)),
        isPublic: raw.isPublic,
        isArchived: raw.isArchived,
      },
    });
  }

  protected toPersistence(domain: DashboardEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      layout: domain.layout.value,
      ownerId: domain.ownerId.value,
      isPublic: domain.isPublic,
      isArchived: domain.isArchived,
      version: domain.version,
    };
  }

  protected idOf(domain: DashboardEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  private async findWithWidgets(where: Record<string, unknown>): Promise<PrismaDashboardRow[]> {
    return this.model.findMany({
      where,
      include: { widgets: { select: { id: true } } },
    });
  }

  async findByDashboardId(id: DashboardIdVO): Promise<DashboardEntity | null> {
    const raw = await this.model.findUnique({
      where: { id: id.value },
      include: { widgets: { select: { id: true } } },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByOwner(ownerId: UserIdVO): Promise<readonly DashboardEntity[]> {
    const rows = await this.findWithWidgets({ ownerId: ownerId.value, deletedAt: null });
    return rows.map((r) => this.toDomain(r));
  }

  async findPublic(): Promise<readonly DashboardEntity[]> {
    const rows = await this.findWithWidgets({ isPublic: true, deletedAt: null });
    return rows.map((r) => this.toDomain(r));
  }

  async findAccessibleBy(userId: UserIdVO): Promise<readonly DashboardEntity[]> {
    const rows = await this.findWithWidgets({
      OR: [{ ownerId: userId.value }, { isPublic: true }],
      deletedAt: null,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findArchived(): Promise<readonly DashboardEntity[]> {
    const rows = await this.findWithWidgets({ isArchived: true });
    return rows.map((r) => this.toDomain(r));
  }

  async countByOwner(ownerId: UserIdVO): Promise<number> {
    return this.model.count({
      where: { ownerId: ownerId.value, deletedAt: null },
    });
  }
}
