import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CartVoucherServiceInterface } from '../interfaces/cart-voucher.service.interface';
import type { CartVoucherRepository } from '../../../domain/repositories/cart-voucher.repository.interface';
import { CartVoucherEntity } from '../../../domain/entities/cart-voucher.entity';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { VoucherResponseDTO } from '../../dtos/responses/voucher-response.dto';

@Injectable()
export class CartVoucherService
  extends BaseService<CartVoucherEntity, string>
  implements CartVoucherServiceInterface
{
  readonly name = 'CartVoucherService';

  constructor(
    @Inject('CartVoucherRepository')
    private readonly voucherRepo: CartVoucherRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByCart(cartId: string): Promise<VoucherResponseDTO | null> {
    const entity = await this.voucherRepo.findByCartId(CartIdVO.create(cartId));
    if (!entity) return null;
    return {
      code: entity.code.value,
      value: entity.value,
      status: entity.status.value,
      type: 'fixed',
      appliedAt: new Date().toISOString(),
    };
  }
}
