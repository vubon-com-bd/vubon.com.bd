import { Injectable } from '@nestjs/common';
import {
  BaseCacheRepository,
  RedisService,
} from '@vubon/shared-kernel/infrastructure';
import { PreferenceMatrixEntity } from '../../../../domain/entities/preference-matrix.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';

interface SerializedMatrix {
  readonly userId: string;
  readonly emailOptIn: boolean;
  readonly smsOptIn: boolean;
  readonly pushOptIn: boolean;
  readonly inAppOptIn: boolean;
  readonly webhookOptIn: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'notif:preference';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class PreferenceCacheRepository extends BaseCacheRepository<
  PreferenceMatrixEntity,
  UserIdVO
> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: PreferenceMatrixEntity): SerializedMatrix {
    return {
      userId: entity.userId.value,
      emailOptIn: entity.emailOptIn,
      smsOptIn: entity.smsOptIn,
      pushOptIn: entity.pushOptIn,
      inAppOptIn: entity.inAppOptIn,
      webhookOptIn: entity.webhookOptIn,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedMatrix): PreferenceMatrixEntity {
    return PreferenceMatrixEntity.reconstitute(
      UserIdVO.create(data.userId),
      {
        userId: UserIdVO.create(data.userId),
        emailOptIn: data.emailOptIn,
        smsOptIn: data.smsOptIn,
        pushOptIn: data.pushOptIn,
        inAppOptIn: data.inAppOptIn,
        webhookOptIn: data.webhookOptIn,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: UserIdVO): Promise<PreferenceMatrixEntity | null> {
    const raw = await this.redis.get<SerializedMatrix>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly PreferenceMatrixEntity[]> {
    return [];
  }

  async save(entity: PreferenceMatrixEntity): Promise<PreferenceMatrixEntity> {
    await this.redis.set(this.keyFor(entity.userId), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
