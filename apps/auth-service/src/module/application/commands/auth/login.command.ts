/**
 * LoginCommand
 * @module auth-service/application/commands/auth
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto';

export class LoginCommand extends BaseCommand {
  readonly type = 'auth.login';

  constructor(
    public readonly input: LoginRequestDTO,
    public readonly ctx?: { ip?: string; userAgent?: string },
  ) {
    super();
  }
}
