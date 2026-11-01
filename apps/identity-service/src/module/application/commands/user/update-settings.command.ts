import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/user/update-settings.dto.js';
export class UpdateSettingsCommand extends BaseCommand {
  readonly type = 'user.update-settings';
  readonly commandType = 'user.update-settings';
  constructor(public readonly userId: string, public readonly input: UpdateSettingsRequestDTO) { super(); }
}
