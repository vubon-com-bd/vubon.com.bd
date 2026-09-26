import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../../domain/value-objects/primitives/user-type.vo';

interface SerializedUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly phone: string | null;
  readonly status: string;
  readonly type: string;
  readonly emailVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'user:user';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class UserCacheRepository extends BaseCacheRepository<UserEntity, UserIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: UserEntity): SerializedUser {
    return {
      id: entity.id.value,
      email: entity.email.value,
      name: entity.name.value,
      phone: entity.phone?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      emailVerified: entity.emailVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedUser): UserEntity {
    return UserEntity.reconstitute(
      UserIdVO.create(data.id),
      {
        email: UserEmailVO.create(data.email),
        name: UserNameVO.create(data.name),
        phone: data.phone ? UserPhoneVO.create(data.phone) : null,
        status: UserStatusVO.create(data.status),
        type: UserTypeVO.create(data.type),
        emailVerified: data.emailVerified,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: UserIdVO): Promise<UserEntity | null> {
    const raw = await this.redis.get<SerializedUser>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly UserEntity[]> {
    return [];
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
