import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CartShippingEntity } from '../../../domain/entities/cart-shipping.entity';

export interface CartShippingServiceInterface
  extends BaseServiceInterface<CartShippingEntity, string> {
  findByCart(cartId: string): Promise<CartShippingEntity | null>;
}
