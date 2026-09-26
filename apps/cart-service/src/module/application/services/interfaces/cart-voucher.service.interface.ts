import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CartVoucherEntity } from '../../../domain/entities/cart-voucher.entity';
import type { VoucherResponseDTO } from '../../dtos/responses/voucher-response.dto';

export interface CartVoucherServiceInterface
  extends BaseServiceInterface<CartVoucherEntity, string> {
  findByCart(cartId: string): Promise<VoucherResponseDTO | null>;
}
