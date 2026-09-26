import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ResetPasswordRequestDTO } from '../../dtos/requests/auth/reset-password.dto';

export class ResetPasswordCommand extends BaseCommand {
  readonly type = 'auth.reset-password';
  constructor(public readonly input: ResetPasswordRequestDTO) { super(); }
}
