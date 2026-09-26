import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RecoverAccountRequestDTO } from '../../dtos/requests/auth/recover-account.dto';

export class RecoverAccountCommand extends BaseCommand {
  readonly type = 'auth.recover-account';
  constructor(public readonly input: RecoverAccountRequestDTO) { super(); }
}
