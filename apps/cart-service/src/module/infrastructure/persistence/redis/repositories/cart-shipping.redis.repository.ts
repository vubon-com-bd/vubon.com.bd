/**
 * CartShippingRedisRepository — stub
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Injectable } from '@nestjs/common';
import type { CartShippingRepository } from '../../../../domain/repositories/cart-shipping.repository.interface.js';
import { CartShippingEntity } from '../../../../domain/entities/cart-shipping.entity.js';
import { CartRedisService } from '../redis.service.js';

@Injectable()
export class CartShippingRedisRepository implements CartShippingRepository {
  constructor(private readonly redis: CartRedisService) {
    void this.redis;
  }

  async findById(_id: string): Promise<CartShippingEntity | null> {
    return null;
  }
  async findAll(): Promise<readonly CartShippingEntity[]> {
    return [];
  }
  async exists(_id: string): Promise<boolean> {
    return false;
  }
  async save(entity: CartShippingEntity): Promise<CartShippingEntity> {
    return entity;
  }
  async delete(_id: string): Promise<void> {}
  async findByCartId(_cartId: string): Promise<CartShippingEntity | null> {
    return null;
  }
  async findByMethod(_method: string): Promise<readonly CartShippingEntity[]> {
    return [];
  }
  async findWithoutAddress(): Promise<readonly CartShippingEntity[]> {
    return [];
  }
  async findWithAddress(): Promise<readonly CartShippingEntity[]> {
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
  async softDelete(_id: string, _deletedBy?: string): Promise<void> {}
  async restore(_id: string): Promise<void> {}
}
