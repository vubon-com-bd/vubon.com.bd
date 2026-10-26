/**
 * TemplateCacheRepository — Redis cache for templates
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Caches:
 *  - Template by id (30 min TTL — templates rarely change)
 *  - Template by slug (30 min TTL)
 *  - Rendered output (10 min TTL — based on template + data hash)
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';

const PREFIX = 'notification:template';
const ID_KEY = (id: string) => `${PREFIX}:${id}`;
const SLUG_KEY = (slug: string) => `${PREFIX}:slug:${slug}`;
const RENDER_KEY = (id: string, hash: string) => `${PREFIX}:render:${id}:${hash}`;

export interface TemplateCacheDTO {
  readonly id: string;
  readonly slug: string;
  readonly status: string;
  readonly version: number;
  readonly [key: string]: unknown;
}

@Injectable()
export class TemplateCacheRepository {
  private readonly logger = new Logger(TemplateCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  // ═══════════════ By ID ═══════════════
  async getById(id: string): Promise<TemplateCacheDTO | null> {
    return this.redis.get<TemplateCacheDTO>(ID_KEY(id));
  }

  async setById(id: string, dto: TemplateCacheDTO): Promise<void> {
    await this.redis.set(ID_KEY(id), dto, CACHE_TTL.THIRTY_MINUTES);
  }

  async invalidateById(id: string): Promise<void> {
    await this.redis.del(ID_KEY(id));
  }

  // ═══════════════ By Slug ═══════════════
  async getBySlug(slug: string): Promise<TemplateCacheDTO | null> {
    return this.redis.get<TemplateCacheDTO>(SLUG_KEY(slug));
  }

  async setBySlug(slug: string, dto: TemplateCacheDTO): Promise<void> {
    await this.redis.set(SLUG_KEY(slug), dto, CACHE_TTL.THIRTY_MINUTES);
  }

  async invalidateBySlug(slug: string): Promise<void> {
    await this.redis.del(SLUG_KEY(slug));
  }

  // ═══════════════ Rendered output ═══════════════
  async getRendered(id: string, hash: string): Promise<string | null> {
    return this.redis.get<string>(RENDER_KEY(id, hash));
  }

  async setRendered(id: string, hash: string, output: string): Promise<void> {
    await this.redis.set(RENDER_KEY(id, hash), output, CACHE_TTL.FIFTEEN_MINUTES);
  }

  // ═══════════════ Bulk ═══════════════
  async invalidate(id: string, slug?: string): Promise<void> {
    await this.invalidateById(id);
    if (slug) await this.invalidateBySlug(slug);
    this.logger.debug(`Template cache invalidated: id=${id} slug=${slug ?? '-'}`);
  }
}
