import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePreferenceRequestDTO } from '../../dtos/requests/preference/preference.dto.js';

export class UpdatePreferenceCommand extends BaseCommand {
  readonly type = 'preference.update';
  constructor(public readonly dto: UpdatePreferenceRequestDTO) {
    super();
  }
}
