import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApplyVoucherCommand } from './apply-voucher.command.js';
import { CART_VOUCHER_SERVICE, type ICartVoucherService } from '../../services/interfaces/cart-voucher.service.interface.js';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(ApplyVoucherCommand)
export class ApplyVoucherHandler implements ICommandHandler<ApplyVoucherCommand, CartResponseDTO> {
  constructor(@Inject(CART_VOUCHER_SERVICE) private readonly service: ICartVoucherService) {}
  async execute(c: ApplyVoucherCommand): Promise<CartResponseDTO> {
    return this.service.apply(c.dto);
  }
}
