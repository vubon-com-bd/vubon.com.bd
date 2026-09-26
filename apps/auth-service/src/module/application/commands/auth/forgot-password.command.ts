import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ForgotPasswordRequestDTO } from '../../dtos/requests/auth/forgot-password.dto';

export class ForgotPasswordCommand extends BaseCommand {
  readonly type = 'auth.forgot-password';
  constructor(public readonly input: ForgotPasswordRequestDTO) { super(); }
}
