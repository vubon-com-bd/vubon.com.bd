import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RegisterRequestDTO } from '../../dtos/requests/auth/register.dto';

export class RegisterCommand extends BaseCommand {
  readonly type = 'auth.register';
  constructor(
    public readonly input: RegisterRequestDTO,
    public readonly ctx?: { ip?: string; userAgent?: string },
  ) { super(); }
}
