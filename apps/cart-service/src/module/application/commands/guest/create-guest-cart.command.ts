import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateGuestCartRequestDTO } from '../../dtos/requests/guest/index.js';

export class CreateGuestCartCommand extends BaseCommand {
  readonly type = 'cart.guest.create';

  constructor(
    public readonly dto: CreateGuestCartRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
