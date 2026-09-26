import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { SocialCallbackRequestDTO } from '../../dtos/requests/auth/social-callback.dto';

export class SocialCallbackCommand extends BaseCommand {
  readonly type = 'auth.social-callback';
  constructor(public readonly input: SocialCallbackRequestDTO) { super(); }
}
