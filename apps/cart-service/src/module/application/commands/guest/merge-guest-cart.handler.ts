import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MergeGuestCartCommand } from './merge-guest-cart.command.js';
import {
  GUEST_CART_SERVICE,
  type IGuestCartService,
} from '../../services/interfaces/guest-cart.service.interface.js';
import type { MergeResponseDTO } from '../../dtos/responses/merge-response.dto.js';

@CommandHandler(MergeGuestCartCommand)
export class MergeGuestCartHandler
  implements ICommandHandler<MergeGuestCartCommand, MergeResponseDTO>
{
  constructor(
    @Inject(GUEST_CART_SERVICE)
    private readonly service: IGuestCartService,
  ) {}

  async execute(c: MergeGuestCartCommand): Promise<MergeResponseDTO> {
    return this.service.merge(c.dto, c.actorId);
  }
}
