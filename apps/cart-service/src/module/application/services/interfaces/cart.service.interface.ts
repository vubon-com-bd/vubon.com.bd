import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CartEntity } from '../../../domain/entities/cart.entity';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import type { CartSummaryResponseDTO } from '../../dtos/responses/cart-summary-response.dto';

export interface CartServiceInterface
  extends BaseServiceInterface<CartEntity, string> {
  findById(cartId: string): Promise<CartResponseDTO | null>;
  findByUserId(userId: string): Promise<CartResponseDTO | null>;
  getSummary(cartId: string): Promise<CartSummaryResponseDTO | null>;
}
