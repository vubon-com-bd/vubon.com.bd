/**
 * KnowledgeArticleCacheRepository
 * @module support-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { KnowledgeArticleEntity } from '../../../../domain/entities/knowledge-article.entity';
import { KnowledgeArticleIdVO } from '../../../../domain/value-objects/primitives/knowledge-article-id.vo';
import { SupportRedisService } from '../redis.service';
import { SUPPORT_CACHE_PREFIX } from '../support-cache.constants';

@Injectable()
export class KnowledgeArticleCacheRepository {
  private readonly keyPrefix = SUPPORT_CACHE_PREFIX.KB_ARTICLE;
  private readonly ttlSeconds = CACHE_TTL.ONE_DAY;

  constructor(private readonly redis: SupportRedisService) {}

  async findById(id: KnowledgeArticleIdVO): Promise<KnowledgeArticleEntity | null> {
    const raw = await this.redis.get(this.keyFor(id));
    if (!raw) return null;
    try {
      const snap = JSON.parse(raw) as ReturnType<KnowledgeArticleEntity['toSnapshot']>;
      return KnowledgeArticleEntity.rehydrate(snap);
    } catch {
      await this.redis.del(this.keyFor(id));
      return null;
    }
  }

  async save(entity: KnowledgeArticleEntity): Promise<void> {
    await this.redis.set(
      this.keyFor(entity.id),
      JSON.stringify(entity.toSnapshot()),
      this.ttlSeconds,
    );
  }

  async invalidate(id: KnowledgeArticleIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async exists(id: KnowledgeArticleIdVO): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private keyFor(id: KnowledgeArticleIdVO): string {
    return `${this.keyPrefix}${id.value}`;
  }
}
