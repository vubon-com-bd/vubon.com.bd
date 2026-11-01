import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MoveToSavedRequestDTO } from '../../dtos/requests/item/index.js';

export class MoveToSavedCommand extends BaseCommand {
  readonly type = 'cart.item.move_to_saved';

  constructor(
    public readonly dto: MoveToSavedRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
