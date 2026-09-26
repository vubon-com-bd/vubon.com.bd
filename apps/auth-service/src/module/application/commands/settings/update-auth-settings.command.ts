import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { UpdateAuthSettingsRequestDTO } from '../../dtos/requests/settings/update-auth-settings.dto';

export class UpdateAuthSettingsCommand extends BaseCommand {
  readonly type = 'settings.update-auth';
  constructor(
    public readonly userId: UserId,
    public readonly input: UpdateAuthSettingsRequestDTO,
  ) { super(); }
}
