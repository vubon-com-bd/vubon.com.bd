import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/user/update-preferences.dto.js';
export class UpdatePreferencesCommand extends BaseCommand {
  readonly type = 'user.update-preferences';
  readonly commandType = 'user.update-preferences';
  constructor(public readonly userId: string, public readonly input: UpdatePreferencesRequestDTO) { super(); }
}
