import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DeactivateUserRequestDTO } from '../../dtos/requests/user/deactivate-user.dto';

export class DeactivateUserCommand extends BaseCommand {
  readonly type = 'user.deactivate';
  constructor(public readonly input: DeactivateUserRequestDTO) { super(); }
}
