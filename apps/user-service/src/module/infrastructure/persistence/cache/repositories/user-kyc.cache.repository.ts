import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { UserKycEntity } from '../../../../domain/entities/user-kyc.entity';
import { KycIdVO } from '../../../../domain/value-objects/primitives/kyc-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { KycDocumentVO } from '../../../../domain/value-objects/primitives/kyc-document.vo';
import { KycStatusVO } from '../../../../domain/value-objects/primitives/kyc-status.vo';

interface SerializedKyc {
  readonly id: string;
  readonly userId: string;
  readonly document: string;
  readonly status: string;
  readonly submittedAt: string | null;
  readonly reviewedAt: string | null;
  readonly rejectionReason: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'user:kyc';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class UserKycCacheRepository extends BaseCacheRepository<UserKycEntity, KycIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: UserKycEntity): SerializedKyc {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      document: entity.document.value,
      status: entity.status.value,
      submittedAt: entity.submittedAt?.toISOString() ?? null,
      reviewedAt: entity.reviewedAt?.toISOString() ?? null,
      rejectionReason: entity.rejectionReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedKyc): UserKycEntity {
    return UserKycEntity.reconstitute(
      KycIdVO.create(data.id),
      {
        userId: UserIdVO.create(data.userId),
        document: KycDocumentVO.create(data.document),
        status: KycStatusVO.create(data.status),
        submittedAt: data.submittedAt ? new Date(data.submittedAt) : null,
        reviewedAt: data.reviewedAt ? new Date(data.reviewedAt) : null,
        rejectionReason: data.rejectionReason,
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: KycIdVO): Promise<UserKycEntity | null> {
    const raw = await this.redis.get<SerializedKyc>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly UserKycEntity[]> {
    return [];
  }

  async save(entity: UserKycEntity): Promise<UserKycEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: KycIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByUserId(userId: UserIdVO): Promise<UserKycEntity | null> {
    const raw = await this.redis.get<SerializedKyc>(`${PREFIX}:user:${userId.value}`);
    return raw ? this.deserialize(raw) : null;
  }
}
