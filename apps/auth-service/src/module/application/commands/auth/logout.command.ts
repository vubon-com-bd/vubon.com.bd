import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { LogoutRequestDTO } from '../../dtos/requests/auth/logout.dto';

export class LogoutCommand extends BaseCommand {
  readonly type = 'auth.logout';
  constructor(public readonly input: LogoutRequestDTO) { super(); }
}
