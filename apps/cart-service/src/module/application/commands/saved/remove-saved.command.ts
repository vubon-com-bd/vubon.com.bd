import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveSavedRequestDTO } from '../../dtos/requests/saved/index.js';

export class RemoveSavedCommand extends BaseCommand {
  readonly type = 'cart.saved.remove';

  constructor(
    public readonly dto: RemoveSavedRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
