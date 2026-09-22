import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CartTaxServiceInterface } from '../interfaces/cart-tax.service.interface';
import type { CartTaxRepository } from '../../../domain/repositories/cart-tax.repository.interface';
import { CartTaxEntity } from '../../../domain/entities/cart-tax.entity';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';

@Injectable()
export class CartTaxService
  extends BaseService<CartTaxEntity, string>
  implements CartTaxServiceInterface
{
  readonly name = 'CartTaxService';

  constructor(
    @Inject('CartTaxRepository')
    private readonly taxRepo: CartTaxRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async listByCart(cartId: string): Promise<readonly CartTaxEntity[]> {
    return this.taxRepo.findByCartId(CartIdVO.create(cartId));
  }
}
