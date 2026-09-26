import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { EnableMfaRequestDTO } from '../../dtos/requests/auth/enable-mfa.dto';

export class EnableMfaCommand extends BaseCommand {
  readonly type = 'auth.enable-mfa';
  constructor(
    public readonly userId: UserId,
    public readonly input: EnableMfaRequestDTO,
  ) { super(); }
}
