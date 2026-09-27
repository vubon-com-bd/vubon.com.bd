/**
 * UpdatePreferencesCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/preferences/index.js';

export class UpdatePreferencesCommand extends BaseCommand {
  readonly type = 'preferences.update';

  constructor(public readonly payload: UpdatePreferencesRequestDTO) {
    super();
  }
}
