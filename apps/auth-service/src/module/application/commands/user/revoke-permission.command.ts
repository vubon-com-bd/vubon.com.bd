import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RevokePermissionRequestDTO } from '../../dtos/requests/user/revoke-permission.dto';

export class RevokePermissionCommand extends BaseCommand {
  readonly type = 'user.revoke-permission';
  constructor(public readonly input: RevokePermissionRequestDTO) { super(); }
}
