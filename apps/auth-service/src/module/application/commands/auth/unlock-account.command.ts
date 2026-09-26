import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UnlockAccountRequestDTO } from '../../dtos/requests/auth/unlock-account.dto';

export class UnlockAccountCommand extends BaseCommand {
  readonly type = 'auth.unlock-account';
  constructor(public readonly input: UnlockAccountRequestDTO) { super(); }
}
