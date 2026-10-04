/**
 * CartVoucherService — implements ICartVoucherService
 */
import { Inject, Injectable } from '@nestjs/common';
import type { ICartVoucherService } from '../interfaces/cart-voucher.service.interface.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartEntity } from '../../../domain/entities/cart.entity.js';
import { CartMapper } from '../../mappers/cart.mapper.js';
import type { ApplyVoucherRequestDTO } from '../../dtos/requests/voucher/apply-voucher.dto.js';
import type { RemoveVoucherRequestDTO } from '../../dtos/requests/voucher/remove-voucher.dto.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

@Injectable()
export class CartVoucherService implements ICartVoucherService {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository,
  ) {}

  async apply(dto: ApplyVoucherRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    const amount = Math.min(cart.totals.subtotal, cart.totals.subtotal);
    cart.applyVoucher(dto.code.toUpperCase(), amount, new Date().toISOString());
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  async remove(dto: RemoveVoucherRequestDTO): Promise<CartResponseDTO> {
    const cart = await this.loadCart(dto.cartId);
    cart.removeVoucher(dto.reason);
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }

  private async loadCart(cartId: string): Promise<CartEntity> {
    const cart = await this.cartRepo.findById(cartId);
    if (!cart) throw new CartNotFoundApplicationError(cartId);
    return cart;
  }
}
