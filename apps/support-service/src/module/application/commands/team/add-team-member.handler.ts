import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddTeamMemberCommand } from './add-team-member.command';
import type { TeamServiceInterface } from '../../services/interfaces/team.service.interface';
import { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';

@CommandHandler(AddTeamMemberCommand)
export class AddTeamMemberHandler
  extends BaseCommandHandler<AddTeamMemberCommand, void>
  implements ICommandHandler<AddTeamMemberCommand>
{
  readonly commandType = 'support.team.member.add';

  constructor(private readonly teamService: TeamServiceInterface) {
    super();
  }

  async execute(command: AddTeamMemberCommand): Promise<void> {
    await this.teamService.addMember(
      TeamIdVO.create(command.teamId),
      command.agentId,
    );
  }
}
