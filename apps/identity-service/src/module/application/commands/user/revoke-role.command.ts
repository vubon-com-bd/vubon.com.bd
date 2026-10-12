import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { RevokeRoleRequestDTO } from '../../dtos/requests/user/revoke-role.dto.js';
export class RevokeRoleCommand extends BaseCommand {
  readonly type = 'user.revoke-role';
  readonly commandType = 'user.revoke-role';
  constructor(public readonly input: RevokeRoleRequestDTO, public readonly revokedBy: string) { super(); }
}
