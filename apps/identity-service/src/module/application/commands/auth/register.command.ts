import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto.js';

export class RegisterCommand extends BaseCommand {
  readonly type = 'auth.register';
  readonly commandType = 'auth.register';

  constructor(
    public readonly input: RegisterRequestDTO,
    public readonly correlationId?: string,
  ) {
    super();
  }
}
