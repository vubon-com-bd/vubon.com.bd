import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CartServiceInterface } from '../interfaces/cart.service.interface';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartEntity } from '../../../domain/entities/cart.entity';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import type { CartSummaryResponseDTO } from '../../dtos/responses/cart-summary-response.dto';

@Injectable()
export class CartService
  extends BaseService<CartEntity, string>
  implements CartServiceInterface
{
  readonly name = 'CartService';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findById(cartId: string): Promise<CartResponseDTO | null> {
    const entity = await this.cartRepo.findById(CartIdVO.create(cartId));
    return entity ? this.toDTO(entity) : null;
  }

  async findByUserId(userId: string): Promise<CartResponseDTO | null> {
    const entity = await this.cartRepo.findActiveByUser(UserIdVO.create(userId));
    return entity ? this.toDTO(entity) : null;
  }

  async getSummary(cartId: string): Promise<CartSummaryResponseDTO | null> {
    const entity = await this.cartRepo.findById(CartIdVO.create(cartId));
    if (!entity) return null;
    return {
      success: true,
      summary: {
        cartId: entity.id.value,
        status: entity.status.value,
        itemCount: entity.itemCount,
        subtotal: entity.subtotal,
        discountTotal: entity.discountTotal,
        grandTotal: entity.grandTotal,
        currency: entity.currency,
        hasCoupon: false,
        hasVoucher: false,
      },
    };
  }

  private toDTO(entity: CartEntity): CartResponseDTO {
    return {
      success: true,
      cart: {
        id: entity.id.value,
        userId: entity.userId?.value,
        type: entity.type.value,
        status: entity.status.value,
        itemCount: entity.itemCount,
        subtotal: entity.subtotal,
        discountTotal: entity.discountTotal,
        taxTotal: entity.taxTotal,
        shippingTotal: entity.shippingTotal,
        grandTotal: entity.grandTotal,
        currency: entity.currency,
        items: [],
      },
    };
  }
}
