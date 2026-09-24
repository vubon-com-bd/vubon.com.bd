import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { NotificationEntity } from '../../../../domain/entities/notification.entity';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { NotificationTypeVO } from '../../../../domain/value-objects/primitives/notification-type.vo';
import { NotificationChannelVO } from '../../../../domain/value-objects/primitives/notification-channel.vo';
import { NotificationStatusVO } from '../../../../domain/value-objects/primitives/notification-status.vo';
import { NotificationPriorityVO } from '../../../../domain/value-objects/primitives/notification-priority.vo';
import { NotificationCategoryVO } from '../../../../domain/value-objects/primitives/notification-category.vo';
import { ReadStatusVO } from '../../../../domain/value-objects/primitives/read-status.vo';

interface SerializedNotification {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly channel: string;
  readonly status: string;
  readonly priority: string;
  readonly category: string;
  readonly readStatus: string;
  readonly readAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'notif:notification';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class NotificationCacheRepository extends BaseCacheRepository<
  NotificationEntity,
  NotificationIdVO
> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: NotificationEntity): SerializedNotification {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      type: entity.type.value,
      channel: entity.channel.value,
      status: entity.status.value,
      priority: entity.priority.value,
      category: entity.category.value,
      readStatus: entity.readStatus.value,
      readAt: entity.readAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedNotification): NotificationEntity {
    return NotificationEntity.reconstitute(
      NotificationIdVO.create(data.id),
      {
        userId: UserIdVO.create(data.userId),
        type: NotificationTypeVO.create(data.type),
        channel: NotificationChannelVO.create(data.channel),
        status: NotificationStatusVO.create(data.status),
        priority: NotificationPriorityVO.create(data.priority),
        category: NotificationCategoryVO.create(data.category),
        readStatus: ReadStatusVO.create(data.readStatus),
        readAt: data.readAt ? new Date(data.readAt) : null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: NotificationIdVO): Promise<NotificationEntity | null> {
    const raw = await this.redis.get<SerializedNotification>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly NotificationEntity[]> {
    return [];
  }

  async save(entity: NotificationEntity): Promise<NotificationEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: NotificationIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
