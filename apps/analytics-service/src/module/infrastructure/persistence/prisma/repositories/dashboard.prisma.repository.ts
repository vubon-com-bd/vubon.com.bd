import { Injectable } from '@nestjs/common';
import { Dashboard as PrismaDashboard } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DashboardEntity } from '../../../../domain/entities/dashboard.entity';
import { DashboardIdVO } from '../../../../domain/value-objects/primitives/dashboard-id.vo';
import { DashboardNameVO } from '../../../../domain/value-objects/primitives/dashboard-name.vo';
import { DashboardLayoutVO } from '../../../../domain/value-objects/primitives/dashboard-layout.vo';
import { WidgetIdVO } from '../../../../domain/value-objects/primitives/widget-id.vo';
import type { DashboardRepository } from '../../../../domain/repositories/dashboard.repository.interface';

@Injectable()
export class DashboardPrismaRepository
  extends BasePrismaRepository<DashboardEntity, DashboardIdVO>
  implements DashboardRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDashboard & { widgets?: { id: string }[] }): DashboardEntity {
    return DashboardEntity.reconstitute(
      DashboardIdVO.create(raw.id),
      {
        name: DashboardNameVO.create(raw.name),
        layout: DashboardLayoutVO.create(raw.layout),
        ownerId: raw.ownerId,
        widgetIds: (raw.widgets ?? []).map((w) => WidgetIdVO.create(w.id)),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: DashboardIdVO): Promise<DashboardEntity | null> {
    const raw = await this.prisma.dashboard.findUnique({
      where: { id: id.value },
      include: { widgets: { select: { id: true } } },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DashboardEntity[]> {
    const rows = await this.prisma.dashboard.findMany({
      where: { deletedAt: null },
      include: { widgets: { select: { id: true } } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DashboardEntity): Promise<DashboardEntity> {
    const data = {
      name: entity.name.value,
      layout: entity.layout.value,
      ownerId: entity.ownerId,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.dashboard.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
      include: { widgets: { select: { id: true } } },
    });
    return this.toDomain(raw);
  }

  async delete(id: DashboardIdVO): Promise<void> {
    await this.prisma.dashboard.delete({ where: { id: id.value } });
  }

  async findByOwner(ownerId: string): Promise<readonly DashboardEntity[]> {
    const rows = await this.prisma.dashboard.findMany({
      where: { ownerId, deletedAt: null },
      include: { widgets: { select: { id: true } } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByNameForOwner(
    ownerId: string,
    name: string,
  ): Promise<DashboardEntity | null> {
    const raw = await this.prisma.dashboard.findFirst({
      where: { ownerId, name, deletedAt: null },
      include: { widgets: { select: { id: true } } },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
