/**
 * TemplateCacheRepository — Redis-backed cache for Template render results
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Cache key: templateId:locale:sha256(data)
 * TTL: 30 min (template changes invalidate via version bump in key)
 */
import { Injectable, Logger } from '@nestjs/common';
import { createHash } from 'node:crypto';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { TemplateRenderResponseDTO } from '../../../../application/dtos/responses/template-response.dto.js';

const RENDER_PREFIX = 'tmpl:render:';
const META_PREFIX = 'tmpl:meta:';

@Injectable()
export class TemplateCacheRepository {
  private readonly logger = new Logger(TemplateCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  private renderKey(
    templateId: string,
    version: number,
    locale: string,
    data: Readonly<Record<string, unknown>>,
  ): string {
    const hash = createHash('sha256').update(JSON.stringify(data)).digest('hex').slice(0, 16);
    return `${RENDER_PREFIX}${templateId}:v${version}:${locale}:${hash}`;
  }

  async getRender(
    templateId: string,
    version: number,
    locale: string,
    data: Readonly<Record<string, unknown>>,
  ): Promise<TemplateRenderResponseDTO | null> {
    return this.redis.get<TemplateRenderResponseDTO>(
      this.renderKey(templateId, version, locale, data),
    );
  }

  async setRender(
    templateId: string,
    version: number,
    locale: string,
    data: Readonly<Record<string, unknown>>,
    result: TemplateRenderResponseDTO,
  ): Promise<void> {
    await this.redis.set(
      this.renderKey(templateId, version, locale, data),
      result,
      CACHE_TTL.THIRTY_MINUTES,
    );
  }

  async invalidateByTemplate(templateId: string): Promise<void> {
    this.logger.debug(`Invalidate render cache for template=${templateId}`);
    // Version bump in key namespace — old entries auto-expire
    await this.redis.del(`${META_PREFIX}${templateId}`);
  }

  async recordVersion(templateId: string, version: number): Promise<void> {
    await this.redis.set(`${META_PREFIX}${templateId}`, version, CACHE_TTL.ONE_DAY);
  }

  async getVersion(templateId: string): Promise<number | null> {
    return this.redis.get<number>(`${META_PREFIX}${templateId}`);
  }
}
