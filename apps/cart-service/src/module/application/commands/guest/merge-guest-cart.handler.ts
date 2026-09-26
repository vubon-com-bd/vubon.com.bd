import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { MergeGuestCartCommand } from './merge-guest-cart.command';
import type { GuestCartRepository } from '../../../domain/repositories/guest-cart.repository.interface';
import type { CartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartMergeService } from '../../../domain/services/cart-merge.service';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(MergeGuestCartCommand)
export class MergeGuestCartHandler
  extends BaseCommandHandler<MergeGuestCartCommand, MergeResponseDTO>
  implements ICommandHandler<MergeGuestCartCommand>
{
  readonly commandType = 'cart.guest.merge';

  constructor(
    @Inject('GuestCartRepository')
    private readonly guestRepo: GuestCartRepository,
    @Inject('CartRepository')
    private readonly cartRepo: CartRepository,
    private readonly mergeService: CartMergeService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: MergeGuestCartCommand): Promise<MergeResponseDTO> {
    void this.guestRepo;
    void this.cartRepo;
    void this.mergeService;
    void this.eventBus;
    void command;
    throw new CartOperationFailedError('not yet wired');
  }
}
