import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SsoCallbackRequestDTO } from '../../dtos/requests/auth/sso-callback.dto.js';

export class SsoCallbackCommand extends BaseCommand {
  readonly type = 'auth.sso-callback';
  constructor(public readonly input: SsoCallbackRequestDTO) { super(); }
}
