import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateCartCommand } from './update-cart.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartIdVO } from '../../../domain/value-objects/primitives/cart-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(UpdateCartCommand)
export class UpdateCartHandler
  extends BaseCommandHandler<UpdateCartCommand, CartResponseDTO>
  implements ICommandHandler<UpdateCartCommand>
{
  readonly commandType = 'cart.update';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateCartCommand): Promise<CartResponseDTO> {
    const entity = await this.cartRepo.findById(CartIdVO.create(command.cartId));
    if (!entity) {
      throw new CartOperationFailedError('cart not found');
    }
    void this.eventBus;
    throw new CartOperationFailedError('not yet wired');
  }
}
