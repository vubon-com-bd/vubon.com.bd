import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CartEntity } from '../entities/cart.entity';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CartRepository extends BaseRepository<CartEntity, CartIdVO> {
  findByUserId(userId: UserIdVO): Promise<CartEntity | null>;
  findActiveByUser(userId: UserIdVO): Promise<CartEntity | null>;
}
