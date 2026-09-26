/**
 * CreateTeamHandler
 * @module support-service/application/commands/team
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTeamCommand } from './create-team.command';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';
import type { TeamServiceInterface } from '../../services/interfaces/team.service.interface';

export class CreateTeamHandler extends BaseCommandHandler<
  CreateTeamCommand,
  TeamResponseDTO
> {
  readonly commandType = 'support.team.create';

  constructor(private readonly teamService: TeamServiceInterface) {
    super();
  }

  async execute(command: CreateTeamCommand): Promise<TeamResponseDTO> {
    return this.teamService.create(command.payload);
  }
}
