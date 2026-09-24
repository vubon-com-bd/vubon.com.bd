import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { DashboardEntity } from '../../../../domain/entities/dashboard.entity';
import { DashboardIdVO } from '../../../../domain/value-objects/primitives/dashboard-id.vo';
import { DashboardNameVO } from '../../../../domain/value-objects/primitives/dashboard-name.vo';
import { DashboardLayoutVO } from '../../../../domain/value-objects/primitives/dashboard-layout.vo';
import { WidgetIdVO } from '../../../../domain/value-objects/primitives/widget-id.vo';

interface SerializedDashboard {
  readonly id: string;
  readonly name: string;
  readonly layout: string;
  readonly ownerId: string;
  readonly widgetIds: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'analytics:dashboard';
const TTL_SECONDS = 60 * 15; // 15 minutes

@Injectable()
export class DashboardCacheRepository extends BaseCacheRepository<DashboardEntity, DashboardIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: DashboardEntity): SerializedDashboard {
    return {
      id: entity.id.value,
      name: entity.name.value,
      layout: entity.layout.value,
      ownerId: entity.ownerId,
      widgetIds: entity.widgetIds.map((w) => w.value),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedDashboard): DashboardEntity {
    return DashboardEntity.reconstitute(
      DashboardIdVO.create(data.id),
      {
        name: DashboardNameVO.create(data.name),
        layout: DashboardLayoutVO.create(data.layout),
        ownerId: data.ownerId,
        widgetIds: data.widgetIds.map((id) => WidgetIdVO.create(id)),
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: DashboardIdVO): Promise<DashboardEntity | null> {
    const raw = await this.redis.get<SerializedDashboard>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly DashboardEntity[]> {
    return [];
  }

  async save(entity: DashboardEntity): Promise<DashboardEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: DashboardIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  /**
   * Invalidate all dashboards for a user (used after write).
   */
  async invalidateByOwner(ownerId: string): Promise<void> {
    await this.redis.del(`${PREFIX}:owner:${ownerId}`);
  }
}
