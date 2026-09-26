import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { VerifyMfaRequestDTO } from '../../dtos/requests/auth/verify-mfa.dto';

export class VerifyMfaCommand extends BaseCommand {
  readonly type = 'auth.verify-mfa';
  constructor(
    public readonly input: VerifyMfaRequestDTO,
    public readonly userId?: UserId,
  ) { super(); }
}
