import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { UpdateUserRequestDTO } from '../../dtos/requests/user/update-user.dto';

export class UpdateUserCommand extends BaseCommand {
  readonly type = 'user.update';
  constructor(
    public readonly userId: UserId,
    public readonly input: UpdateUserRequestDTO,
  ) { super(); }
}
