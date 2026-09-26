import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { DeleteUserRequestDTO } from '../../dtos/requests/user/delete-user.dto';

export class DeleteUserCommand extends BaseCommand {
  readonly type = 'user.delete';
  constructor(
    public readonly userId: UserId,
    public readonly input: DeleteUserRequestDTO,
  ) { super(); }
}
