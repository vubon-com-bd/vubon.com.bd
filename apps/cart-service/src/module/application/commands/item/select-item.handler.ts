import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SelectItemCommand } from './select-item.command';
import type { CartItemRepository } from '../../../domain/repositories/cart-item.repository.interface';
import { CartItemIdVO } from '../../../domain/value-objects/primitives/cart-item-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartItemOperationFailedError } from '../../errors/cart-item.errors';

@CommandHandler(SelectItemCommand)
export class SelectItemHandler
  extends BaseCommandHandler<SelectItemCommand, CartResponseDTO>
  implements ICommandHandler<SelectItemCommand>
{
  readonly commandType = 'cart.item.select';

  constructor(
    @Inject('CartItemRepository')
    private readonly itemRepo: CartItemRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SelectItemCommand): Promise<CartResponseDTO> {
    const item = await this.itemRepo.findById(CartItemIdVO.create(command.itemId));
    if (!item) {
      throw new CartItemOperationFailedError('item not found');
    }
    const updated = item.toggleSelection();
    await this.itemRepo.save(updated);
    void this.eventBus;
    throw new CartItemOperationFailedError('not yet wired');
  }
}
