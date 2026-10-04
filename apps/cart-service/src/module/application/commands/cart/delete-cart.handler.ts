import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteCartCommand } from './delete-cart.command.js';
import { CART_SERVICE, type ICartService } from '../../services/interfaces/cart.service.interface.js';

@CommandHandler(DeleteCartCommand)
export class DeleteCartHandler implements ICommandHandler<DeleteCartCommand, void> {
  constructor(@Inject(CART_SERVICE) private readonly service: ICartService) {}
  async execute(c: DeleteCartCommand): Promise<void> {
    return this.service.delete(c.dto);
  }
}
