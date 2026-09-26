import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateTeamMemberCommand } from './update-team-member.command';
import type { VendorTeamRepository } from '../../../domain/repositories/vendor-team.repository.interface';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateTeamMemberCommand)
export class UpdateTeamMemberHandler
  extends BaseCommandHandler<UpdateTeamMemberCommand, void>
  implements ICommandHandler<UpdateTeamMemberCommand>
{
  readonly commandType = 'vendor.team.update-member';

  constructor(
    private readonly teamRepo: VendorTeamRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateTeamMemberCommand): Promise<void> {
    const member = await this.teamRepo.findById(
      TeamMemberIdVO.create(command.memberId),
    );
    if (!member) throw new VendorNotFoundAppError(command.memberId);
    void this.eventBus;
    throw new Error('update-team-member orchestration not yet wired');
  }
}
