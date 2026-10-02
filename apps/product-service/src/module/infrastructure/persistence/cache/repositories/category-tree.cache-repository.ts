/**
 * CategoryTreeCacheRepository — caches the full category tree.
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

export interface CategoryTreeCacheNode {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly parentId?: string;
  readonly depth: number;
  readonly productCount: number;
  readonly children: readonly CategoryTreeCacheNode[];
}

export const CATEGORY_TREE_CACHE_REPOSITORY = Symbol('CATEGORY_TREE_CACHE_REPOSITORY');

@Injectable()
export class CategoryTreeCacheRepository {
  private readonly ttl: number;
  private readonly key = 'category:tree';

  constructor(@Inject(RedisService) private readonly redis: RedisService) {
    this.ttl = CACHE_TTL.FIFTEEN_MINUTES;
  }

  async get(): Promise<readonly CategoryTreeCacheNode[] | null> {
    return this.redis.get<readonly CategoryTreeCacheNode[]>(this.key);
  }

  async set(tree: readonly CategoryTreeCacheNode[]): Promise<void> {
    await this.redis.set(this.key, tree, this.ttl);
  }

  async invalidate(): Promise<void> {
    await this.redis.del(this.key);
  }
}
