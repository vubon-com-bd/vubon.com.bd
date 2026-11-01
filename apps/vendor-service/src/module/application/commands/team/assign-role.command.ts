import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AssignRoleRequestDTO } from '../../dtos/requests/team/index.js';

export class AssignRoleCommand extends BaseCommand {
  readonly type = 'vendor.team.assign_role';
  constructor(
    public readonly dto: AssignRoleRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}
