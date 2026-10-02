import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemoveSavedRequestDTO } from '../../dtos/requests/saved/remove-saved.dto.js';

export class RemoveSavedCommand extends BaseCommand {
  readonly type = 'saved.remove';
  constructor(public readonly dto: RemoveSavedRequestDTO) { super(); }
}
