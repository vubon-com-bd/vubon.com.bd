import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SetupMfaRequestDTO } from '../../dtos/requests/auth/setup-mfa.dto.js';
export class SetupMfaCommand extends BaseCommand {
  readonly type = 'auth.setup-mfa';
  readonly commandType = 'auth.setup-mfa';
  constructor(public readonly authId: string, public readonly input: SetupMfaRequestDTO) { super(); }
}
