import { Injectable } from '@nestjs/common';
import { Widget as PrismaWidget, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { WidgetEntity } from '../../../../domain/entities/widget.entity';
import { WidgetIdVO } from '../../../../domain/value-objects/primitives/widget-id.vo';
import { WidgetTypeVO } from '../../../../domain/value-objects/primitives/widget-type.vo';
import { WidgetConfigVO } from '../../../../domain/value-objects/primitives/widget-config.vo';
import type { WidgetRepository } from '../../../../domain/repositories/widget.repository.interface';

@Injectable()
export class WidgetPrismaRepository
  extends BasePrismaRepository<WidgetEntity, WidgetIdVO>
  implements WidgetRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaWidget): WidgetEntity {
    const configObj = (raw.configJson as Record<string, unknown>) ?? {};
    return WidgetEntity.reconstitute(
      WidgetIdVO.create(raw.id),
      {
        type: WidgetTypeVO.create(raw.type),
        config: WidgetConfigVO.create(configObj),
        position: raw.position,
        metricName: raw.metricName,
        dashboardId: raw.dashboardId,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: WidgetIdVO): Promise<WidgetEntity | null> {
    const raw = await this.prisma.widget.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly WidgetEntity[]> {
    const rows = await this.prisma.widget.findMany({
      where: { deletedAt: null },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: WidgetEntity): Promise<WidgetEntity> {
    const data = {
      dashboardId: entity.dashboardId,
      type: entity.type.value,
      metricName: entity.metricName,
      position: entity.position,
      configJson: entity.config.toObject() as Prisma.InputJsonValue,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.widget.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: WidgetIdVO): Promise<void> {
    await this.prisma.widget.delete({ where: { id: id.value } });
  }

  async findByDashboardId(dashboardId: string): Promise<readonly WidgetEntity[]> {
    const rows = await this.prisma.widget.findMany({
      where: { dashboardId, deletedAt: null },
      orderBy: { position: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByDashboardId(dashboardId: string): Promise<number> {
    return this.prisma.widget.count({
      where: { dashboardId, deletedAt: null },
    });
  }
}
