/**
 * Dashboard Cache Repository
 * @module analytics-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { DashboardEntity } from '../../../../domain/entities/dashboard.entity.js';
import { DashboardIdVO } from '../../../../domain/value-objects/primitives/dashboard-id.vo.js';
import { DashboardNameVO } from '../../../../domain/value-objects/primitives/dashboard-name.vo.js';
import { DashboardLayoutVO } from '../../../../domain/value-objects/primitives/dashboard-layout.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { WidgetIdVO } from '../../../../domain/value-objects/primitives/widget-id.vo.js';

const PREFIX = 'analytics:dashboard';
const DEFAULT_TTL = CACHE_TTL.THIRTY_MINUTES;

interface DashboardCachePayload {
  readonly id: string;
  readonly name: string;
  readonly layout: string;
  readonly ownerId: string;
  readonly widgetIds: readonly string[];
  readonly isPublic: boolean;
  readonly isArchived: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class DashboardCacheRepository {
  constructor(private readonly redis: RedisService) {}

  private keyFor(id: string): string {
    return `${PREFIX}:${id}`;
  }

  private ownerKey(ownerId: string): string {
    return `${PREFIX}:owner:${ownerId}`;
  }

  async findById(id: string): Promise<DashboardEntity | null> {
    const payload = await this.redis.get<DashboardCachePayload>(this.keyFor(id));
    return payload ? this.deserialize(payload) : null;
  }

  async findByOwner(ownerId: string): Promise<readonly DashboardEntity[] | null> {
    const payload = await this.redis.get<readonly DashboardCachePayload[]>(this.ownerKey(ownerId));
    return payload ? payload.map((p) => this.deserialize(p)) : null;
  }

  async save(entity: DashboardEntity, ttlSeconds: number = DEFAULT_TTL): Promise<void> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), ttlSeconds);
  }

  async saveOwnerList(
    ownerId: string,
    entities: readonly DashboardEntity[],
    ttlSeconds: number = DEFAULT_TTL
  ): Promise<void> {
    const payload = entities.map((e) => this.serialize(e));
    await this.redis.set(this.ownerKey(ownerId), payload, ttlSeconds);
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async invalidateOwner(ownerId: string): Promise<void> {
    await this.redis.del(this.ownerKey(ownerId));
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private serialize(entity: DashboardEntity): DashboardCachePayload {
    return {
      id: entity.id,
      name: entity.name.value,
      layout: entity.layout.value,
      ownerId: entity.ownerId.value,
      widgetIds: entity.widgetIds.map((w) => w.value),
      isPublic: entity.isPublic,
      isArchived: entity.isArchived,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(payload: DashboardCachePayload): DashboardEntity {
    return DashboardEntity.reconstitute({
      id: payload.id,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      props: {
        name: DashboardNameVO.create(payload.name),
        layout: DashboardLayoutVO.create(payload.layout),
        ownerId: UserIdVO.create(payload.ownerId),
        widgetIds: payload.widgetIds.map((w) => WidgetIdVO.create(w)),
        isPublic: payload.isPublic,
        isArchived: payload.isArchived,
      },
    });
  }
}
