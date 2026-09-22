import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateItemCommand } from './update-item.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartItemOperationFailedError } from '../../errors/cart-item.errors';

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler
  extends BaseCommandHandler<UpdateItemCommand, CartResponseDTO>
  implements ICommandHandler<UpdateItemCommand>
{
  readonly commandType = 'cart.item.update';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateItemCommand): Promise<CartResponseDTO> {
    const cart = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!cart) {
      throw new CartItemOperationFailedError('cart not found');
    }
    void this.eventBus;
    throw new CartItemOperationFailedError('not yet wired');
  }
}
