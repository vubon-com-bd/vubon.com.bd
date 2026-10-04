/**
 * Cart Tax Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartTaxEntity } from '../entities/cart-tax.entity.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

export const CART_TAX_REPOSITORY = Symbol('CART_TAX_REPOSITORY');

export interface CartTaxRepository extends BaseRepository<CartTaxEntity, string> {
  findByCartId(cartId: CartIdVO): Promise<CartTaxEntity | null>;
  findByRegion(region: string): Promise<readonly CartTaxEntity[]>;
  upsertForCart(cartId: CartIdVO, entity: CartTaxEntity): Promise<CartTaxEntity>;
  deleteByCartId(cartId: CartIdVO): Promise<number>;
}
