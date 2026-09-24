import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { FaqEntity } from '../../../../domain/entities/faq.entity';
import { FaqIdVO } from '../../../../domain/value-objects/primitives/faq-id.vo';
import { FaqQuestionVO } from '../../../../domain/value-objects/primitives/faq-question.vo';
import { FaqAnswerVO } from '../../../../domain/value-objects/primitives/faq-answer.vo';
import { FaqStatusVO } from '../../../../domain/value-objects/primitives/faq-status.vo';

interface SerializedFaq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly status: string;
  readonly categoryId: string | null;
  readonly keywords: readonly string[];
  readonly viewCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'support:faq';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class FaqCacheRepository extends BaseCacheRepository<FaqEntity, FaqIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: FaqEntity): SerializedFaq {
    return {
      id: entity.id.value,
      question: entity.question.value,
      answer: entity.answer.value,
      status: entity.status.value,
      categoryId: entity.categoryId,
      keywords: entity.keywords,
      viewCount: entity.viewCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedFaq): FaqEntity {
    return FaqEntity.reconstitute(
      FaqIdVO.create(data.id),
      {
        question: FaqQuestionVO.create(data.question),
        answer: FaqAnswerVO.create(data.answer),
        status: FaqStatusVO.create(data.status),
        categoryId: data.categoryId,
        keywords: data.keywords,
        viewCount: data.viewCount,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: FaqIdVO): Promise<FaqEntity | null> {
    const raw = await this.redis.get<SerializedFaq>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly FaqEntity[]> {
    return [];
  }

  async save(entity: FaqEntity): Promise<FaqEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: FaqIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
