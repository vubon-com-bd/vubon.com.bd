/**
 * CartVoucherRedisRepository
 * @module cart-service/infrastructure/persistence/redis/repositories
 */
import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { CartVoucherRepository } from '../../../../domain/repositories/cart-voucher.repository.interface.js';
import { CartVoucherEntity } from '../../../../domain/entities/cart-voucher.entity.js';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '../../../../domain/value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../../../../domain/value-objects/primitives/voucher-status.vo.js';
import { VOUCHER_KEYS } from '../keys/coupon.keys.js';

interface Serialized {
  id: string;
  cartId: string;
  code: string;
  status: string;
  amount: number;
  remainingAmount: number;
  currency: string;
  expiresAt: string;
  partialRedeemAllowed: boolean;
  appliedAt: string;
}

@Injectable()
export class CartVoucherRedisRepository implements CartVoucherRepository {
  private readonly ttl = CACHE_TTL.SEVEN_DAYS;

  constructor(@Inject(RedisService) private readonly redis: RedisService) {}

  async findById(id: string): Promise<CartVoucherEntity | null> {
    const raw = await this.redis.get<Serialized>(`cart-voucher:${id}`);
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CartVoucherEntity[]> {
    return [];
  }

  async save(e: CartVoucherEntity): Promise<CartVoucherEntity> {
    await this.redis.set(VOUCHER_KEYS.cartVoucher(e.cartId.value), this.toPersistence(e), this.ttl);
    return e;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(`cart-voucher:${id}`);
  }

  async exists(id: string): Promise<boolean> {
    return this.redis.exists(`cart-voucher:${id}`);
  }

  async findByCartId(cartId: CartIdVO): Promise<CartVoucherEntity | null> {
    const raw = await this.redis.get<Serialized>(VOUCHER_KEYS.cartVoucher(cartId.value));
    return raw ? this.toDomain(raw) : null;
  }

  async findByCode(cartId: CartIdVO, code: string): Promise<CartVoucherEntity | null> {
    const v = await this.findByCartId(cartId);
    return v && v.code.value === code.toUpperCase() ? v : null;
  }

  async findUsableByCartId(cartId: CartIdVO): Promise<CartVoucherEntity | null> {
    const v = await this.findByCartId(cartId);
    return v && v.isUsable() ? v : null;
  }

  async existsByCartId(cartId: CartIdVO): Promise<boolean> {
    return (await this.findByCartId(cartId)) !== null;
  }

  async deleteByCartId(cartId: CartIdVO): Promise<number> {
    const existed = await this.existsByCartId(cartId);
    await this.redis.del(VOUCHER_KEYS.cartVoucher(cartId.value));
    return existed ? 1 : 0;
  }

  private toPersistence(v: CartVoucherEntity): Serialized {
    return {
      id: v.id,
      cartId: v.cartId.value,
      code: v.code.value,
      status: v.status.value,
      amount: v.amount,
      remainingAmount: v.remainingAmount,
      currency: v.currency,
      expiresAt: v.expiresAt,
      partialRedeemAllowed: v.partialRedeemAllowed,
      appliedAt: v.appliedAt,
    };
  }

  private toDomain(raw: Serialized): CartVoucherEntity {
    return CartVoucherEntity.reconstitute({
      id: raw.id,
      createdAt: raw.appliedAt,
      updatedAt: raw.appliedAt,
      props: {
        cartId: CartIdVO.reconstitute(raw.cartId),
        code: VoucherCodeVO.reconstitute(raw.code),
        status: VoucherStatusVO.reconstitute(raw.status),
        amount: raw.amount,
        remainingAmount: raw.remainingAmount,
        currency: raw.currency,
        expiresAt: raw.expiresAt,
        partialRedeemAllowed: raw.partialRedeemAllowed,
        appliedAt: raw.appliedAt,
      },
    });
  }
}
