import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CartItemServiceInterface } from '../interfaces/cart-item.service.interface';
import type { CartItemRepository } from '../../../domain/repositories/cart-item.repository.interface';
import { CartItemEntity } from '../../../domain/entities/cart-item.entity';
import { CartItemIdVO } from '../../../domain/value-objects/primitives/cart-item-id.vo';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartItemResponseDTO } from '../../dtos/responses/cart-item-response.dto';

@Injectable()
export class CartItemService
  extends BaseService<CartItemEntity, string>
  implements CartItemServiceInterface
{
  readonly name = 'CartItemService';

  constructor(
    @Inject('CartItemRepository')
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByCart(cartId: string): Promise<readonly CartItemResponseDTO[]> {
    const entities = await this.itemRepo.findByCartId(CartIdVO.create(cartId));
    return entities.map((e) => this.toDTO(e));
  }

  async findById(itemId: string): Promise<CartItemResponseDTO | null> {
    const entity = await this.itemRepo.findById(CartItemIdVO.create(itemId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: CartItemEntity): CartItemResponseDTO {
    return {
      id: entity.id.value,
      cartId: '',
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      vendorId: entity.vendorId?.value,
      quantity: entity.quantity.quantity,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
      currency: entity.currency,
      status: entity.status.value,
      note: entity.note?.value,
      selected: entity.selected,
    };
  }
}
