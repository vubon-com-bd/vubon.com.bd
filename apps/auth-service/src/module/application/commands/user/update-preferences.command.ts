import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { UpdatePreferencesRequestDTO } from '../../dtos/requests/user/update-preferences.dto';

export class UpdatePreferencesCommand extends BaseCommand {
  readonly type = 'user.update-preferences';
  constructor(
    public readonly userId: UserId,
    public readonly input: UpdatePreferencesRequestDTO,
  ) { super(); }
}
