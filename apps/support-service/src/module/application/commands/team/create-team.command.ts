/**
 * CreateTeamCommand
 * @module support-service/application/commands/team
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateTeamRequestDTO } from '../../dtos/requests/team/create-team.dto';

export class CreateTeamCommand extends BaseCommand {
  readonly type = 'support.team.create';

  constructor(public readonly payload: CreateTeamRequestDTO) {
    super();
  }
}
