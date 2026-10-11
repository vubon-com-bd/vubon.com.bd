import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateQuietHoursRequestDTO } from '../../dtos/requests/preference/preference.dto.js';

export class UpdateQuietHoursCommand extends BaseCommand {
  readonly type = 'preference.update_quiet_hours';
  constructor(public readonly dto: UpdateQuietHoursRequestDTO) {
    super();
  }
}
