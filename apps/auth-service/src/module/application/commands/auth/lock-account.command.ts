import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { LockAccountRequestDTO } from '../../dtos/requests/auth/lock-account.dto.js';

export class LockAccountCommand extends BaseCommand {
  readonly type = 'auth.lock-account';
  constructor(public readonly input: LockAccountRequestDTO) { super(); }
}
