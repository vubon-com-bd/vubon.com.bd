import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { LinkSocialRequestDTO } from '../../dtos/requests/auth/link-social.dto';

export class LinkSocialCommand extends BaseCommand {
  readonly type = 'auth.link-social';
  constructor(
    public readonly userId: UserId,
    public readonly input: LinkSocialRequestDTO,
  ) { super(); }
}
