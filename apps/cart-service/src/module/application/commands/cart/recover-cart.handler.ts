import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RecoverCartCommand } from './recover-cart.command';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import type { AbandonedCartRepository } from '../../../domain/repositories/abandoned-cart.repository.interface';
import { AbandonedCartIdVO } from '../../../domain/value-objects/primitives/abandoned-cart-id.vo';
import type { CartResponseDTO } from '../../dtos/responses/cart-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(RecoverCartCommand)
export class RecoverCartHandler
  extends BaseCommandHandler<RecoverCartCommand, CartResponseDTO>
  implements ICommandHandler<RecoverCartCommand>
{
  readonly commandType = 'cart.recover';

  constructor(
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    @Inject('AbandonedCartRepository')
    private readonly abandonedRepo: AbandonedCartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RecoverCartCommand): Promise<CartResponseDTO> {
    const abandoned = await this.abandonedRepo.findById(
      AbandonedCartIdVO.create(command.abandonedId),
    );
    if (!abandoned) {
      throw new CartOperationFailedError('abandoned cart not found');
    }
    void this.eventBus;
    throw new CartOperationFailedError('not yet wired');
  }
}
