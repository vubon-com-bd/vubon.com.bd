import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SaveForLaterRequestDTO } from '../../dtos/requests/saved/save-for-later.dto.js';

export class SaveForLaterCommand extends BaseCommand {
  readonly type = 'saved.save';
  constructor(public readonly dto: SaveForLaterRequestDTO) { super(); }
}
