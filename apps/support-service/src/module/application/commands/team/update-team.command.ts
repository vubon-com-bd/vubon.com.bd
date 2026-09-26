/**
 * UpdateTeamCommand
 * @module support-service/application/commands/team
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateTeamRequestDTO } from '../../dtos/requests/team/update-team.dto';

export class UpdateTeamCommand extends BaseCommand {
  readonly type = 'support.team.update';

  constructor(public readonly payload: UpdateTeamRequestDTO) {
    super();
  }
}
