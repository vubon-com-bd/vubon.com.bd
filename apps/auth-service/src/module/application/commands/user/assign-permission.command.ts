import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { AssignPermissionRequestDTO } from '../../dtos/requests/user/assign-permission.dto.js';

export class AssignPermissionCommand extends BaseCommand {
  readonly type = 'user.assign-permission';
  constructor(public readonly input: AssignPermissionRequestDTO) { super(); }
}
