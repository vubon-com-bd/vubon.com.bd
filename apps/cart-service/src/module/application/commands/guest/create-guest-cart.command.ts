import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateGuestCartRequestDTO } from '../../dtos/requests/guest/create-guest-cart.dto.js';

export class CreateGuestCartCommand extends BaseCommand {
  readonly type = 'guest.create';
  constructor(public readonly dto: CreateGuestCartRequestDTO) { super(); }
}
