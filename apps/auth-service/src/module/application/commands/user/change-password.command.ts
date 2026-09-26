import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { ChangePasswordRequestDTO } from '../../dtos/requests/user/change-password.dto';

export class ChangePasswordCommand extends BaseCommand {
  readonly type = 'user.change-password';
  constructor(
    public readonly userId: UserId,
    public readonly input: ChangePasswordRequestDTO,
  ) { super(); }
}
