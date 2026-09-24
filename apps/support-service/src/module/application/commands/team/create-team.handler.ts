import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateTeamCommand } from './create-team.command';
import type { TeamServiceInterface } from '../../services/interfaces/team.service.interface';
import type { TeamResponseDTO } from '../../dtos/responses/team-response.dto';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler
  extends BaseCommandHandler<CreateTeamCommand, TeamResponseDTO>
  implements ICommandHandler<CreateTeamCommand>
{
  readonly commandType = 'support.team.create';

  constructor(private readonly teamService: TeamServiceInterface) {
    super();
  }

  async execute(command: CreateTeamCommand): Promise<TeamResponseDTO> {
    return this.teamService.create({
      name: command.name,
      type: command.type_,
      description: command.description,
    });
  }
}
