import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ToggleChannelRequestDTO } from '../../dtos/requests/preference/preference.dto.js';

export class ToggleChannelCommand extends BaseCommand {
  readonly type = 'preference.toggle_channel';
  constructor(public readonly dto: ToggleChannelRequestDTO) {
    super();
  }
}
