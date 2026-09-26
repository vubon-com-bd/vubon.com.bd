import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { DisableMfaRequestDTO } from '../../dtos/requests/auth/disable-mfa.dto';

export class DisableMfaCommand extends BaseCommand {
  readonly type = 'auth.disable-mfa';
  constructor(
    public readonly userId: UserId,
    public readonly input: DisableMfaRequestDTO,
  ) { super(); }
}
