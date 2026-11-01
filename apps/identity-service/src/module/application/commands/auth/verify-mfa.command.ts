import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { VerifyMfaRequestDTO } from '../../dtos/requests/auth/verify-mfa.dto.js';
export class VerifyMfaCommand extends BaseCommand {
  readonly type = 'auth.verify-mfa';
  readonly commandType = 'auth.verify-mfa';
  constructor(public readonly input: VerifyMfaRequestDTO) { super(); }
}
