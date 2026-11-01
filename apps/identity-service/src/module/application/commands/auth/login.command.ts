/**
 * Login Command
 * @module identity-service/application/commands/auth
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { LoginRequestDTO } from '../../dtos/requests/auth/login.dto.js';

export class LoginCommand extends BaseCommand {
  readonly type = 'auth.login';
  readonly commandType = 'auth.login';

  constructor(
    public readonly input: LoginRequestDTO,
    public readonly ipAddress?: string,
    public readonly userAgent?: string,
    public readonly correlationId?: string,
  ) {
    super();
  }
}
