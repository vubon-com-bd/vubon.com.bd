import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateGuestCartCommand } from './create-guest-cart.command.js';
import { GUEST_CART_SERVICE, type IGuestCartService } from '../../services/interfaces/guest-cart.service.interface.js';
import type { GuestCartResponseDTO } from '../../dtos/responses/guest-cart-response.dto.js';

@CommandHandler(CreateGuestCartCommand)
export class CreateGuestCartHandler implements ICommandHandler<CreateGuestCartCommand, GuestCartResponseDTO> {
  constructor(@Inject(GUEST_CART_SERVICE) private readonly service: IGuestCartService) {}
  async execute(c: CreateGuestCartCommand): Promise<GuestCartResponseDTO> {
    return this.service.create(c.dto);
  }
}
