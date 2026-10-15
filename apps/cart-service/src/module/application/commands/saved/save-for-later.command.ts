import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SaveForLaterRequestDTO } from '../../dtos/requests/saved/index.js';

export class SaveForLaterCommand extends BaseCommand {
  readonly type = 'cart.saved.save';

  constructor(
    public readonly dto: SaveForLaterRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
