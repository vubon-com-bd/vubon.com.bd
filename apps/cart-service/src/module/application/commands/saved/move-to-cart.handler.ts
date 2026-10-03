import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MoveToCartCommand } from './move-to-cart.command.js';
import { SAVED_FOR_LATER_SERVICE, type ISavedForLaterService } from '../../services/interfaces/saved-for-later.service.interface.js';

@CommandHandler(MoveToCartCommand)
export class MoveToCartHandler implements ICommandHandler<MoveToCartCommand, void> {
  constructor(@Inject(SAVED_FOR_LATER_SERVICE) private readonly service: ISavedForLaterService) {}
  async execute(c: MoveToCartCommand): Promise<void> {
    return this.service.moveToCart(c.dto);
  }
}
