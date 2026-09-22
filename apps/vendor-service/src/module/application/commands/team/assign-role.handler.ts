import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignRoleCommand } from './assign-role.command';
import type { VendorTeamRepository } from '../../../domain/repositories/vendor-team.repository.interface';
import { TeamMemberIdVO } from '../../../domain/value-objects/primitives/team-member-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(AssignRoleCommand)
export class AssignRoleHandler
  extends BaseCommandHandler<AssignRoleCommand, void>
  implements ICommandHandler<AssignRoleCommand>
{
  readonly commandType = 'vendor.team.assign-role';

  constructor(
    private readonly teamRepo: VendorTeamRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AssignRoleCommand): Promise<void> {
    const member = await this.teamRepo.findById(
      TeamMemberIdVO.create(command.memberId),
    );
    if (!member) throw new VendorNotFoundAppError(command.memberId);
    void this.eventBus;
    throw new Error('assign-role orchestration not yet wired');
  }
}
