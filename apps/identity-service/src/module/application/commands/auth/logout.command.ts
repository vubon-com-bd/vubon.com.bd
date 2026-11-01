import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { LogoutRequestDTO } from '../../dtos/requests/auth/logout.dto.js';
export class LogoutCommand extends BaseCommand {
  readonly type = 'auth.logout';
  readonly commandType = 'auth.logout';
  constructor(public readonly input: LogoutRequestDTO, public readonly userId?: string) { super(); }
}
