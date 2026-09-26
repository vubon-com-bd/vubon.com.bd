import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SocialLoginRequestDTO } from '../../dtos/requests/auth/social-login.dto';

export class SocialLoginCommand extends BaseCommand {
  readonly type = 'auth.social-login';
  constructor(public readonly input: SocialLoginRequestDTO) { super(); }
}
