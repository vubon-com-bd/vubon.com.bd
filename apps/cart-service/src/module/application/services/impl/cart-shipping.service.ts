import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CartShippingServiceInterface } from '../interfaces/cart-shipping.service.interface';
import type { CartShippingRepository } from '../../../domain/repositories/cart-shipping.repository.interface';
import { CartShippingEntity } from '../../../domain/entities/cart-shipping.entity';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';

@Injectable()
export class CartShippingService
  extends BaseService<CartShippingEntity, string>
  implements CartShippingServiceInterface
{
  readonly name = 'CartShippingService';

  constructor(
    @Inject('CartShippingRepository')
    private readonly shippingRepo: CartShippingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async findByCart(cartId: string): Promise<CartShippingEntity | null> {
    return this.shippingRepo.findByCartId(CartIdVO.create(cartId));
  }
}
