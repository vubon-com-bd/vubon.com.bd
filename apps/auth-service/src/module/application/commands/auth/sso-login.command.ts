import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SsoLoginRequestDTO } from '../../dtos/requests/auth/sso-login.dto.js';

export class SsoLoginCommand extends BaseCommand {
  readonly type = 'auth.sso-login';
  constructor(public readonly input: SsoLoginRequestDTO) { super(); }
}
