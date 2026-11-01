/**
 * ProductVariantCacheRepository
 * @module product-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { VariantResponseDTO } from '../../../../application/dtos/responses/variant-response.dto.js';

const PREFIX = 'product:variant:';
const LIST_PREFIX = 'product:variant:list:';

@Injectable()
export class ProductVariantCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<VariantResponseDTO | null> {
    return this.redis.get<VariantResponseDTO>(`${PREFIX}${id}`);
  }

  async set(id: string, dto: VariantResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
  }

  async invalidateListByProduct(productId: string): Promise<void> {
    await this.redis.del(`${LIST_PREFIX}product:${productId}`);
  }

  async getListByProduct(productId: string): Promise<readonly VariantResponseDTO[] | null> {
    return this.redis.get<readonly VariantResponseDTO[]>(
      `${LIST_PREFIX}product:${productId}`,
    );
  }

  async setListByProduct(
    productId: string,
    list: readonly VariantResponseDTO[],
  ): Promise<void> {
    await this.redis.set(
      `${LIST_PREFIX}product:${productId}`,
      list,
      CACHE_TTL.FIVE_MINUTES,
    );
  }
}
