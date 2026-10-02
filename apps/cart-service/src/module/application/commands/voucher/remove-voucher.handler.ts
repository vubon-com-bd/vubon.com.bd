import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveVoucherCommand } from './remove-voucher.command.js';
import { CART_VOUCHER_SERVICE, type ICartVoucherService } from '../../services/interfaces/cart-voucher.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(RemoveVoucherCommand)
export class RemoveVoucherHandler implements ICommandHandler<RemoveVoucherCommand, CartResponseDTO> {
  constructor(@Inject(CART_VOUCHER_SERVICE) private readonly service: ICartVoucherService) {}
  async execute(c: RemoveVoucherCommand): Promise<CartResponseDTO> {
    return this.service.remove(c.dto);
  }
}
