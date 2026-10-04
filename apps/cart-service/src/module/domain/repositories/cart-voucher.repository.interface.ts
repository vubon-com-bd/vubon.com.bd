/**
 * Cart Voucher Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartVoucherEntity } from '../entities/cart-voucher.entity.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

export const CART_VOUCHER_REPOSITORY = Symbol('CART_VOUCHER_REPOSITORY');

export interface CartVoucherRepository extends BaseRepository<CartVoucherEntity, string> {
  findByCartId(cartId: CartIdVO): Promise<CartVoucherEntity | null>;
  findByCode(cartId: CartIdVO, code: string): Promise<CartVoucherEntity | null>;
  findUsableByCartId(cartId: CartIdVO): Promise<CartVoucherEntity | null>;
  existsByCartId(cartId: CartIdVO): Promise<boolean>;
  deleteByCartId(cartId: CartIdVO): Promise<number>;
}
