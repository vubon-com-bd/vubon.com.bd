import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UserId } from '@vubon/shared-types/common';
import type { UnlinkSocialRequestDTO } from '../../dtos/requests/auth/unlink-social.dto';

export class UnlinkSocialCommand extends BaseCommand {
  readonly type = 'auth.unlink-social';
  constructor(
    public readonly userId: UserId,
    public readonly input: UnlinkSocialRequestDTO,
  ) { super(); }
}
