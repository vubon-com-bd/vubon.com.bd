import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UnlinkSocialRequestDTO } from '../../dtos/requests/auth/unlink-social.dto.js';
export class UnlinkSocialCommand extends BaseCommand {
  readonly type = 'auth.unlink-social';
  readonly commandType = 'auth.unlink-social';
  constructor(public readonly authId: string, public readonly input: UnlinkSocialRequestDTO) { super(); }
}
