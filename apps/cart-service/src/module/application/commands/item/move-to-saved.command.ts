import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MoveToSavedRequestDTO } from '../../dtos/requests/item/move-to-saved.dto.js';

export class MoveToSavedCommand extends BaseCommand {
  readonly type = 'cart.item.move-to-saved';
  constructor(public readonly dto: MoveToSavedRequestDTO) { super(); }
}
