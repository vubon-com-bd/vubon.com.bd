import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateGuestCartCommand } from './create-guest-cart.command';
import type { GuestCartRepository } from '../../../domain/repositories/guest-cart.repository.interface';
import type { GuestCartResponseDTO } from '../../dtos/responses/guest-cart-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(CreateGuestCartCommand)
export class CreateGuestCartHandler
  extends BaseCommandHandler<CreateGuestCartCommand, GuestCartResponseDTO>
  implements ICommandHandler<CreateGuestCartCommand>
{
  readonly commandType = 'cart.guest.create';

  constructor(
    @Inject('GuestCartRepository')
    private readonly guestRepo: GuestCartRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateGuestCartCommand): Promise<GuestCartResponseDTO> {
    void this.guestRepo;
    void this.eventBus;
    void command;
    throw new CartOperationFailedError('not yet wired');
  }
}
