import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateAuthSettingsRequestDTO } from '../../dtos/requests/settings/update-auth-settings.dto.js';
export class UpdateAuthSettingsCommand extends BaseCommand {
  readonly type = 'settings.update-auth';
  readonly commandType = 'settings.update-auth';
  constructor(public readonly input: UpdateAuthSettingsRequestDTO, public readonly updatedBy?: string) { super(); }
}
