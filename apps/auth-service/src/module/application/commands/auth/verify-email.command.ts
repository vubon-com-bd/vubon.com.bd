import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { VerifyEmailRequestDTO } from '../../dtos/requests/auth/verify-email.dto';

export class VerifyEmailCommand extends BaseCommand {
  readonly type = 'auth.verify-email';
  constructor(public readonly input: VerifyEmailRequestDTO) { super(); }
}
