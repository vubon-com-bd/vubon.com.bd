import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateGuestCartCommand } from './create-guest-cart.command.js';
import {
  GUEST_CART_SERVICE,
  type IGuestCartService,
} from '../../services/interfaces/guest-cart.service.interface.js';
import type { GuestCartInitiateResponseDTO } from '../../dtos/responses/guest-cart-response.dto.js';

@CommandHandler(CreateGuestCartCommand)
export class CreateGuestCartHandler
  implements ICommandHandler<CreateGuestCartCommand, GuestCartInitiateResponseDTO>
{
  constructor(
    @Inject(GUEST_CART_SERVICE)
    private readonly service: IGuestCartService,
  ) {}

  async execute(c: CreateGuestCartCommand): Promise<GuestCartInitiateResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
