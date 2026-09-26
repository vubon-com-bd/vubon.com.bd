import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { UpdateAuthPreferencesRequestDTO } from '../../dtos/requests/settings/update-auth-preferences.dto';

export class UpdateAuthPreferencesCommand extends BaseCommand {
  readonly type = 'settings.update-auth-preferences';
  constructor(
    public readonly userId: UserId,
    public readonly input: UpdateAuthPreferencesRequestDTO,
  ) { super(); }
}
