import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { ShippingMethodResponseDTO } from '@application/dtos/responses/shipping-method/index.js';

const PREFIX = 'logistics:shipping-method:';
export const SHIPPING_METHOD_CACHE = Symbol('SHIPPING_METHOD_CACHE');

@Injectable()
export class ShippingMethodCacheRepository {
  private readonly logger = new Logger(ShippingMethodCacheRepository.name);
  constructor(private readonly redis: RedisService) {}
  async get(id: string): Promise<ShippingMethodResponseDTO | null> {
    try { return await this.redis.get<ShippingMethodResponseDTO>(`${PREFIX}${id}`); }
    catch (err) { this.logger.debug(`cache get failed: ${this.errMsg(err)}`); return null; }
  }
  async set(id: string, dto: ShippingMethodResponseDTO, ttl: number = CACHE_TTL.THIRTY_MINUTES): Promise<void> {
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
