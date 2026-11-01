import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { PackagingResponseDTO } from '@application/dtos/responses/packaging/index.js';

const PREFIX = 'logistics:packaging:';
export const PACKAGING_CACHE = Symbol('PACKAGING_CACHE');

@Injectable()
export class PackagingCacheRepository {
  private readonly logger = new Logger(PackagingCacheRepository.name);
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<PackagingResponseDTO | null> {
    try { return await this.redis.get<PackagingResponseDTO>(`${PREFIX}${id}`); }
    catch (err) { this.logger.debug(`cache get failed: ${this.errMsg(err)}`); return null; }
  }
  async set(id: string, dto: PackagingResponseDTO, ttl: number = CACHE_TTL.FIFTEEN_MINUTES): Promise<void> {
    try { await this.redis.raw.set(`${PREFIX}${id}`, JSON.stringify(dto), 'EX', ttl); }
    catch (err) { this.logger.debug(`cache set failed: ${this.errMsg(err)}`); }
  }
  async invalidate(id: string): Promise<void> {
    try { await this.redis.raw.del(`${PREFIX}${id}`); }
    catch (err) { this.logger.debug(`cache invalidate failed: ${this.errMsg(err)}`); }
  }
  async invalidateAll(): Promise<void> {
    try { const keys = await this.redis.raw.keys(`${PREFIX}*`); if (keys.length > 0) await this.redis.raw.del(...keys); }
    catch (err) { this.logger.debug(`invalidateAll failed: ${this.errMsg(err)}`); }
  }
  private errMsg(err: unknown): string { return err instanceof Error ? err.message : 'unknown'; }
}
