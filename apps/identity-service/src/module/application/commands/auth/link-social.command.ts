import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { LinkSocialRequestDTO } from '../../dtos/requests/auth/link-social.dto.js';
export class LinkSocialCommand extends BaseCommand {
  readonly type = 'auth.link-social';
  readonly commandType = 'auth.link-social';
  constructor(public readonly authId: string, public readonly input: LinkSocialRequestDTO) { super(); }
}
