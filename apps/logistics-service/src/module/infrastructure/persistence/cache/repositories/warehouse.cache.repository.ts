import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

const PREFIX = 'logistics:warehouse:';
export const WAREHOUSE_CACHE = Symbol('WAREHOUSE_CACHE');

@Injectable()
export class WarehouseCacheRepository {
  private readonly logger = new Logger(WarehouseCacheRepository.name);
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<WarehouseResponseDTO | null> {
    try { return await this.redis.get<WarehouseResponseDTO>(`${PREFIX}${id}`); }
    catch (err) { this.logger.debug(`cache get failed: ${this.errMsg(err)}`); return null; }
  }
  async set(id: string, dto: WarehouseResponseDTO, ttl: number = CACHE_TTL.FIFTEEN_MINUTES): Promise<void> {
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
