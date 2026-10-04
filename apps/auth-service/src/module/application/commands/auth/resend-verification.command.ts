import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { ResendVerificationRequestDTO } from '../../dtos/requests/auth/resend-verification.dto.js';

export class ResendVerificationCommand extends BaseCommand {
  readonly type = 'auth.resend-verification';
  constructor(public readonly input: ResendVerificationRequestDTO) { super(); }
}
