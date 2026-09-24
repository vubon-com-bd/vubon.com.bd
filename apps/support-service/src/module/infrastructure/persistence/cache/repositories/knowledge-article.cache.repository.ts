import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { KnowledgeArticleEntity } from '../../../../domain/entities/knowledge-article.entity';
import { KnowledgeArticleIdVO } from '../../../../domain/value-objects/primitives/knowledge-article-id.vo';
import { KnowledgeArticleTitleVO } from '../../../../domain/value-objects/primitives/knowledge-article-title.vo';
import { KnowledgeArticleBodyVO } from '../../../../domain/value-objects/primitives/knowledge-article-body.vo';
import { KnowledgeStatusVO } from '../../../../domain/value-objects/primitives/knowledge-status.vo';

interface SerializedKnowledge {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly status: string;
  readonly categoryId: string | null;
  readonly tags: readonly string[];
  readonly viewCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'support:kb-article';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class KnowledgeArticleCacheRepository extends BaseCacheRepository<
  KnowledgeArticleEntity,
  KnowledgeArticleIdVO
> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: KnowledgeArticleEntity): SerializedKnowledge {
    return {
      id: entity.id.value,
      title: entity.title.value,
      body: entity.body.value,
      status: entity.status.value,
      categoryId: entity.categoryId,
      tags: entity.tags,
      viewCount: entity.viewCount,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedKnowledge): KnowledgeArticleEntity {
    return KnowledgeArticleEntity.reconstitute(
      KnowledgeArticleIdVO.create(data.id),
      {
        title: KnowledgeArticleTitleVO.create(data.title),
        body: KnowledgeArticleBodyVO.create(data.body),
        status: KnowledgeStatusVO.create(data.status),
        categoryId: data.categoryId,
        tags: data.tags,
        viewCount: data.viewCount,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: KnowledgeArticleIdVO): Promise<KnowledgeArticleEntity | null> {
    const raw = await this.redis.get<SerializedKnowledge>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly KnowledgeArticleEntity[]> {
    return [];
  }

  async save(entity: KnowledgeArticleEntity): Promise<KnowledgeArticleEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: KnowledgeArticleIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}
