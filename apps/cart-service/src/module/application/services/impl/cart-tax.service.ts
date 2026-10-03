/**
 * CartTaxService — implements ICartTaxService
 */
import { Inject, Injectable } from '@nestjs/common';
import type { ICartTaxService } from '../interfaces/cart-tax.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartCalculationService } from '../../../domain/services/cart-calculation.service.js';
import { CartMapper } from '../../mappers/cart.mapper.js';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

@Injectable()
export class CartTaxService implements ICartTaxService {
  private readonly calc = new CartCalculationService();

  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) {}

  async calculate(
    cartId: string,
    taxRate = 0,
    inclusive = false,
  ): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(cartId);
    const totals = this.calc.calculate({
      cart,
      taxRate: taxRate
        ? // eslint-disable-next-line @typescript-eslint/no-var-requires
          (await import('../../../domain/value-objects/primitives/cart-tax-rate.vo.js')).CartTaxRateVO.create(taxRate)
        : undefined,
      taxInclusive: inclusive,
    });
    return CartMapper.totalsToResponse(totals);
  }

  async getForCart(cartId: string): Promise<CartTotalsResponseDTO> {
    const cart = await this.loadCart(cartId);
    return CartMapper.totalsToResponse(cart.totals);
  }

  private async loadCart(cartId: string): Promise<CartEntity> {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundApplicationError(cartId);
    return cart;
  }
}
