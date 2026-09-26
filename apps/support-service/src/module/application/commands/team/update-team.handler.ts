/**
 * UpdateTeamHandler
 * @module support-service/application/commands/team
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTeamCommand } from './update-team.command';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';
import type { TeamServiceInterface } from '../../services/interfaces/team.service.interface';

export class UpdateTeamHandler extends BaseCommandHandler<
  UpdateTeamCommand,
  TeamResponseDTO
> {
  readonly commandType = 'support.team.update';

  constructor(private readonly teamService: TeamServiceInterface) {
    super();
  }

  async execute(command: UpdateTeamCommand): Promise<TeamResponseDTO> {
    return this.teamService.update(command.payload);
  }
}
