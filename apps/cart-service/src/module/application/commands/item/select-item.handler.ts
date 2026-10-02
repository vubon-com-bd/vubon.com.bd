import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SelectItemCommand } from './select-item.command.js';
import {
  CART_REPOSITORY,
  type CartRepository,
} from '../../../domain/repositories/cart.repository.interface.js';
import { CartMapper } from '../../mappers/cart.mapper.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';
import { CartNotFoundApplicationError } from '../../errors/cart.errors.js';

@CommandHandler(SelectItemCommand)
export class SelectItemHandler implements ICommandHandler<SelectItemCommand, CartResponseDTO> {
  constructor(@Inject(CART_REPOSITORY) private readonly cartRepo: CartRepository) {}

  async execute(c: SelectItemCommand): Promise<CartResponseDTO> {
    const cart = await this.cartRepo.findById(c.dto.cartId);
    if (!cart) throw new CartNotFoundApplicationError(c.dto.cartId);
    cart.selectItem(c.dto.itemId, c.dto.selected);
    const saved = await this.cartRepo.save(cart);
    return CartMapper.toResponse(saved);
  }
}
