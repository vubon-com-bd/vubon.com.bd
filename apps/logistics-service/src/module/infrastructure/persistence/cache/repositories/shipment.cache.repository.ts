/**
 * ShipmentCacheRepository — Redis cache for Shipment reads
 * @module logistics-service/infrastructure/persistence/cache/repositories
 *
 * ⚠️ Best-effort — silently fails on Redis down
 * ⚠️ Caller uses this alongside memory/prisma repo (not instead of)
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { ShipmentResponseDTO } from '@application/dtos/responses/shipment/index.js';

const PREFIX = 'logistics:shipment:';

export const SHIPMENT_CACHE = Symbol('SHIPMENT_CACHE');

@Injectable()
export class ShipmentCacheRepository {
  private readonly logger = new Logger(ShipmentCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<ShipmentResponseDTO | null> {
    try {
      return await this.redis.get<ShipmentResponseDTO>(`${PREFIX}${id}`);
    } catch (err) {
      this.logger.debug(`cache get failed: ${this.errMsg(err)}`);
      return null;
    }
  }

  async set(id: string, dto: ShipmentResponseDTO, ttl: number = CACHE_TTL.FIVE_MINUTES): Promise<void> {
    try {
      await this.redis.raw.set(`${PREFIX}${id}`, JSON.stringify(dto), 'EX', ttl);
    } catch (err) {
      this.logger.debug(`cache set failed: ${this.errMsg(err)}`);
    }
  }

  async invalidate(id: string): Promise<void> {
    try {
      await this.redis.raw.del(`${PREFIX}${id}`);
    } catch (err) {
      this.logger.debug(`cache invalidate failed: ${this.errMsg(err)}`);
    }
  }

  async invalidateAll(): Promise<void> {
    try {
      const keys = await this.redis.raw.keys(`${PREFIX}*`);
      if (keys.length > 0) await this.redis.raw.del(...keys);
    } catch (err) {
      this.logger.debug(`cache invalidate-all failed: ${this.errMsg(err)}`);
    }
  }

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
