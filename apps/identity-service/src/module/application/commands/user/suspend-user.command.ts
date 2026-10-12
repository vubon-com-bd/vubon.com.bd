import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SuspendUserRequestDTO } from '../../dtos/requests/user/suspend-user.dto.js';
export class SuspendUserCommand extends BaseCommand {
  readonly type = 'user.suspend';
  readonly commandType = 'user.suspend';
  constructor(public readonly input: SuspendUserRequestDTO, public readonly suspendedBy?: string) { super(); }
}
