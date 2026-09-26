import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UnsuspendUserRequestDTO } from '../../dtos/requests/user/unsuspend-user.dto';

export class UnsuspendUserCommand extends BaseCommand {
  readonly type = 'user.unsuspend';
  constructor(public readonly input: UnsuspendUserRequestDTO) { super(); }
}
