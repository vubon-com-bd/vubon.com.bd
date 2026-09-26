import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RevokeRoleRequestDTO } from '../../dtos/requests/user/revoke-role.dto';

export class RevokeRoleCommand extends BaseCommand {
  readonly type = 'user.revoke-role';
  constructor(public readonly input: RevokeRoleRequestDTO) { super(); }
}
