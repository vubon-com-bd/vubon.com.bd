/**
 * PaymentCacheRepository — Redis cache for payment reads
 * @module payment-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { PaymentResponseDTO } from '@application/dtos/responses/payment-response.dto';

const PREFIX = 'payment-service:payment:';
const LIST_PREFIX = 'payment-service:payment:list:';

@Injectable()
export class PaymentCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async get(id: string): Promise<PaymentResponseDTO | null> {
    return this.redis.get<PaymentResponseDTO>(`${PREFIX}${id}`);
  }

  async set(id: string, dto: PaymentResponseDTO): Promise<void> {
    await this.redis.set(`${PREFIX}${id}`, dto, CACHE_TTL.FIVE_MINUTES);
  }

  async invalidate(id: string): Promise<void> {
    await this.redis.del(`${PREFIX}${id}`);
  }

  async invalidateList(ownerId?: string): Promise<void> {
    if (ownerId) {
      await this.redis.del(`${LIST_PREFIX}owner:${ownerId}`);
    }
  }
}
