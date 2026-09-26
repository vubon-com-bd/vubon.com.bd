import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { UpdateProfileRequestDTO } from '../../dtos/requests/user/update-profile.dto';

export class UpdateProfileCommand extends BaseCommand {
  readonly type = 'user.update-profile';
  constructor(
    public readonly userId: UserId,
    public readonly input: UpdateProfileRequestDTO,
  ) { super(); }
}
