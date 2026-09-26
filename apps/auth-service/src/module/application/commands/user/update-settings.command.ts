import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { UpdateSettingsRequestDTO } from '../../dtos/requests/user/update-settings.dto';

export class UpdateSettingsCommand extends BaseCommand {
  readonly type = 'user.update-settings';
  constructor(
    public readonly userId: UserId,
    public readonly input: UpdateSettingsRequestDTO,
  ) { super(); }
}
