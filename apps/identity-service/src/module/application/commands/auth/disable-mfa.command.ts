import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { DisableMfaRequestDTO } from '../../dtos/requests/auth/disable-mfa.dto.js';
export class DisableMfaCommand extends BaseCommand {
  readonly type = 'auth.disable-mfa';
  readonly commandType = 'auth.disable-mfa';
  constructor(public readonly authId: string, public readonly input: DisableMfaRequestDTO) { super(); }
}
