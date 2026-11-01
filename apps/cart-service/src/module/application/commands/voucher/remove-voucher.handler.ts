import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveVoucherCommand } from './remove-voucher.command.js';
import {
  CART_VOUCHER_SERVICE,
  type ICartVoucherService,
} from '../../services/interfaces/cart-voucher.service.interface.js';
import type { CartActionResponseDTO } from '../../dtos/responses/cart-response.dto.js';

@CommandHandler(RemoveVoucherCommand)
export class RemoveVoucherHandler
  implements ICommandHandler<RemoveVoucherCommand, CartActionResponseDTO>
{
  constructor(
    @Inject(CART_VOUCHER_SERVICE)
    private readonly service: ICartVoucherService,
  ) {}

  async execute(c: RemoveVoucherCommand): Promise<CartActionResponseDTO> {
    return this.service.remove(c.dto, c.actorId);
  }
}
