import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MergeGuestCartRequestDTO } from '../../dtos/requests/guest/index.js';

export class MergeGuestCartCommand extends BaseCommand {
  readonly type = 'cart.guest.merge';

  constructor(
    public readonly dto: MergeGuestCartRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
