/**
 * CartTaxRedisRepository — stub
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Injectable } from '@nestjs/common';
import type { CartTaxRepository } from '../../../../domain/repositories/cart-tax.repository.interface.js';
import { CartTaxEntity } from '../../../../domain/entities/cart-tax.entity.js';
import { CartRedisService } from '../redis.service.js';

@Injectable()
export class CartTaxRedisRepository implements CartTaxRepository {
  constructor(private readonly redis: CartRedisService) {
    void this.redis;
  }

  async findById(_id: string): Promise<CartTaxEntity | null> {
    return null;
  }
  async findAll(): Promise<readonly CartTaxEntity[]> {
    return [];
  }
  async exists(_id: string): Promise<boolean> {
    return false;
  }
  async save(entity: CartTaxEntity): Promise<CartTaxEntity> {
    return entity;
  }
  async delete(_id: string): Promise<void> {}
  async findByCartId(_cartId: string): Promise<readonly CartTaxEntity[]> {
    return [];
  }
  async findInclusiveByCartId(_cartId: string): Promise<readonly CartTaxEntity[]> {
    return [];
  }
  async findExclusiveByCartId(_cartId: string): Promise<readonly CartTaxEntity[]> {
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
  async recalculateByCartId(_cartId: string, _baseAmount: number): Promise<number> {
    return 0;
  }
  async softDelete(_id: string, _deletedBy?: string): Promise<void> {}
  async restore(_id: string): Promise<void> {}
}
