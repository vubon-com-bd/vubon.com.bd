import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CartTaxEntity } from '../../../domain/entities/cart-tax.entity';

export interface CartTaxServiceInterface
  extends BaseServiceInterface<CartTaxEntity, string> {
  listByCart(cartId: string): Promise<readonly CartTaxEntity[]>;
}
