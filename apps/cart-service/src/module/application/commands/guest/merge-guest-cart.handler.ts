import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MergeGuestCartCommand } from './merge-guest-cart.command.js';
import { CART_MERGER_SERVICE, type ICartMergerService } from '../../services/interfaces/cart-merger.service.interface.js';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto.js';

@CommandHandler(MergeGuestCartCommand)
export class MergeGuestCartHandler implements ICommandHandler<MergeGuestCartCommand, MergeResponseDTO> {
  constructor(@Inject(CART_MERGER_SERVICE) private readonly service: ICartMergerService) {}
  async execute(c: MergeGuestCartCommand): Promise<MergeResponseDTO> {
    return this.service.mergeGuestCart(c.dto);
  }
}
