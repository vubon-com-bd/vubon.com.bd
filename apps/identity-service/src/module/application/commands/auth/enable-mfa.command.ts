import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { EnableMfaRequestDTO } from '../../dtos/requests/auth/enable-mfa.dto.js';
export class EnableMfaCommand extends BaseCommand {
  readonly type = 'auth.enable-mfa';
  readonly commandType = 'auth.enable-mfa';
  constructor(public readonly authId: string, public readonly input: EnableMfaRequestDTO) { super(); }
}
