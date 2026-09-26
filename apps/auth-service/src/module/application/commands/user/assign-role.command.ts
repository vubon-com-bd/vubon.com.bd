import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AssignRoleRequestDTO } from '../../dtos/requests/user/assign-role.dto';

export class AssignRoleCommand extends BaseCommand {
  readonly type = 'user.assign-role';
  constructor(public readonly input: AssignRoleRequestDTO) { super(); }
}
