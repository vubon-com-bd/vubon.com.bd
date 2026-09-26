import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateQuantityCommand } from './update-quantity.command';
import type { CartItemRepository } from '../../../domain/repositories/cart-item.repository.interface';
import { CartItemIdVO } from '../../../domain/value-objects/primitives/cart-item-id.vo';
import { CartItemQuantityVO } from '../../../domain/value-objects/primitives/cart-item-quantity.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartItemOperationFailedError } from '../../errors/cart-item.errors';

@CommandHandler(UpdateQuantityCommand)
export class UpdateQuantityHandler
  extends BaseCommandHandler<UpdateQuantityCommand, CartResponseDTO>
  implements ICommandHandler<UpdateQuantityCommand>
{
  readonly commandType = 'cart.item.update_quantity';

  constructor(
    @Inject('CartItemRepository')
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateQuantityCommand): Promise<CartResponseDTO> {
    const item = await this.itemRepo.findById(CartItemIdVO.create(command.itemId));
    if (!item) {
      throw new CartItemOperationFailedError('item not found');
    }
    const updated = item.updateQuantity(CartItemQuantityVO.create(command.quantity));
    await this.itemRepo.save(updated);
    void this.eventBus;
    throw new CartItemOperationFailedError('not yet wired');
  }
}
