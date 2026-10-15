/**
 * CartVoucherRedisRepository — stub
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Injectable } from '@nestjs/common';
import type { CartVoucherRepository } from '../../../../domain/repositories/cart-voucher.repository.interface.js';
import { CartVoucherEntity } from '../../../../domain/entities/cart-voucher.entity.js';
import { CartRedisService } from '../redis.service.js';

@Injectable()
export class CartVoucherRedisRepository implements CartVoucherRepository {
  constructor(private readonly redis: CartRedisService) {
    void this.redis;
  }

  async findById(_id: string): Promise<CartVoucherEntity | null> {
    return null;
  }
  async findAll(): Promise<readonly CartVoucherEntity[]> {
    return [];
  }
  async exists(_id: string): Promise<boolean> {
    return false;
  }
  async save(entity: CartVoucherEntity): Promise<CartVoucherEntity> {
    return entity;
  }
  async delete(_id: string): Promise<void> {}
  async findByCartId(_cartId: string): Promise<readonly CartVoucherEntity[]> {
    return [];
  }
  async findUsableByCartId(_cartId: string): Promise<CartVoucherEntity | null> {
    return null;
  }
  async existsByCartAndCode(_cartId: string, _code: string): Promise<boolean> {
    return false;
  }
  async findByCartAndCode(
    _cartId: string,
    _code: string,
  ): Promise<CartVoucherEntity | null> {
    return null;
  }
  async findByCode(_code: string): Promise<readonly CartVoucherEntity[]> {
    return [];
  }
  async findByStatus(_status: string): Promise<readonly CartVoucherEntity[]> {
    return [];
  }
  async findExpired(_beforeDate: Date): Promise<readonly CartVoucherEntity[]> {
    return [];
  }
  async findPaginated(_options: unknown): Promise<never> {
    throw new Error('Not implemented');
  }
  async getStats(_filter?: unknown): Promise<never> {
    throw new Error('Not implemented');
  }
  async deleteByCartId(_cartId: string): Promise<number> {
    return 0;
  }
  async bulkUpdateStatus(_ids: readonly string[], _status: string): Promise<number> {
    return 0;
  }
  async softDelete(_id: string, _deletedBy?: string): Promise<void> {}
  async restore(_id: string): Promise<void> {}
}
