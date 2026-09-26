import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ActivateUserRequestDTO } from '../../dtos/requests/user/activate-user.dto';

export class ActivateUserCommand extends BaseCommand {
  readonly type = 'user.activate';
  constructor(public readonly input: ActivateUserRequestDTO) { super(); }
}
