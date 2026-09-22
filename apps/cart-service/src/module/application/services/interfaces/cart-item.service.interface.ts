import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CartItemEntity } from '../../../domain/entities/cart-item.entity';
import type { CartItemResponseDTO } from '../../dtos/responses/cart-item-response.dto';

export interface CartItemServiceInterface
  extends BaseServiceInterface<CartItemEntity, string> {
  listByCart(cartId: string): Promise<readonly CartItemResponseDTO[]>;
  findById(itemId: string): Promise<CartItemResponseDTO | null>;
}
