import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTeamCommand } from './update-team.command';
import type { SupportTeamRepository } from '../../../domain/repositories/support-team.repository.interface';
import { TeamIdVO } from '../../../domain/value-objects/primitives/team-id.vo';

@CommandHandler(UpdateTeamCommand)
export class UpdateTeamHandler
  extends BaseCommandHandler<UpdateTeamCommand, void>
  implements ICommandHandler<UpdateTeamCommand>
{
  readonly commandType = 'support.team.update';

  constructor(private readonly teamRepo: SupportTeamRepository) {
    super();
  }

  async execute(command: UpdateTeamCommand): Promise<void> {
    const existing = await this.teamRepo.findById(TeamIdVO.create(command.teamId));
    if (!existing) {
      throw new Error(`Team not found: ${command.teamId}`);
    }
  }
}
