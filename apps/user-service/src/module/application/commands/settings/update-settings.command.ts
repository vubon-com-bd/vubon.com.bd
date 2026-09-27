/**
 * UpdateSettingsCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/settings/index.js';

export class UpdateSettingsCommand extends BaseCommand {
  readonly type = 'settings.update';

  constructor(public readonly payload: UpdateSettingsRequestDTO) {
    super();
  }
}
